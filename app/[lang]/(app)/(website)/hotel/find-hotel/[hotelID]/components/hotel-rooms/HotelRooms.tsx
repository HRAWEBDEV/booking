'use client';
import { Fragment, use } from 'react';
import { type PreviewHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/preview-hotel/dictionary';
import HotelRoom from './HotelRoom';
import { RoomInventory } from '../../services/hotelApiActions';

export default function HotelRooms({
 dic,
 roomInventoriesPromise,
}: {
 dic: PreviewHotelDictionary;
 roomInventoriesPromise: Promise<RoomInventory[] | null>;
}) {
 const data = use(roomInventoriesPromise);
 return (
  <section id='rooms' className='scroll-mt-16 mb-4 grid gap-4'>
   {data?.map((roomType) => (
    <Fragment key={roomType.roomTypeID}>
     {roomType.accommodationTypePrices.map((accType, i) => (
      <HotelRoom accType={accType} key={i} dic={dic} roomType={roomType} />
     ))}
    </Fragment>
   ))}
  </section>
 );
}
