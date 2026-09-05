import { type RoomInventory } from '../../services/hotelApiActions';

interface BookingInvoiceInfo {
 totalDiscount: number;
 price: number;
 totalDiscountPrice: number;
 commitionPrice: number;
}

function getBookingInvoiceInfo({
 rooms,
 onlineReservationCommitionRate,
}: {
 rooms: RoomInventory[];
 onlineReservationCommitionRate: number;
}): BookingInvoiceInfo {
 const result = rooms.reduce(
  (acc, cur) => {
   const newPrice = acc.price + cur.accommodationTypePrice.roomOnlineShowRate;
   const newTotalDiscountPrice =
    acc.totalDiscountPrice + cur.accommodationTypePrice.netRoomRate;
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
  } as Omit<BookingInvoiceInfo, 'commitionPrice'>,
 );
 const commitionPrice = Math.round(
  (result.totalDiscountPrice * onlineReservationCommitionRate) / 100,
 );
 result.totalDiscountPrice += commitionPrice;
 return { ...result, commitionPrice };
}

export type { BookingInvoiceInfo };
export { getBookingInvoiceInfo };
