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

export type JoinButtonProps = {
    url: string,
    fa?: 'slack' | 'discord',
    text: string,
};