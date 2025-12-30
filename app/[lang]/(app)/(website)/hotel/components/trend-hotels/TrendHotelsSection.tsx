import { type HotelHomePageDictionary } from '@/internalization/app/dictionaries/website/hotel/home/dictionary';

export default function TrendHotelsSection({
 dic,
}: {
 dic: HotelHomePageDictionary;
}) {
 return (
  <section className='px-2 md:px-4 w-[min(100%,var(--website-container-max-width))] mx-auto py-4'>
   <div>
    <h2 className='font-medium text-xl'>{dic.trendSections.title}</h2>
   </div>
  </section>
 );
}
