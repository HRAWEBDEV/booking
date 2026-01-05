import FindHotelNest from '@/app/[lang]/(app)/(website)/hotel/find-hotel/components/find-hotel-nest/FindHotelNest';
import DisplayFilters from '@/app/[lang]/(app)/(website)/hotel/find-hotel/components/display-filter/DisplayFilters';
import { getFindHotelDictionary } from '@/internalization/app/dictionaries/website/find-hotel/dictionary';
import { type Locale } from '@/internalization/app/localization';
import { HotelsList } from './components/hotels-list/HotelsList';
import HotelFilters from './components/hotel-filters/HotelFilters';
export default async function FindHotelPage(
 props: PageProps<'/[lang]/hotel/find-hotel'>
) {
 const { lang } = await props.params;
 const dic = await getFindHotelDictionary({ locale: lang as Locale });
 return (
  <div className='flex flex-col gap-4 relative '>
   <FindHotelNest />
   <DisplayFilters dic={dic} />
   <div className='flex items-start gap-6'>
    {/* <HotelFilters /> */}
    <HotelsList dic={dic} />
   </div>
  </div>
 );
}

// 1. breadcrumbs -> static now / from query params later
// 2. display filters -> sort display -> right | grid display -> left
// 3. hotelCards | Filter Sidebar ->
