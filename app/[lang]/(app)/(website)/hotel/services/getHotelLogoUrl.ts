import { appendApiUri } from '../../utils/appendApiUri';
import { getSetupProviderCredentials } from '../../utils/getSetupProviderCredentials';
import { getHotelInfoApi, type HotelInfo } from './hotelApiActions';

const cacheTime = 60 * 10;
const requestTimeoutMs = 5000;

async function getHotelLogoUrl(): Promise<string | null> {
 const { channelID, hotelID } = getSetupProviderCredentials();
 const searchParams = new URLSearchParams([
  ['channelID', channelID],
  ['hotelID', hotelID],
 ]);
 const hotelInfo: HotelInfo | null = await fetch(
  `${appendApiUri(getHotelInfoApi)}?${searchParams.toString()}`,
  {
   method: 'GET',
   headers: { 'x-token': process.env.NEXT_PUBLIC_X_AUTH! },
   next: { revalidate: cacheTime },
   signal: AbortSignal.timeout(requestTimeoutMs),
  },
 )
  .then((res) => (res.ok ? res.json() : null))
  .catch((err) => {
   console.log('header hotel logo err', err);
   return null;
  });
 return hotelInfo?.logo ?? null;
}

export { getHotelLogoUrl };
