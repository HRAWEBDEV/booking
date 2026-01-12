import { OutOfContext } from '@/utils/OutOfContext';
import { use, createContext, ActionDispatch } from 'react';
import { type HotelInfo, type RoomInventory } from '../hotelApiActions';
import {
 type SelectedRoom,
 type RoomsPickerActions,
} from '../../utils/hotelRoomsPickerReducer';

interface HotelConfig {
 hotelInfo: HotelInfo;
 hotelID: string;
 rooms: {
  data: RoomInventory[];
  onUpdateRoomInventory: (RoomInventory: RoomInventory[]) => unknown;
  selectedRooms: SelectedRoom[];
  selectedRoomsDispatch: ActionDispatch<[RoomsPickerActions]>;
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
