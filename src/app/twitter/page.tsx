import { TWITTER_URL } from '@/constants';

export default function twitter() {
    return (
        <meta http-equiv="Refresh" content={"0; url='"+TWITTER_URL+"'"} />
    )
}