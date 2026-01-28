import { useBaseConfig } from '@/services/base-config/baseConfigContext';
import { type Locale } from '@/internalization/app/localization';
import { useRouter } from 'next/navigation';

export function useVoucherVCb() {
 const { locale } = useBaseConfig();
 const router = useRouter();

 const redirectLink: Parameters<
  typeof router.push<`/${Locale}/hotel/voucher`>
 >['0'] = `/${locale}/hotel/voucher`;

 return {
  voucherCb: redirectLink,
  goToVoucher: () => {
   router.push(redirectLink);
  },
 };
}
