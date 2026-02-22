import { type ReserveHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/reserve/dictionary';
import PaymentInfo from './PaymentInfo';
import PaymentSummary from './PaymentSummary';

export default function PaymentWrapper({
 dic,
}: {
 dic: ReserveHotelDictionary;
}) {
 return (
  <div className='grid grid-cols-1 lg:grid-cols-[1fr_24rem] gap-4 mb-4 gap-y-0'>
   <PaymentInfo dic={dic} />
   <PaymentSummary dic={dic} />
  </div>
 );
}
