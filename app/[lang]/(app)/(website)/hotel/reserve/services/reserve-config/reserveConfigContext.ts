import { use, createContext } from 'react';
import { OutOfContext } from '@/utils/OutOfContext';
import {
 type HotelInfo,
 type RoomInventory,
} from '../../../services/hotelApiActions';
import { type LocalReserveInfo } from '../../../find-hotel/[hotelID]/utils/localReserveInfoManager';
import { type BookingInvoiceInfo } from '../../utils/bookingInvoiceInfo';

interface ReserveConfig {
 reserveInfo: LocalReserveInfo;
 bookingInvoiceInfo: BookingInvoiceInfo;
 rooms: {
  data?: RoomInventory[];
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
}

const reserveConfigContext = createContext<ReserveConfig | null>(null);

function useReserveConfig() {
 const val = use(reserveConfigContext);
 if (!val) throw new OutOfContext('reserveConfigContext');
 return val;
}

export type { ReserveConfig };
export { reserveConfigContext, useReserveConfig };
