import { getSetupProviderCredentials } from '../utils/getSetupProviderCredentials';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';
import { useRouter } from 'next/navigation';
import { Locale } from '@/internalization/app/localization';

export function useGoHome() {
 const router = useRouter();
 const { locale } = useBaseConfig();
 const { hotelID } = getSetupProviderCredentials();
 const redirectLink: Parameters<
  typeof router.push<`/${Locale}` | `/${Locale}/hotel/find-hotel/${string}`>
 >['0'] = hotelID ? `/${locale}/hotel/find-hotel/${hotelID}` : `/${locale}`;
 return {
  link: redirectLink,
  goHome: () => {
   router.push(redirectLink);
  },
 };
}
