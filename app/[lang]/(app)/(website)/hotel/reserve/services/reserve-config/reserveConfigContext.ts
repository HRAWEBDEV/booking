import { use, createContext, ActionDispatch } from 'react';
import { OutOfContext } from '@/utils/OutOfContext';
import {
 type HotelInfo,
 type RoomInventory,
} from '../../../services/hotelApiActions';
import { type LocalReserveInfo } from '../../../find-hotel/[hotelID]/utils/localReserveInfoManager';
import { type BookingInvoiceInfo } from '../../utils/bookingInvoiceInfo';
import { type RoomsPickerActions } from '../../utils/ReserveRoomsPickerReducer';
import { type BookingInfoSchema } from '../../schemas/bookingInfoSchema';
import { type ReserveStep } from '../../utils/reserveSteps';

interface ReserveConfig {
 reserveInfo: LocalReserveInfo;
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
 onCancelReserve: () => unknown;
 onSubmitBookingFormInfo: () => unknown;
}

const reserveConfigContext = createContext<ReserveConfig | null>(null);

function useReserveConfig() {
 const val = use(reserveConfigContext);
 if (!val) throw new OutOfContext('reserveConfigContext');
 return val;
}

export type { ReserveConfig };
export { reserveConfigContext, useReserveConfig };
