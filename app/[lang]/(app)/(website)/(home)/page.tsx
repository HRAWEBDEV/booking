import HotelHomePageWrapper from '../hotel/components/HotelHomePageWrapper';
import { getHotelHomePageDictionary } from '@/internalization/app/dictionaries/website/hotel/home/dictionary';
import { type Locale } from '@/internalization/app/localization';
import { Metadata } from 'next';
export async function generateMetadata({
 props,
}: {
 props: PageProps<'/[lang]/hotel'>;
}): Promise<Metadata> {
 const { lang } = await props.params;
 const dic = await getHotelHomePageDictionary({
  locale: lang as Locale,
 });

 return {
  metadataBase:
   process.env.NEXT_PUBLIC_MODE === 'PRODUCTION'
    ? process.env.NEXT_PUBLIC_BASE_URL
    : '',
  title: dic.metadata.hotel.title,
  description: dic.metadata.hotel.description,
  keywords: dic.metadata.hotel.keywords,
 };
}
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
