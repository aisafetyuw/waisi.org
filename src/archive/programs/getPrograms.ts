import { ProgramData } from '@/types';
import { google } from 'googleapis';
import { getGoogleClient } from '@/lib/google';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

export default async function getPrograms(): Promise<ProgramData[] | null> {
    const request = {
        spreadsheetId: '1OGoGF4GnfSnaO6LFdpgtVtF4JagANq5zAErhqp10goE',
        range: 'Programs!A:K',
    };

    try {
        const client = getGoogleClient(SCOPES);
        const sheets = google.sheets({ version: 'v4', auth: client });

        const response = await sheets.spreadsheets.values.get(request);
        const rows = response.data.values ?? [];

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
                closed: (row[9] === "TRUE"),
                desc: row[10],
            };
        });

        return programs;
    } catch (error) {
        console.error('Failed to fetch programs from Google Sheets:', error);
        return null;
    }
}
