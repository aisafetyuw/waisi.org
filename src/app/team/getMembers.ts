import { MemberData } from '@/types';
import { google } from 'googleapis';
import credentials from '@/credentials.json';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

const client = new google.auth.JWT(
    credentials.client_email,
    undefined,
    credentials.private_key,
    SCOPES,
);

client.authorize((err, tokens) => {
    if (err) {
        console.error(err);
        return;
    } else {
        console.log("Successfully connected to Leadership!");
    }
});

const sheets = google.sheets({ version: 'v4', auth: client });

export default async function getMembers(): Promise<MemberData[]> {
    const request = {
        spreadsheetId: '1OGoGF4GnfSnaO6LFdpgtVtF4JagANq5zAErhqp10goE',
        range: 'A:F',
    };

    try {
        const response = await sheets.spreadsheets.values.get(request);
        const rows = response.data.values ?? [];

        const members: MemberData[] = rows.slice(1).map((row: string[]) => {
            return {
                name: row[0],
                pronouns: row[1],
                role: row[2],
                email: row[3],
                linkedin: row[4],
                team: row[5],
            };
        });

        return members;
    } catch (error) {
        // Degrade gracefully instead of failing the build if Google auth or the
        // Sheets API is unavailable (e.g. an expired or rotated service-account key).
        console.error('Failed to fetch members from Google Sheets:', error);
        return [];
    }
}