import { type ReserveHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/reserve/dictionary';
import ReserveInfoWrapper from './reserve-info/ReserveInfoWrapper';
import ReserveConfigProvider from '../services/reserve-config/ReserveConfigProvider';

export default function ReserveWrapper({
 dic,
}: {
 dic: ReserveHotelDictionary;
}) {
 return (
  <ReserveConfigProvider dic={dic}>
   <ReserveInfoWrapper dic={dic} />
  </ReserveConfigProvider>
 );
}
