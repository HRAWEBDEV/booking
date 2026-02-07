import { type Locale } from '@/internalization/app/localization';
import { getReserveVoucherDictionary } from '@/internalization/app/dictionaries/website/hotel/voucher/dictionary';
import VoucherWrapper from './components/VoucherWrapper';
import NotFound from '../../components/NotFound';
import {
 hotelIDQueryName,
 trackingCodeQueryName,
 amountQueryName,
 authorityQueryName,
 gatewayTypeQueryName,
 statusQueryName,
 trackIDQueryName,
 stateQueryName,
 refNumQueryName,
} from './utils/voucherQueries';
import { getSetupProviderCredentials } from '../../utils/getSetupProviderCredentials';
import {
 type BookReserveInfo,
 bookReserveApi,
 getBookReserveParams,
} from '../services/reserveApiActions';
import { appendApiUri } from '../../utils/appendApiUri';
import { GatewayTypes, SEP, ZARIN_PAL } from '../utils/gatewayTypes';

export default async function Voucher(
 props: PageProps<'/[lang]/hotel/voucher'>,
) {
 const { lang } = await props.params;
 const dic = await getReserveVoucherDictionary({
  locale: lang as Locale,
 });
 const { arzID, channelID, providerID } = getSetupProviderCredentials();
 const searchParams = await props.searchParams;
 const hotelID = searchParams[hotelIDQueryName];
 const trackingID = searchParams[trackIDQueryName];
 const trackingCode = searchParams[trackingCodeQueryName];
 const amount = searchParams[amountQueryName];
 const authority = searchParams[authorityQueryName];
 const gatewayType = searchParams[gatewayTypeQueryName];
 const status = searchParams[statusQueryName];
 const state = searchParams[stateQueryName];
 const refNum = searchParams[refNumQueryName];

 if (!hotelID || !trackingID || !amount || !gatewayType)
  return (
   <div className='p-4 py-12'>
    <NotFound />
   </div>
  );

 const requestCredentialHeader = {
  'x-token': process.env.NEXT_PUBLIC_X_AUTH!,
 };

 let bookReserveInfo: BookReserveInfo | null = null;
 async function confirmBooking({ refNum }: { refNum: string }) {
  try {
   const bookReserveRes = await fetch(
    `${appendApiUri(bookReserveApi)}?${getBookReserveParams({
     hotelID: hotelID as string,
     arzID,
     channelID,
     providerID,
     lockBookID: trackingID as string,
    })}`,
    {
     method: 'POST',
     headers: {
      ...requestCredentialHeader,
      'content-type': 'application/json',
     },
     body: JSON.stringify({
      refNum,
      amount,
      paymentGatewayTypeID: gatewayType as string,
     }),
    },
   );
   return bookReserveRes;
  } catch (err) {
   console.log(err);
   return null;
  }
 }

 const gatewayTypeName = GatewayTypes[Number(gatewayType)];

 if (gatewayTypeName === ZARIN_PAL) {
  if (status === 'OK' && authority) {
   const res = await confirmBooking({ refNum: authority as string });
   if (res && res.ok) {
    bookReserveInfo = await res.json();
   }
  }
 } else if (gatewayTypeName === SEP) {
  if (state === 'OK' && refNum) {
   const res = await confirmBooking({ refNum: refNum as string });
   if (res && res.ok) {
    bookReserveInfo = await res.json();
   }
   console.log(await res?.json());
  }
 }

 return (
  <VoucherWrapper
   dic={dic}
   bookReserveInfo={bookReserveInfo}
   trackingCode={trackingCode as string}
  />
 );
}
