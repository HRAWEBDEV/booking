import { OutOfContext } from '@/utils/OutOfContext';
import { use, createContext } from 'react';
import { type HotelInfo } from '../hotelApiActions';

interface HotelConfig {
 hotelInfo: HotelInfo;
 hotelID: string;
}

const hotelConfigContext = createContext<HotelConfig | null>(null);

function useHotelConfig() {
 const val = use(hotelConfigContext);
 if (!val) throw new OutOfContext('hotelConfigContext');
 return val;
}

export type { HotelConfig };
export { hotelConfigContext, useHotelConfig };
