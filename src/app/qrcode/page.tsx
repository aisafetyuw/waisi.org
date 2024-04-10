import { DISCORD_URL } from '@/constants';

export default function qrcode() {
    return (
        <meta http-equiv="Refresh" content={"0; url='"+DISCORD_URL+"'"} />
    )
}