import { axios } from '@/app/[lang]/(app)/utils/defaultAxios';
import { type RoomInventory, type ApiCredentialProps } from './hotelApiActions';

type LockGuestInfo = {
 firstName: string;
 lastName: string;
 nationalCode: string | null;
 passport: string | null;
 genderID: number;
};

type LockRoomInfo = {
 roomTypeID: number;
 adult: number;
 earlyCheckin: boolean;
 lateCheckout: boolean;
 isForeigner: boolean;
 guestLockModel: LockGuestInfo;
};

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

type LockReserveResult = {
 lockBookID: number;
 trackingCode: string;
 totalPrice: number;
 arzID: number;
};

type LockInfo = {
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
};

type LockInfoResult = {
 rooms: RoomInventory[];
 guestInfo: LockGuestInfo[];
 lockInfo: LockInfo;
 isBooked: boolean;
};

const getLockInfoApi = '/CRS/OnlineReservation/getLockInformation';

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

export {
 type LockReserveProps,
 type LockReserveResult,
 type LockRoomInfo,
 type LockGuestInfo,
 type LockInfo,
 type LockInfoResult,
};
export { getLockInfoApi, lockReserve, getLockInfo };
