import { ResearchData } from '@/types';
import { google } from 'googleapis';
import { getGoogleClient } from '@/lib/google';
import { parseResearchRows } from '@/lib/sheetRows';

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

        return parseResearchRows(rows);
    } catch (error) {
        console.error('Failed to fetch research from Google Sheets:', error);
        return null;
    }
}
