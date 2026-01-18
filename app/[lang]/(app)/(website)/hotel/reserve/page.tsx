import { getReserveHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/reserve/dictionary';
import { type Locale } from '@/internalization/app/localization';
import ReserveWrapper from './components/ReserveWrapper';
import ReserveConfigProvider from './services/reserve-config/ReserveConfigProvider';

export default async function HotelHomePage(
 props: PageProps<'/[lang]/hotel/reserve'>,
) {
 const { lang } = await props.params;
 const dic = await getReserveHotelDictionary({
  locale: lang as Locale,
 });

 return (
  <ReserveConfigProvider dic={dic}>
   <ReserveWrapper dic={dic} />
  </ReserveConfigProvider>
 );
}
