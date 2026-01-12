'use client';
import { Fragment, use, useEffect } from 'react';
import { type PreviewHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/preview-hotel/dictionary';
import HotelRoom from './HotelRoom';
import { RoomInventory } from '../../services/hotelApiActions';
import { useHotelConfig } from '../../services/hotel-config/hotelConfigContext';

export default function HotelRooms({
 dic,
 roomInventoriesPromise,
}: {
 dic: PreviewHotelDictionary;
 roomInventoriesPromise: Promise<RoomInventory[] | null>;
}) {
 const data = use(roomInventoriesPromise);
 const {
  rooms: { onUpdateRoomInventory },
 } = useHotelConfig();

 useEffect(() => {
  onUpdateRoomInventory(data || []);
 }, [data, onUpdateRoomInventory]);
 return (
  <section id='rooms' className='scroll-mt-16 mb-4 grid gap-4'>
   {data?.map((roomType) => (
    <Fragment key={roomType.roomTypeID}>
     {roomType.accommodationTypePrices.map((accType) => (
      <HotelRoom
       accType={accType}
       key={
        accType.beds.toString() +
        accType.accommodationRatePlanModel.ratePlanID.toString() +
        accType.accommodationRatePlanModel.ratePlanModel.ratePlanTypeID.toString()
       }
       dic={dic}
       roomType={roomType}
      />
     ))}
    </Fragment>
   ))}
  </section>
 );
}
