import { MemberData } from '@/types';
import { google } from 'googleapis';
import { getGoogleClient } from '@/lib/google';
import { parseMemberRows } from '@/lib/sheetRows';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

// Returns the member list, or null if the fetch failed (missing credentials,
// revoked key, API outage) so the page can show an error state instead of
// silently rendering an empty team.
export default async function getMembers(): Promise<MemberData[] | null> {
    const request = {
        spreadsheetId: '1OGoGF4GnfSnaO6LFdpgtVtF4JagANq5zAErhqp10goE',
        range: 'A:F',
    };

    try {
        const client = getGoogleClient(SCOPES);
        const sheets = google.sheets({ version: 'v4', auth: client });

        const response = await sheets.spreadsheets.values.get(request);
        const rows = response.data.values ?? [];

        // Apply the website's leadership transition even while the source
        // spreadsheet retains its previous roster.
        return parseMemberRows(rows)
            .filter(member => member.name.trim().toLowerCase() !== 'kaustubh kislay')
            .map(member => member.name.trim().toLowerCase() === 'anaya mandal'
                ? { ...member, role: 'Director' }
                : member);
    } catch (error) {
        console.error('Failed to fetch members from Google Sheets:', error);
        return null;
    }
}
