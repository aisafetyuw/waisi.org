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
    closed?: string,
}

export type ProgramProps = {
    program: ProgramData,
};

export type MemberData = {
    name: string,
    pronouns: string,
    description: string,
    email: string,
    twitter?: string,
    linkedin?: string,
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
    fa?: 'discord' | 'twitter',
};

export type MobileNavProps = {
    open: boolean,
    setOpen: (open: boolean) => void,
    pathname: string,
};