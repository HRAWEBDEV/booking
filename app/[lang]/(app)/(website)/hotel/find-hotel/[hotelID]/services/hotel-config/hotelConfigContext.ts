import { OutOfContext } from '@/utils/OutOfContext';
import { use, createContext } from 'react';
import { type HotelInfo, type RoomInventory } from '../hotelApiActions';

interface HotelConfig {
 hotelInfo: HotelInfo;
 hotelID: string;
 roomInventories: {
  data: RoomInventory[] | null;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  refetch: () => unknown;
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
