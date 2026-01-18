import { type ReserveHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/reserve/dictionary';
import ReserveInfoSummary from './ReserveInfoSummary';
import ReserveInfoForm from './ReserveInfoForm';

export default function ReserveInfoWrapper({
 dic,
}: {
 dic: ReserveHotelDictionary;
}) {
 return (
  <div className='grid grid-cols-1 lg:grid-cols-[1fr_24rem] gap-4'>
   <ReserveInfoForm dic={dic} />
   <ReserveInfoSummary dic={dic} />
  </div>
 );
}
