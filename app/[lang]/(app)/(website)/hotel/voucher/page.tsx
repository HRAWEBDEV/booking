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
} from './utils/voucherQueries';
import { getSetupProviderCredentials } from '../../utils/getSetupProviderCredentials';
import {
 type BookReserveInfo,
 bookReserveApi,
 getBookReserveParams,
} from '../services/reserveApiActions';
import { appendApiUri } from '../../utils/appendApiUri';

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

 if (!hotelID || !trackingID || !amount)
  return (
   <div className='py-12'>
    <NotFound />
   </div>
  );

 const requestCredentialHeader = {
  'x-token': process.env.NEXT_PUBLIC_X_AUTH!,
 };

 let bookReserveInfo: BookReserveInfo | null = null;
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
     refNum: authority as string,
     amount,
     paymentGatewayTypeID: gatewayType as string,
    }),
   },
  );
  if (bookReserveRes.ok) {
   bookReserveInfo = await bookReserveRes.json();
  }
 } catch (err) {
  console.log(err);
 }

 return <VoucherWrapper dic={dic} bookReserveInfo={bookReserveInfo} />;
}
