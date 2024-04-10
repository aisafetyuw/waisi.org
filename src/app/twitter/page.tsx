import { TWITTER_URL } from '@/constants';

export default function qrcode() {
    return (
        <meta http-equiv="Refresh" content={"0; url='"+TWITTER_URL+"'"} />
    )
}