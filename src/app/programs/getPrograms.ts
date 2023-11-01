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
    } else {
        console.log("Successfully connected to Programs!");
    }
});

const sheets = google.sheets({ version: 'v4', auth: client });

export default async function getMembers() {
    const request = {
        spreadsheetId: '1OGoGF4GnfSnaO6LFdpgtVtF4JagANq5zAErhqp10goE',
        range: 'Programs!A:I',
    };

    const response = await sheets.spreadsheets.values.get(request);
    const rows = response.data.values!;

    const programs: ProgramData[] = rows.slice(1).map((row: string[]) => {
        return {
            name: row[0],
            type: row[1],
            reserved_for: row[2],
            curriculumSimilarTo: (row[3] === "TRUE"),
            curriculumLink: row[4],
            applicationLink: row[5],
            applicationDeadline: row[6],
            email: row[7],
            link: row[8],
        };
    });

    return programs;
}