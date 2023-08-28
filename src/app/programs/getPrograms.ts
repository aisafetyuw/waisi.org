import { ProgramData } from '@/types';
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
        console.log("Successfully connected to Programs!");
    }
});

const sheets = google.sheets({ version: 'v4', auth: client });

export default async function getMembers() {
    const request = {
        spreadsheetId: '1OGoGF4GnfSnaO6LFdpgtVtF4JagANq5zAErhqp10goE',
        range: 'Programs!A:G',
    };

    const response = await sheets.spreadsheets.values.get(request);
    const rows = response.data.values!;

    const programs: ProgramData[] = rows.slice(1).map((row: string[]) => {
        return {
            name: row[0],
            description: row[1],
            curriculumSimilarTo: (row[2] === "TRUE"),
            curriculumLink: row[3],
            applicationLink: row[4],
            applicationDeadline: row[5],
            email: row[6],
        };
    });

    return programs;
}