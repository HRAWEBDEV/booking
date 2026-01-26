import { type SelectedRoom } from './hotelRoomsPickerReducer';

interface ReserveInfo {
 totalPrice: number;
 totalDiscountPrice: number;
}

function getReserveInfo(rooms: SelectedRoom[]) {
 return rooms.reduce(
  (acc, cur) => {
   return {
    totalDiscountPrice: acc.totalDiscountPrice + cur.discountPrice * cur.count,
    totalPrice: acc.totalPrice + cur.price * cur.count,
   };
  },
  {
   totalDiscountPrice: 0,
   totalPrice: 0,
   totalDiscountPercent: 0,
  } as ReserveInfo,
 );
}

export type { ReserveInfo };
export { getReserveInfo };
