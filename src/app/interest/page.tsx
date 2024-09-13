import { INTEREST_URL } from '@/constants';

export default function interest() {
    return (
        <meta http-equiv="Refresh" content={"0; url='"+INTEREST_URL+"'"} />
    )
}