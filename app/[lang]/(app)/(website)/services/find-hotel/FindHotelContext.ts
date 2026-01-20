import { use, createContext } from 'react';
import { OutOfContext } from '@/utils/OutOfContext';
export interface FindHotelContextValue {
 isRowView: boolean;
 setIsRowView: React.Dispatch<React.SetStateAction<boolean>>;
}
const FindHotelContext = createContext<FindHotelContextValue | null>(null);

export default function useFindHotel() {
 const val = use(FindHotelContext);
 if (!val) throw new OutOfContext('FindHotelContext');
 return val;
}

export { useFindHotel, FindHotelContext };
