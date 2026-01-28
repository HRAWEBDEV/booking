import { type ReserveVoucherDictionary } from '@/internalization/app/dictionaries/website/hotel/voucher/dictionary';
import FailedReserve from './FailedReserve';
import ConfirmedVoucher from './ConfirmedVoucher';

export default function VoucherWrapper({
 dic,
}: {
 dic: ReserveVoucherDictionary;
}) {
 return <ConfirmedVoucher dic={dic} />;
}
