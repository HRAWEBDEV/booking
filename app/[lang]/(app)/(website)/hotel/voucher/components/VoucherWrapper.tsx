import { type ReserveVoucherDictionary } from '@/internalization/app/dictionaries/website/hotel/voucher/dictionary';
import FailedReserve from './FailedReserve';

export default function VoucherWrapper({
 dic,
}: {
 dic: ReserveVoucherDictionary;
}) {
 return <FailedReserve dic={dic} />;
}
