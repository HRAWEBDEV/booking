import { OutOfContext } from '@/utils/OutOfContext';
import { use, createContext, ActionDispatch } from 'react';
import { type HotelInfo, type RoomInventory } from '../hotelApiActions';
import {
 type SelectedRoom,
 type RoomsPickerActions,
} from '../../utils/hotelRoomsPickerReducer';
import { type RoomTypeCapacityWatcher } from '../../utils/roomTypeCapacityWatcher';

interface HotelConfig {
 hotelInfo: HotelInfo;
 hotelID: string;
 rooms: {
  data: RoomInventory[];
  selectedRooms: SelectedRoom[];
  roomTypeCapacity: RoomTypeCapacityWatcher;
  onUpdateRoomInventory: (RoomInventory: RoomInventory[]) => unknown;
  selectedRoomsDispatch: ActionDispatch<[RoomsPickerActions]>;
 };
 reserve: {
  reserveRoomNights: number;
  fromDateValue: Date | null;
  toDateValue: Date | null;
  onChangeReserveDate: (toDate: Date, fromDate: Date) => unknown;
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
