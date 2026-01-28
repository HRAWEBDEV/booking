import { type ReserveVoucherDictionary } from '@/internalization/app/dictionaries/website/hotel/voucher/dictionary';
import FailedReserve from './FailedReserve';
import ConfirmedVoucher from './ConfirmedVoucher';
import { type BookReserveInfo } from '../../services/reserveApiActions';

export default function VoucherWrapper({
 dic,
 bookReserveInfo,
}: {
 dic: ReserveVoucherDictionary;
 bookReserveInfo: BookReserveInfo | null;
}) {
 return (
  <>
   {bookReserveInfo && bookReserveInfo.success ? (
    <ConfirmedVoucher dic={dic} bookReserveInfo={bookReserveInfo} />
   ) : (
    <FailedReserve dic={dic} bookReserveInfo={bookReserveInfo} />
   )}
  </>
 );
}
