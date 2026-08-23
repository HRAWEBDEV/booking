import { Metadata } from 'next';
import { getReserveHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/reserve/dictionary';
import { type Locale } from '@/internalization/app/localization';

export async function generateMetadata(
 props: PageProps<'/[lang]/hotel/reserve'>,
): Promise<Metadata> {
 const { lang } = await props.params;
 const dic = await getReserveHotelDictionary({
  locale: lang as Locale,
 });
 return {
  title: dic.title,
 };
}

export default function ReserveHotelLayout(
 props: LayoutProps<'/[lang]/hotel/reserve'>,
) {
 return (
  <div className='min-h-[calc(100svh-var(--website-header-height))]'>
   {props.children}
  </div>
 );
}
