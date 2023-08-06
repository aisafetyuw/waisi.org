import { MemberData } from '@/types';

export default async function getMembers() {
    const members: MemberData[] = [
        {
            name: 'Ben Hayum',
            pronouns: 'he/him',
            description: 'Ben Hayum is an absolute AI safety god from New Jersey. Some descriptions might be a little shorter.',
            email: 'bhayum@wisc.edu',
            linkedin: 'https://www.linkedin.com/in/benjamin-hayum-2a40b71b9/',
            twitter: '@BillGates',
        },
        {
            name: 'David Viggiano',
            pronouns: 'he/him',
            description: "David is a senior studying Computer Sciences and Philosophy with interests in AI alignment and interpretability, software engineering, and cognitive science. Feel free to reach out to David with any questions about jumping into computer science.",
            email: 'dviggiano@wisc.edu',
        }
    ]; // TODO use Google Sheets API
    return members;
}