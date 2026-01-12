'use client';
import { Fragment, use, useEffect, useState } from 'react';
import { type PreviewHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/preview-hotel/dictionary';
import HotelRoom from './HotelRoom';
import {
 type RoomInventory,
 getRoomDailyPriceApi,
 getRoomPriceDaily,
} from '../../services/hotelApiActions';
import { useHotelConfig } from '../../services/hotel-config/hotelConfigContext';
import {
 Dialog,
 DialogTrigger,
 DialogClose,
 DialogContent,
 DialogHeader,
} from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { type Room } from '../../utils/hotelRoomsPickerReducer';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { getSetupProviderCredentials } from '@/app/[lang]/(app)/(website)/utils/getSetupProviderCredentials';
import { useDateFns } from '@/hooks/useDateFns';

export default function HotelRooms({
 dic,
 roomInventoriesPromise,
}: {
 dic: PreviewHotelDictionary;
 roomInventoriesPromise: Promise<RoomInventory[] | null>;
}) {
 const dateFns = useDateFns();
 const { arzID, channelID, providerID } = getSetupProviderCredentials();
 const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
 const data = use(roomInventoriesPromise);
 const {
  hotelID,
  rooms: { onUpdateRoomInventory },
 } = useHotelConfig();

 const { data: roomDailyPrice, isLoading: roomDailyPriceIsLoading } = useQuery({
  enabled: !!selectedRoom,
  queryKey: [
   getRoomDailyPriceApi,
   hotelID.toString(),
   selectedRoom?.roomTypeID.toString(),
  ],
  async queryFn({ signal }) {
   const { ratePlanID, roomTypeID, beds } = selectedRoom!;
   const res = await getRoomPriceDaily({
    signal,
    ratePlanID,
    roomTypeID,
    beds,
    hotelID,
    arzID,
    channelID,
    providerID,
    endDate: dateFns
     .addMonths(dateFns.startOfMonth(new Date()), 1)
     .toISOString(),
    startDate: dateFns.startOfMonth(new Date()).toISOString(),
   });
   return res.data;
  },
 });

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
       selectedRoom={selectedRoom}
       setSelectedRoom={setSelectedRoom}
       roomDailyPriceIsLoading={roomDailyPriceIsLoading}
       dic={dic}
       roomType={roomType}
      />
     ))}
    </Fragment>
   ))}
   <Dialog open={false}>
    <DialogContent className='gap-0 p-0'>
     <DialogHeader className='font-medium p-4 text-lg'>
      {dic.hotelRooms.dailyPrice}
     </DialogHeader>
     <div className='p-4 grid place-content-center *:[--cell-size:2.5rem] md:*:[--cell-size:3rem] lg:*:[--cell-size:4rem]'>
      <Calendar mode='single' />
     </div>
    </DialogContent>
   </Dialog>
  </section>
 );
}
