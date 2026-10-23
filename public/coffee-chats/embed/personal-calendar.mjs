export const GOOGLE_CALENDAR_SCOPE = 'https://www.googleapis.com/auth/calendar.freebusy';

export function appointmentRange(slots) {
  if (!slots.length) return null;
  const starts = slots.map(slot => Date.parse(slot.start));
  const ends = slots.map((slot, index) => starts[index] + slot.durationMinutes * 60000);
  if (starts.some((start, index) => !Number.isFinite(start) || !Number.isFinite(ends[index]) || ends[index] <= start)) {
    throw new Error('Invalid appointment range');
  }
  return {timeMin: new Date(Math.min(...starts)).toISOString(), timeMax: new Date(Math.max(...ends)).toISOString()};
}

export function readBusyPeriods(payload, range) {
  const calendar = payload?.calendars?.primary;
  if (!calendar || calendar.errors?.length || !Array.isArray(calendar.busy) ||
      !(Date.parse(payload.timeMin) <= Date.parse(range.timeMin)) ||
      !(Date.parse(payload.timeMax) >= Date.parse(range.timeMax))) {
    throw new Error('Calendar availability is incomplete');
  }
  return calendar.busy.map(period => {
    const start = Date.parse(period.start), end = Date.parse(period.end);
    if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start) throw new Error('Invalid busy period');
    return {start, end};
  });
}

export function freeAppointments(slots, busy, range) {
  const rangeStart = Date.parse(range?.timeMin), rangeEnd = Date.parse(range?.timeMax);
  return slots.filter(slot => {
    const start = Date.parse(slot.start), end = start + slot.durationMinutes * 60000;
    return Number.isFinite(start) && end > start && start >= rangeStart && end <= rangeEnd &&
      !busy.some(period => start < period.end && end > period.start);
  });
}

// Tokens and busy periods live only in this page's memory. No event details are requested.
export class GoogleCalendarConnection {
  constructor({clientId, oauth, onChange = () => {}, fetchImpl = fetch, now = Date.now}) {
    this.clientId = clientId;
    this.oauth = oauth;
    this.onChange = onChange;
    this.fetch = (...args) => fetchImpl(...args);
    this.now = now;
    this.status = 'disconnected';
    this.error = '';
    this.range = null;
    this.busy = [];
    this._token = '';
    this._expiresAt = 0;
    this._generation = 0;
    this._authorizationGeneration = 0;
    this._abort = null;
    this._checkedAt = 0;
  }

  get hasSession() { return Boolean(this._token) && this.now() < this._expiresAt; }
  get ready() { return this.status === 'ready' && this.hasSession; }

  setRange(range) {
    this._abort?.abort();
    this._generation++;
    this.range = range;
    this.busy = [];
    this._checkedAt = 0;
    if (this.hasSession) void this.refresh(true);
  }

  connect() {
    this._abort?.abort();
    ++this._generation;
    const generation = ++this._authorizationGeneration;
    this._token = '';
    this.busy = [];
    this.status = 'connecting';
    this.error = '';
    this.onChange();
    try {
      const client = this.oauth.initTokenClient({
        client_id: this.clientId,
        scope: GOOGLE_CALENDAR_SCOPE,
        include_granted_scopes: false,
        callback: response => {
          if (generation !== this._authorizationGeneration) return;
          if (response.error || !response.access_token ||
              !this.oauth.hasGrantedAllScopes(response, GOOGLE_CALENDAR_SCOPE)) {
            this.status = 'error'; this.error = 'permission'; this.onChange(); return;
          }
          const lifetime = Number(response.expires_in);
          if (!Number.isFinite(lifetime) || lifetime <= 0) {
            this.status = 'error'; this.error = 'authorization'; this.onChange(); return;
          }
          this._token = response.access_token;
          this._expiresAt = this.now() + lifetime * 1000;
          return this.refresh(true);
        },
        error_callback: error => {
          if (generation !== this._authorizationGeneration) return;
          this.status = 'error';
          this.error = error.type === 'popup_closed' ? 'cancelled' : 'popup';
          this.onChange();
        },
      });
      // Keep this synchronous with the fellow's click so the browser allows the popup.
      client.requestAccessToken({prompt: 'select_account'});
    } catch {
      this.status = 'error'; this.error = 'authorization'; this.onChange();
    }
  }

  async refresh(force = false) {
    if (!this.hasSession) {
      if (this._token) {
        this._token = ''; this.busy = []; this.status = 'expired'; this.onChange();
      }
      return;
    }
    if (!this.range) {
      this.status = 'error'; this.error = 'range'; this.onChange(); return;
    }
    if (!force && (this.status === 'loading' || (this.status === 'ready' && this.now() - this._checkedAt < 60000))) return;
    this._abort?.abort();
    const abort = new AbortController();
    this._abort = abort;
    const generation = ++this._generation;
    const range = {...this.range};
    this.status = 'loading'; this.error = ''; this.busy = []; this.onChange();
    const timeout = setTimeout(() => abort.abort(), 15000);
    try {
      const response = await this.fetch('https://www.googleapis.com/calendar/v3/freeBusy', {
        method: 'POST',
        headers: {'Authorization': `Bearer ${this._token}`, 'Content-Type': 'application/json'},
        body: JSON.stringify({...range, timeZone: 'UTC', items: [{id: 'primary'}]}),
        signal: abort.signal,
        cache: 'no-store',
        credentials: 'omit',
      });
      if (generation !== this._generation) return;
      if (response.status === 401) {
        this._token = ''; this.status = 'expired'; this.onChange(); return;
      }
      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        if (generation !== this._generation) return;
        const reasons = payload?.error?.errors?.map(error => error.reason) || [];
        this.error = response.status === 429 || reasons.some(reason => ['rateLimitExceeded', 'userRateLimitExceeded', 'quotaExceeded'].includes(reason)) ? 'rate_limit' :
          reasons.includes('accessNotConfigured') ? 'api_disabled' : response.status === 403 ? 'permission' : 'availability';
        this.status = 'error'; this.onChange(); return;
      }
      const busy = readBusyPeriods(await response.json(), range);
      if (generation !== this._generation) return;
      if (!this.hasSession) {
        this._token = ''; this.status = 'expired'; this.onChange(); return;
      }
      this.busy = busy;
      this._checkedAt = this.now();
      this.status = 'ready'; this.onChange();
    } catch {
      if (generation !== this._generation) return;
      this.status = 'error'; this.error = 'availability'; this.busy = []; this.onChange();
    } finally {
      clearTimeout(timeout);
      if (this._abort === abort) this._abort = null;
    }
  }

  filter(slots) {
    return this.ready ? freeAppointments(slots, this.busy, this.range) : [];
  }

  disconnect() {
    const token = this._token;
    this._authorizationGeneration++;
    this._generation++;
    this._abort?.abort();
    this._token = ''; this._expiresAt = 0; this._checkedAt = 0;
    this.busy = []; this.status = 'disconnected'; this.error = ''; this.onChange();
    if (token) {
      const generation = this._generation;
      const revokeFailed = () => {
        if (generation !== this._generation) return;
        this.error = 'revoke'; this.onChange();
      };
      try {
        this.oauth.revoke(token, response => {
          if (!response?.successful && response?.error !== 'invalid_token') revokeFailed();
        });
      } catch { revokeFailed(); }
    }
  }
}
