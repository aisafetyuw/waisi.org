import { ResearchData } from '@/types';
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
        console.log("Successfully connected to Research!");
    }
});

const sheets = google.sheets({ version: 'v4', auth: client });

export default async function getResearch() {
    const request = {
        spreadsheetId: '1OGoGF4GnfSnaO6LFdpgtVtF4JagANq5zAErhqp10goE',
        range: 'Research!A:E',
    };

    const response = await sheets.spreadsheets.values.get(request);
    const rows = response.data.values!;

    const research: ResearchData[] = rows.slice(1).map((row: string[]) => {
        return {
            author: row[0],
            name: row[1],
            link: row[2],
            authors: row[3],
            date: row[4],
        };
    });

    return research;
}