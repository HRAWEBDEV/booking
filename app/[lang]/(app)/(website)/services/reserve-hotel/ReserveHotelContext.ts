import { use, createContext } from 'react';
import { OutOfContext } from '@/utils/OutOfContext';
export interface TrackReserveHotelContextValue {
 isOpen: boolean;
 setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const TrackReserveHotelContext =
 createContext<TrackReserveHotelContextValue | null>(null);

export default function useReserveHotel() {
 const val = use(TrackReserveHotelContext);
 if (!val) throw new OutOfContext('TrackReserveHotelContext');
 return val;
}

export { useReserveHotel, TrackReserveHotelContext };
