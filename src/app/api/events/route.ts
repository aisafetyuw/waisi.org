import { NextResponse } from 'next/server';
import getEvents from '@/app/events/getEvents';

export async function GET() {
    const events = await getEvents();

    if (events === null) {
        return NextResponse.json(
            { error: 'Failed to fetch calendar events' },
            { status: 500 },
        );
    }

    return NextResponse.json(events);
}
