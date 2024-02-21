import { calendar_v3 } from "googleapis/build/src/apis/calendar/v3";

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
    fa?: 'discord' | 'twitter' | 'instagram',
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