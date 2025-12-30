import HotelHomePageWrapper from '../hotel/components/HotelHomePageWrapper';
import { getHotelHomePageDictionary } from '@/internalization/app/dictionaries/website/hotel/home/dictionary';
import { type Locale } from '@/internalization/app/localization';

export default async function WebsitePage(props: PageProps<'/[lang]/hotel'>) {
 const { lang } = await props.params;
 const dic = await getHotelHomePageDictionary({
  locale: lang as Locale,
 });
 return (
  <div>
   <HotelHomePageWrapper dic={dic} />
  </div>
 );
}
