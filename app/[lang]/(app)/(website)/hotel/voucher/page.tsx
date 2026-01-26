import { type Locale } from '@/internalization/app/localization';
import { getReserveVoucherDictionary } from '@/internalization/app/dictionaries/website/hotel/voucher/dictionary';
import VoucherWrapper from './components/VoucherWrapper';

export default async function Voucher(
 props: PageProps<'/[lang]/hotel/voucher'>,
) {
 const { lang } = await props.params;
 const dic = await getReserveVoucherDictionary({
  locale: lang as Locale,
 });
 return <VoucherWrapper dic={dic} />;
}
