import { calendar_v3 } from "googleapis/build/src/apis/calendar/v3";

export type CalendarEventData = {
    htmlLink?: string | null;
    summary?: string | null;
    description?: string | null;
    location?: string | null;
    start?: {
        date?: string | null;
        dateTime?: string | null;
    } | null;
    end?: {
        date?: string | null;
        dateTime?: string | null;
    } | null;
};

export type ProgramData = {
    name: string,
    type: string,
    reserved_for?: string,
    curriculumSimilarTo?: boolean,
    curriculumLink?: string
    applicationLink?: string,
    applicationDeadline?: string,
    email?: string,
    link?: string,
    closed?: boolean,
    desc?: string,
};

export type ProgramProps = {
    program: ProgramData,
};

export type ResearchData = {
    author: string,
    name: string,
    link: string,
    authors: string,
    date: string,
    conference?: string,
};

export type ResearchProps = {
    research: ResearchData,
};

export type MemberData = {
    name: string,
    pronouns: string,
    role: string,
    email: string,
    twitter?: string,
    linkedin?: string,
    team: string,
};

export type MemberProps = {
    member: MemberData,
};

export type EventProps = {
    event: calendar_v3.Schema$Event,
};

export type AboutImageProps = {
    filename: string,
    alt: string,
};

export type ButtonProps = {
    url: string,
    text: string,
    fa?: 'discord' | 'linkedin' | 'twitter' | 'instagram',
};

export type HandbookProps = {
    title: string,
    url: string,
    description: string,
};

export type MobileNavProps = {
    open: boolean,
    setOpen: (open: boolean) => void,
    pathname: string,
};

export type ProfProps = {
    link: string,
    name: string,
    focus: string,
    extra?: string,
};

export type LabProps = {
    name: string,
    filename: string,
    link: string,
};

export type ResourceData = {
    category: 'Video' | 'Blog' | 'Podcast' | 'Website',
    title: string,
    description: string,
    url: string,
};

export type ResourceProps = {
    resource: ResourceData,
};