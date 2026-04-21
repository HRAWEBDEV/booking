import { getSetupProviderCredentials } from '../utils/getSetupProviderCredentials';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';
import { useRouter, usePathname } from 'next/navigation';
import { Locale } from '@/internalization/app/localization';
import { useDateFns } from '@/hooks/useDateFns';
import {
 fromDateQueryName,
 toDateQueryName,
} from '../hotel/find-hotel/[hotelID]/utils/hotelQueries';

export function useGoHome() {
 const router = useRouter();
 const pathname = usePathname();
 const dateFns = useDateFns();

 const startDate = dateFns.startOfDay(new Date());
 const endDate = dateFns.addDays(startDate, 1);
 const { locale } = useBaseConfig();
 const { hotelID } = getSetupProviderCredentials();

 const searchParams = new URLSearchParams([
  [fromDateQueryName, startDate.toISOString()],
  [toDateQueryName, endDate.toISOString()],
 ]);

 const redirectLink: Parameters<
  typeof router.push<`/${Locale}` | `/${Locale}/hotel/find-hotel/${string}`>
 >['0'] = hotelID
  ? `/${locale}/hotel/find-hotel/${hotelID}?${searchParams}#`
  : `/${locale}`;
 const isHomePage = pathname === redirectLink;
 return {
  link: redirectLink,
  isHomePage,
  goHome: () => {
   router.push(redirectLink);
  },
 };
}
