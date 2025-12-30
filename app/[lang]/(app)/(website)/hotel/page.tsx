import { getHotelHomePageDictionary } from '@/internalization/app/dictionaries/website/hotel/home/dictionary';
import { type Locale } from '@/internalization/app/localization';
import HotelHomePageWrapper from './components/HotelHomePageWrapper';

export default async function HotelHomePage(props: PageProps<'/[lang]/hotel'>) {
 const { lang } = await props.params;
 const dic = await getHotelHomePageDictionary({
  locale: lang as Locale,
 });
 return <HotelHomePageWrapper dic={dic} />;
}
