'use client';
import { Fragment } from 'react';
import { type PreviewHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/preview-hotel/dictionary';
import HotelRoom from './HotelRoom';
import { useHotelConfig } from '../../services/hotel-config/hotelConfigContext';

export default function HotelRooms({ dic }: { dic: PreviewHotelDictionary }) {
 const {
  roomInventories: { data },
 } = useHotelConfig();
 console.log(data);

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
