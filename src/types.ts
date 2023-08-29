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
}

export type ProgramProps = {
    program: ProgramData,
};

export type MemberData = {
    name: string,
    pronouns: string,
    description: string,
    email: string,
    linkedin?: string,
    twitter?: string,
};

export type MemberProps = {
    member: MemberData,
};

export type AboutImageProps = {
    filename: string,
    alt: string,
    left?: boolean,
};

export type ButtonProps = {
    url: string,
    fa?: 'slack' | 'discord',
    text: string,
};

export type MobileNavProps = {
    open: boolean,
    setOpen: (open: boolean) => void,
    pathname: string,
};