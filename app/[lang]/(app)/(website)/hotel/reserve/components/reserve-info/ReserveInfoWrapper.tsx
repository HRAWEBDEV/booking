import { type ReserveHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/reserve/dictionary';
import ReserveInfoSummary from './ReserveInfoSummary';
import ReserveInfoForm from './ReserveInfoForm';

export default function ReserveInfoWrapper({
 dic,
}: {
 dic: ReserveHotelDictionary;
}) {
 return (
  <div className='grid grid-cols-[1fr_20rem]'>
   <ReserveInfoForm dic={dic} />
   <ReserveInfoSummary dic={dic} />
  </div>
 );
}
