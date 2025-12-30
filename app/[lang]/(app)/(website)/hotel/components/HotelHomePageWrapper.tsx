import { type HotelHomePageDictionary } from '@/internalization/app/dictionaries/website/hotel/home/dictionary';
import CitiesHotelsSection from './cities/CitiesHotelsSection';
import TrendHotelsSection from './trend-hotels/TrendHotelsSection';

export default function HotelHomePageWrapper({
 dic,
}: {
 dic: HotelHomePageDictionary;
}) {
 return (
  <main>
   <CitiesHotelsSection dic={dic} />
   <TrendHotelsSection dic={dic} />
  </main>
 );
}
