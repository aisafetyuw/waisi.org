import { google } from 'googleapis';
import credentials from '@/credentials.json';
import { NextResponse } from 'next/server';

const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];

const client = new google.auth.JWT(
    credentials.client_email,
    undefined,
    credentials.private_key,
    SCOPES,
);

const calendar = google.calendar({ version: 'v3', auth: client });

export async function GET() {
    try {
        await client.authorize();

        const response = await calendar.events.list({
            calendarId: 'ef5131b341f5487d64d28b938ebf9bf59f14e27704bbe3f6a9459abbec74753b@group.calendar.google.com',
            timeMin: (new Date()).toISOString(),
            maxResults: 10,
            singleEvents: true,
            orderBy: 'startTime',
        });

        return NextResponse.json(response.data.items || []);
    } catch (error) {
        console.error('Error fetching calendar events:', error);
        return NextResponse.json([], { status: 500 });
    }
}
