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
 DialogTitle,
 DialogContent,
 DialogHeader,
} from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { type Room } from '../../utils/hotelRoomsPickerReducer';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { getSetupProviderCredentials } from '@/app/[lang]/(app)/(website)/utils/getSetupProviderCredentials';
import { useDateFns } from '@/hooks/useDateFns';
import { roomStates, roomStatesStyles } from '../../utils/roomStates';

export default function HotelRooms({
 dic,
 roomInventoriesPromise,
}: {
 dic: PreviewHotelDictionary;
 roomInventoriesPromise: Promise<RoomInventory[] | null>;
}) {
 const dateFns = useDateFns();
 const { arzID, channelID, providerID } = getSetupProviderCredentials();
 const [showDailyPrice, setShowDailyPrice] = useState(false);
 const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
 const data = use(roomInventoriesPromise);
 const {
  hotelID,
  rooms: { onUpdateRoomInventory },
 } = useHotelConfig();

 function handleShowDailyPrice(newRoom: Room) {
  setSelectedRoom(newRoom);
  setShowDailyPrice(true);
 }

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
       onShowDailyPrice={handleShowDailyPrice}
       roomDailyPriceIsLoading={roomDailyPriceIsLoading}
       dic={dic}
       roomType={roomType}
      />
     ))}
    </Fragment>
   ))}
   <Dialog open={showDailyPrice} onOpenChange={setShowDailyPrice}>
    <DialogContent className='gap-0 p-0 flex flex-col overflow-hidden max-h-[90svh]'>
     <DialogHeader className='p-4 shrink-0'>
      <DialogTitle className='text-lg font-medium'>
       {dic.hotelRooms.dailyPrice}
      </DialogTitle>
     </DialogHeader>
     <div className='grow overflow-auto flex flex-col *:[--cell-size:2.5rem] md:*:[--cell-size:3rem] lg:*:[--cell-size:3.3rem]'>
      <Calendar mode='single' className='m-auto' />
      <div className='px-4 py-2'>
       <div className='flex flex-wrap gap-4 justify-center bg-neutral-200 dark:bg-neutral-800 border border-input rounded-md p-2'>
        {roomStates.map((state) => (
         <div key={state} className='flex gap-1 items-center'>
          <div
           className={`size-4 rounded-full ${roomStatesStyles.get(state)?.backgroundColor}`}
          ></div>
          <p className='text-xs'>{dic.hotelDatePicker[state]}</p>
         </div>
        ))}
       </div>
      </div>
     </div>
    </DialogContent>
   </Dialog>
  </section>
 );
}
