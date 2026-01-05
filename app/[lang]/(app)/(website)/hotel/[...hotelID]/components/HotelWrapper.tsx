import { type PreviewHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/preview-hotel/dictionary';
import HotelInfo from './HotelInfo';

export default function HotelWrapper({ dic }: { dic: PreviewHotelDictionary }) {
 return (
  <div>
   <HotelInfo dic={dic} />
  </div>
 );
}
