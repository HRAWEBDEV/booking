import { OutOfContext } from '@/utils/OutOfContext';
import { use, createContext, ActionDispatch } from 'react';
import {
 type HotelInfo,
 type RoomInventory,
 type RatePlanType,
} from '../../../../services/hotelApiActions';
import {
 type SelectedRoom,
 type RoomsPickerActions,
} from '../../utils/hotelRoomsPickerReducer';
import { type RoomTypeCapacityWatcher } from '../../utils/roomTypeCapacityWatcher';
import { type HotelDatePickerSchema } from '../../schemas/hotelDatePickerSchema';

interface HotelConfig {
 hotelInfo: HotelInfo;
 hotelID: string;
 ratePlanTypes: {
  data?: Pick<RatePlanType, 'ratePlanID' | 'fName'>[];
  isLoading: boolean;
 };
 rooms: {
  data: RoomInventory[];
  selectedRooms: SelectedRoom[];
  roomTypeCapacity: RoomTypeCapacityWatcher;
  isLoading: boolean;
  onUpdateRoomInventory: (RoomInventory: RoomInventory[]) => unknown;
  selectedRoomsDispatch: ActionDispatch<[RoomsPickerActions]>;
 };
 reserve: {
  reserveRoomNights: number;
  fromDateValue: Date | null;
  toDateValue: Date | null;
  ratePlanValue: string;
  onChangeReserveDate: (params: HotelDatePickerSchema) => unknown;
  onSubmitReserveInfo: () => unknown;
 };
}

const hotelConfigContext = createContext<HotelConfig | null>(null);

function useHotelConfig() {
 const val = use(hotelConfigContext);
 if (!val) throw new OutOfContext('hotelConfigContext');
 return val;
}

export type { HotelConfig };
export { hotelConfigContext, useHotelConfig };
