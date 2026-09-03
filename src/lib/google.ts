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

    // A service-account key is a PEM block. If the env var holds something else
    // (e.g. the JSON's private_key_id, or a mangled paste), googleapis fails
    // deep in OpenSSL with an opaque "DECODER routines::unsupported" — catch it
    // here with an actionable message instead.
    if (!privateKey.includes('-----BEGIN') || !privateKey.includes('PRIVATE KEY-----')) {
        throw new Error(
            'GOOGLE_PRIVATE_KEY is not a PEM private key — copy the full "private_key" ' +
            'field from the service-account JSON (it starts with "-----BEGIN PRIVATE KEY-----").',
        );
    }

    return new google.auth.JWT(clientEmail, undefined, privateKey, scopes);
}
