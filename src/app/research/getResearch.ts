import { ResearchData } from '@/types';
import { google } from 'googleapis';
import { getGoogleClient } from '@/lib/google';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

// Returns the research catalog, or null if the fetch failed (missing
// credentials, revoked key, API outage) so the page can show an error state
// instead of silently rendering an empty list.
export default async function getResearch(): Promise<ResearchData[] | null> {
    const request = {
        spreadsheetId: '1OGoGF4GnfSnaO6LFdpgtVtF4JagANq5zAErhqp10goE',
        range: 'Research!A:F',
    };

    try {
        const client = getGoogleClient(SCOPES);
        const sheets = google.sheets({ version: 'v4', auth: client });

        const response = await sheets.spreadsheets.values.get(request);
        const rows = response.data.values ?? [];

        const research: ResearchData[] = rows.slice(1).map((row: string[]) => {
            return {
                author: row[0],
                name: row[1],
                link: row[2],
                authors: row[3],
                date: row[4],
                conference: row[5] || undefined,
            };
        });

        return research;
    } catch (error) {
        console.error('Failed to fetch research from Google Sheets:', error);
        return null;
    }
}
