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