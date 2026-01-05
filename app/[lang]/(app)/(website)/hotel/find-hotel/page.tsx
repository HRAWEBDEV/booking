import { getFindHotelDictionary } from '@/internalization/app/dictionaries/website/find-hotel/dictionary';
import { type Locale } from '@/internalization/app/localization';
import FindHotelWrapper from './components/find-hotel-wrapper/FindHotelWrapper';
export default async function FindHotelPage(
 props: PageProps<'/[lang]/hotel/find-hotel'>
) {
 const { lang } = await props.params;
 const dic = await getFindHotelDictionary({ locale: lang as Locale });
 return (
  <div className='flex flex-col gap-4 relative '>
   <FindHotelWrapper dic={dic} />
  </div>
 );
}
