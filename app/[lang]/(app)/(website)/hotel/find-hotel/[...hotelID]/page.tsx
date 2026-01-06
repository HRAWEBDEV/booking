import { type Locale } from '@/internalization/app/localization';
import HotelWrapper from './components/HotelWrapper';
import { getPreviewHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/preview-hotel/dictionary';

export default async function HotelPage(
 props: PageProps<'/[lang]/hotel/find-hotel/[...hotelID]'>,
) {
 const { lang } = await props.params;
 const dic = await getPreviewHotelDictionary({
  locale: lang as Locale,
 });
 return <HotelWrapper dic={dic} />;
}
