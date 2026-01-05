import { getHotelHomePageDictionary } from '@/internalization/app/dictionaries/website/hotel/home/dictionary';
import { type Locale } from '@/internalization/app/localization';
import { Metadata } from 'next';

export async function generateMetadata(
 props: LayoutProps<'/[lang]/hotel'>
): Promise<Metadata> {
 const { lang } = await props.params;
 const dic = await getHotelHomePageDictionary({
  locale: lang as Locale,
 });
 return {
  title: dic.title,
 };
}

export default function HotelHomeLayout(props: LayoutProps<'/[lang]/hotel'>) {
 return (
  <main className='w-[min(100%,var(--website-container-max-width))] mx-auto px-4'>
   {props.children}
  </main>
 );
}
