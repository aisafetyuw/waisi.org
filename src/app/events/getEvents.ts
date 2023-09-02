import { google } from 'googleapis';
import credentials from '@/credentials.json';
import { debug } from 'util';

const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];

const client = new google.auth.JWT(
    credentials.client_email,
    undefined,
    credentials.private_key,
    SCOPES,
);

client.authorize((err) => {
    if (err) {
        console.error(err);
        return;
    } else {
        console.log("Successfully connected to Google Calendar!");
    }
});

const calendar = google.calendar({ version: 'v3', auth: client });

export default async function getEvents() {
    const response = await calendar.events.list({
        calendarId: 'primary',
        timeMin: (new Date()).toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
    });

    return response.data.items;
}
