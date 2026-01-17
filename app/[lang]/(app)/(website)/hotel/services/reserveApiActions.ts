import { axios } from '@/app/[lang]/(app)/utils/defaultAxios';
import { type ApiCredentialProps } from './hotelApiActions';

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

export {
 type LockReserveProps,
 type LockReserveResult,
 type LockRoomInfo,
 type LockGuestInfo,
};
export { lockReserve };
