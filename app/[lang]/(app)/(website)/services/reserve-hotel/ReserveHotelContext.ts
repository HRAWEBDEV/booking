import { use, createContext } from 'react';
import { OutOfContext } from '@/utils/OutOfContext';
export interface ReserveHotelContextValue {
 isOpen: boolean;
 setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const ReserveHotelContext = createContext<ReserveHotelContextValue | null>(
 null,
);

export default function useReserveHotel() {
 const val = use(ReserveHotelContext);
 if (!val) throw new OutOfContext('ReserveHotelContext');
 return val;
}

export { useReserveHotel, ReserveHotelContext };
