import { type PreviewHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/preview-hotel/dictionary';
import HotelRoom from './HotelRoom';

export default function HotelRooms({ dic }: { dic: PreviewHotelDictionary }) {
 return (
  <section id='rooms' className='mb-4 grid gap-4'>
   {Array.from({ length: 5 }, (_, i) => i).map((i) => (
    <HotelRoom key={i} dic={dic} />
   ))}
  </section>
 );
}
