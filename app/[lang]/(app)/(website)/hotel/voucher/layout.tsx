import { Metadata } from 'next';
import { type Locale } from '@/internalization/app/localization';
import { getReserveVoucherDictionary } from '@/internalization/app/dictionaries/website/hotel/voucher/dictionary';

export async function generateMetadata(
 props: PageProps<'/[lang]/hotel/reserve'>,
): Promise<Metadata> {
 const { lang } = await props.params;
 const dic = await getReserveVoucherDictionary({
  locale: lang as Locale,
 });
 return {
  title: dic.metadata.title,
  description: dic.metadata.description,
 };
}

export default function ReserveVoucherLayout(
 props: LayoutProps<'/[lang]/hotel/voucher'>,
) {
 return <>{props.children}</>;
}
