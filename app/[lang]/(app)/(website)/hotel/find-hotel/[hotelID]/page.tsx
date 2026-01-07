import { type Locale } from '@/internalization/app/localization';
import HotelWrapper from './components/HotelWrapper';
import { getPreviewHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/preview-hotel/dictionary';
import { redirect } from 'next/navigation';
import { fromDateQueryName, toDateQueryName } from './utils/hotelQueries';
import { supportedDateFns } from '@/internalization/app/localization';
import {
 type HotelInfo,
 type HotelFacility,
 type HotelImage,
 type RoomInventory,
 getRoomInventorySearch,
 getHotelImagesApi,
 getHotelInfoApi,
 getHotelFacilitiesApi,
 getRoomInventoriesApi,
} from './services/hotelApiActions';
import { getSetupProviderCredentials } from '../../../utils/getSetupProviderCredentials';
import { appendApiUri } from '../../../utils/appendApiUri';

const dateFns = supportedDateFns['en'];

export default async function HotelPage(
 props: PageProps<'/[lang]/hotel/find-hotel/[hotelID]'>,
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
 const { channelID, providerID, arzID } = getSetupProviderCredentials();
 const requestCredentialHeader = {
  'x-token': process.env.NEXT_PUBLIC_X_AUTH!,
 };

 const hotelInfoSearchParams = new URLSearchParams([
  ['channelID', channelID],
  ['hotelID', hotelID.toString()],
 ]);

 // hotel info
 const hotelInfoPromise = await fetch(
  `${appendApiUri(getHotelInfoApi)}?${hotelInfoSearchParams.toString()}`,
  {
   method: 'GET',
   headers: requestCredentialHeader,
  },
 )
  .then(async (res) => {
   if (res.ok) {
    return (await res.json()) as Promise<HotelInfo>;
   }
   console.log('hotel info err', res.status);
   throw new Error('hotel info error');
  })
  .catch((err) => {
   console.log('hotel info err', err);
   throw new Error('hotel info err', err);
  });
 // hotel image
 const roomInventorySearch = getRoomInventorySearch({
  arzID,
  hotelID,
  providerID,
  channelID,
  checkinDate: fromDateQuery as string,
  checkoutDate: toDateQuery as string,
  ratePlanID: null,
 });
 const [hotelImages] = await Promise.all([
  fetch(
   `${appendApiUri(getHotelImagesApi)}?${hotelInfoSearchParams.toString()}`,
   {
    method: 'GET',
    headers: requestCredentialHeader,
   },
  )
   .then(async (res) => {
    if (res.ok) {
     return (await res.json()) as Promise<HotelImage[]>;
    }
    console.log('hotel image err', res.status);
    return null;
   })
   .catch((err) => {
    console.log('hotel image err', err);
    return null;
   }),
 ]);

 // hotel inventory
 const hotelInventoriesPromise = fetch(
  `${appendApiUri(getRoomInventoriesApi)}?${roomInventorySearch}`,
  {
   method: 'GET',
   headers: requestCredentialHeader,
  },
 )
  .then(async (res) => {
   if (res.ok) {
    return (await res.json()) as Promise<RoomInventory[]>;
   }
   console.log('hotel inventory err', res.status);
   return null;
  })
  .catch((err) => {
   console.log('hotel inventory  err', err);
   return null;
  });
 // hotel facility
 const hotelFacilityPromise = fetch(
  `${appendApiUri(getHotelFacilitiesApi)}?${hotelInfoSearchParams.toString()}`,
  {
   method: 'GET',
   headers: requestCredentialHeader,
  },
 )
  .then((res) => {
   return res.json() as Promise<HotelFacility[]>;
  })
  .catch((err) => {
   console.log('hotel facilities err', err);
   return null;
  });

 return (
  <HotelWrapper
   roomInventoriesPromise={hotelInventoriesPromise}
   hotelInfo={hotelInfoPromise}
   hotelFacilityPromise={hotelFacilityPromise}
   hotelImages={hotelImages}
   fromDate={fromDateQuery as string}
   toDate={toDateQuery as string}
   dic={dic}
   hotelID={hotelID as string}
  />
 );
}
