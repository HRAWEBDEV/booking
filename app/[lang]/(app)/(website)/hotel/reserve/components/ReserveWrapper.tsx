import { type ReserveHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/reserve/dictionary';
import ReserveInfoWrapper from './reserve-info/ReserveInfoWrapper';

export default function ReserveWrapper({
 dic,
}: {
 dic: ReserveHotelDictionary;
}) {
 return (
  <div>
   <ReserveInfoWrapper dic={dic} />
  </div>
 );
}
