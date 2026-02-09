import { use, createContext, ActionDispatch } from 'react';
import { OutOfContext } from '@/utils/OutOfContext';
import {
 type HotelInfo,
 type RoomInventory,
} from '../../../services/hotelApiActions';
import {
 type LockInfoResult,
 type GateWay,
} from '../../../services/reserveApiActions';
import { type BookingInvoiceInfo } from '../../utils/bookingInvoiceInfo';
import { type RoomsPickerActions } from '../../utils/ReserveRoomsPickerReducer';
import { type BookingInfoSchema } from '../../schemas/bookingInfoSchema';
import { type ReserveStep } from '../../utils/reserveSteps';
import { ErrorInfo } from '@/app/[lang]/(app)/utils/apiBaseTypes';
import { AxiosError } from 'axios';

interface ReserveConfig {
 fromDate?: string;
 toDate?: string;
 nights: number;
 bookingInvoiceInfo: BookingInvoiceInfo;
 activeReserveStep: ReserveStep;
 rooms: {
  guestInfo: BookingInfoSchema['guestInfo'];
  data?: RoomInventory[];
  storeRooms: RoomInventory[];
  storeRoomsDispatcher: ActionDispatch<[action: RoomsPickerActions]>;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
 };
 hotelInfo: {
  data?: HotelInfo;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
 };
 lockInfo: {
  data?: LockInfoResult;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  lockExpireTime?: number;
  lockExpireTimeIsLoading: boolean;
  lockExpireTimeIsError: boolean;
  lockExpireTimeIsSuccess: boolean;
 };
 gateways: {
  data?: GateWay[];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  selectedGateway: GateWay | null;
  setSelectedGateway: (prop: GateWay | null) => unknown;
 };
 confirmReserveIsPending: boolean;
 confirmReserveError: AxiosError<ErrorInfo, any> | null;
 confirmPaymentIsPending: boolean;
 cancelReserveIsLoading: boolean;
 onCancelReserve: () => unknown;
 onSubmitBookingFormInfo: () => unknown;
 onConfirmPayment: () => unknown;
}

const reserveConfigContext = createContext<ReserveConfig | null>(null);

function useReserveConfig() {
 const val = use(reserveConfigContext);
 if (!val) throw new OutOfContext('reserveConfigContext');
 return val;
}

export type { ReserveConfig };
export { reserveConfigContext, useReserveConfig };
