import { axios } from '@/app/[lang]/(app)/utils/defaultAxios';
import { type RoomInventory, type ApiCredentialProps } from './hotelApiActions';

interface LockGuestInfo {
 firstName: string;
 lastName: string;
 nationalCode: string | null;
 passport: string | null;
 genderID: number;
}

interface LockRoomInfo {
 roomTypeID: number;
 adult: number;
 earlyCheckin: boolean;
 lateCheckout: boolean;
 isForeigner: boolean;
 guestLockModel: LockGuestInfo;
}

type LockReserveProps = {
 firstName: string;
 arrivelDate: string;
 depatureDate: string;
 contactNo: string;
 ratePlanID: number;
 rateTypeID: number;
 lastName: string;
 email: string | null;
 nationalCode: string;
 lockInfo: LockRoomInfo[];
} & ApiCredentialProps;

interface LockReserveResult {
 lockBookID: number;
 trackingCode: string;
 totalPrice: number;
 arzID: number;
}

interface LockInfo {
 id: number;
 arzID: number;
 hotelID: number;
 channelID: number;
 providerID: number;
 firstName: string;
 lastName: string;
 email: string | null;
 contactNo: string | null;
 arrivelDateTimeOffset: string;
 departureDateTimeOffset: string;
 totalPrice: number;
 trackingCode: string;
 nationalCode: string;
}

interface LockInfoResult {
 rooms: RoomInventory[];
 guestInfo: LockGuestInfo[];
 lockInfo: LockInfo;
 isBooked: boolean;
}

interface GateWay {
 id: number;
 paymentGatewayTypeID: number;
 paymentGatewayTypeName: string;
}

interface PaymentLink {
 token: null | string;
 gatewayUrl: string | null;
}

type BookReserveInfo = {
 success: boolean;
 bookInfo: {
  reserveID: number;
  reserveNo: number;
 } & Pick<LockInfoResult, 'lockInfo'>;
};

const getLockInfoApi = '/CRS/OnlineReservation/getLockInformation';
const cancelReserveLockApi = '/CRS/OnlineReservation/CancelLock';
const getGatewaysApi = '/CRS/OnlineReservation/getGateways';
const getPaymentLinkApi = '/CRS/OnlineReservation/getPaymentLink';
const bookReserveApi = '/CRS/OnlineReservation/book';

function lockReserve({ lockInfo, ...queries }: LockReserveProps) {
 const searchParams = new URLSearchParams();
 Object.entries(queries).forEach(([key, val]) => {
  if (val !== undefined) {
   searchParams.set(key, String(val));
  }
 });
 return axios.post<LockReserveResult>(
  `/CRS/OnlineReservation/LockBook?${searchParams.toString()}`,
  lockInfo,
 );
}

function cancelReserveLock(
 props: Omit<ApiCredentialProps, 'arzID'> & {
  lockBookID: number;
 },
) {
 const searchParams = new URLSearchParams();
 Object.entries(props).forEach(([key, val]) => {
  if (val !== undefined) {
   searchParams.set(key, String(val));
  }
 });
 return axios.get(`${cancelReserveLockApi}?${searchParams.toString()}`);
}

function getLockInfo({
 signal,
 trackingCode,
}: {
 signal: AbortSignal;
 trackingCode: string;
}) {
 const searchParams = new URLSearchParams([['trackingCode', trackingCode]]);
 return axios.get<LockInfoResult>(
  `${getLockInfoApi}?${searchParams.toString()}`,
  {
   signal,
  },
 );
}

function getGateways({
 hotelID,
 signal,
}: {
 hotelID: string;
 signal: AbortSignal;
}) {
 const searchParams = new URLSearchParams([['hotelID', hotelID]]);
 return axios.get<GateWay[]>(`${getGatewaysApi}?${searchParams.toString()}`, {
  signal,
 });
}

function getPaymentLink({
 hotelID,
 paymentGatewayTypeID,
 ...postPackage
}: {
 hotelID: string;
 paymentGatewayTypeID: string;
 callback_url: string;
 resNum: string;
 amount: number;
 mobile: string;
}) {
 const searchParams = new URLSearchParams([
  ['hotelID', hotelID],
  ['paymentGatewayTypeID', paymentGatewayTypeID],
 ]);
 return axios.post<PaymentLink>(
  `${getPaymentLinkApi}?${searchParams.toString()}`,
  postPackage,
 );
}

function getBookReserveParams(
 queries: ApiCredentialProps & {
  lockBookID: string;
 },
) {
 const searchParams = new URLSearchParams();
 Object.entries(queries).forEach(([key, val]) => {
  if (val !== undefined) {
   searchParams.set(key, String(val));
  }
 });
 return searchParams;
}

function bookReserve({
 refNum,
 amount,
 paymentGatewayTypeID,
 ...queries
}: ApiCredentialProps & {
 lockBookID: string;
 refNum: string;
 amount: number;
 paymentGatewayTypeID: number;
}) {
 const searchParams = getBookReserveParams(queries);
 return axios.post<BookReserveInfo>(
  `${bookReserveApi}?${searchParams.toString()}`,
  {
   refNum,
   amount,
   paymentGatewayTypeID,
  },
 );
}

const downloadReserveVoucher = ({
 ...queries
}: {
 reserveID: string;
 channelID: string;
 hotelID: string;
}) => {
 const searchParams = new URLSearchParams();
 Object.entries(queries).forEach(([key, val]) => {
  searchParams.set(key, String(val));
 });
 return axios.get<Blob>(
  `${'/CRS/OnlineReservation/GetVoucher'}?${searchParams.toString()}`,
  {
   responseType: 'blob',
  },
 );
};

export {
 type LockReserveProps,
 type LockReserveResult,
 type LockRoomInfo,
 type LockGuestInfo,
 type LockInfo,
 type LockInfoResult,
 type GateWay,
 type PaymentLink,
 type BookReserveInfo,
};
export {
 getLockInfoApi,
 getGatewaysApi,
 cancelReserveLockApi,
 bookReserveApi,
 lockReserve,
 getLockInfo,
 getGateways,
 getPaymentLink,
 getBookReserveParams,
 bookReserve,
 cancelReserveLock,
 downloadReserveVoucher,
};
