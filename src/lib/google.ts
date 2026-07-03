import { google } from 'googleapis';

// Service-account credentials come from the environment (Netlify env vars in
// production, .env.local in development) — never from a checked-in file.
// GOOGLE_PRIVATE_KEY may arrive with literal "\n" sequences depending on how
// the env var was pasted; normalize them back to real newlines.
export function getGoogleClient(scopes: string[]) {
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    if (!clientEmail || !privateKey) {
        throw new Error(
            'Missing GOOGLE_CLIENT_EMAIL or GOOGLE_PRIVATE_KEY environment variable',
        );
    }

    return new google.auth.JWT(clientEmail, undefined, privateKey, scopes);
}
