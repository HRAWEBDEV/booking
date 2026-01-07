import { Suspense } from 'react';
import { type Locale } from '@/internalization/app/localization';
import HotelWrapper from './components/HotelWrapper';
import { getPreviewHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/preview-hotel/dictionary';
import { redirect } from 'next/navigation';
import { fromDateQueryName, toDateQueryName } from './utils/hotelQueries';
import { supportedDateFns } from '@/internalization/app/localization';
import { type HotelInfo, getHotelInfoApi } from './services/hotelApiActions';
import { getSetupProviderCredentials } from '../../../utils/getSetupProviderCredentials';
import { appendApiUri } from '../../../utils/appendApiUri';

const dateFns = supportedDateFns['en'];

export default async function HotelPage(
 props: PageProps<'/[lang]/hotel/find-hotel/[...hotelID]'>,
) {
 const { lang, hotelID } = await props.params;
 const dic = await getPreviewHotelDictionary({
  locale: lang as Locale,
 });
 //
 const searchParmas = await props.searchParams;
 const fromDateQuery = searchParmas[fromDateQueryName];
 const toDateQuery = searchParmas[toDateQueryName];

 if (!fromDateQuery || !toDateQuery) {
  const startDate = dateFns.startOfDay(new Date());
  const endDate = dateFns.addDays(startDate, 3);
  const newSearchParams = new URLSearchParams([
   [fromDateQueryName, startDate.toISOString()],
   [toDateQueryName, endDate.toISOString()],
  ]);
  redirect(
   `/${lang}/hotel/find-hotel/${hotelID}?${newSearchParams.toString()}`,
  );
 }
 const { channelID } = getSetupProviderCredentials();
 const requestCredentialHeader = {
  'x-token': process.env.NEXT_PUBLIC_X_AUTH!,
 };

 const hotelInfoSearchParams = new URLSearchParams([
  ['channelID', channelID],
  ['hotelID', hotelID.toString()],
 ]);

 const hotelInfoPromise = await fetch(
  `${appendApiUri(getHotelInfoApi)}?${hotelInfoSearchParams.toString()}`,
  {
   method: 'GET',
   headers: requestCredentialHeader,
  },
 ).then(async (res) => {
  return (await res.json()) as Promise<HotelInfo>;
 });

 return <HotelWrapper hotelInfo={hotelInfoPromise} dic={dic} />;
}
