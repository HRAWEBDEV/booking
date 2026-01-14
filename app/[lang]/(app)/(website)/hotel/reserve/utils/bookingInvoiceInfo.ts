import { type RoomInventory } from '../../services/hotelApiActions';

interface BookingInvoiceInfo {
 totalDiscount: number;
 price: number;
 totalDiscountPrice: number;
}

function getBookingInvoiceInfo({
 rooms,
}: {
 rooms: RoomInventory[];
}): BookingInvoiceInfo {
 return rooms.reduce(
  (acc, cur) => {
   const newPrice = acc.price + cur.accommodationTypePrice.roomOnlineShowRate;
   const newTotalDiscountPrice =
    acc.price + cur.accommodationTypePrice.netRoomRate;
   const newTotalDiscount = newPrice - newTotalDiscountPrice;

   return {
    totalDiscount: newTotalDiscount,
    price: newPrice,
    totalDiscountPrice: newTotalDiscountPrice,
   };
  },
  {
   totalDiscount: 0,
   price: 0,
   totalDiscountPrice: 0,
  } as BookingInvoiceInfo,
 );
}

export type { BookingInvoiceInfo };
export { getBookingInvoiceInfo };
