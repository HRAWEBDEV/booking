import { getReserveHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/reserve/dictionary';
import { type Locale } from '@/internalization/app/localization';
import ReserveConfigProvider from './services/reserve-config/ReserveConfigProvider';

export default async function ReserveHotelLayout(
 props: LayoutProps<'/[lang]/hotel/reserve'>,
) {
 const { lang } = await props.params;
 const dic = await getReserveHotelDictionary({
  locale: lang as Locale,
 });
 return (
  <ReserveConfigProvider dic={dic}>{props.children}</ReserveConfigProvider>
 );
}
