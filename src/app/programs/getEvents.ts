import { google } from 'googleapis';
import { getGoogleClient } from '@/lib/google';

const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];

// Returns the upcoming events, [] if there are genuinely none, or null if the
// fetch failed (missing credentials, revoked key, API outage) so callers can
// show an error state instead of silently rendering nothing.
export default async function getEvents() {
    try {
        const client = getGoogleClient(SCOPES);
        const calendar = google.calendar({ version: 'v3', auth: client });

        const response = await calendar.events.list({
            calendarId: 'ef5131b341f5487d64d28b938ebf9bf59f14e27704bbe3f6a9459abbec74753b@group.calendar.google.com',
            timeMin: (new Date()).toISOString(),
            maxResults: 10,
            singleEvents: true,
            orderBy: 'startTime',
        });

        return response.data.items ?? [];
    } catch (error) {
        console.error('Failed to fetch events from Google Calendar:', error);
        return null;
    }
}
