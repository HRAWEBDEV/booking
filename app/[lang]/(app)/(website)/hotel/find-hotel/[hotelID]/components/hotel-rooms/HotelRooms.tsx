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
 DialogTitle,
 DialogContent,
 DialogHeader,
} from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { type Room } from '../../utils/hotelRoomsPickerReducer';
import { useQuery } from '@tanstack/react-query';
import { getSetupProviderCredentials } from '@/app/[lang]/(app)/(website)/utils/getSetupProviderCredentials';
import { useDateFns } from '@/hooks/useDateFns';
import { roomStates, roomStatesStyles } from '../../utils/roomStates';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';
import { useCurrencyFormatter } from '@/hooks/useCurrencyFormatter';
import { Skeleton } from '@/components/ui/skeleton';

export default function HotelRooms({
 dic,
 roomInventoriesPromise,
}: {
 dic: PreviewHotelDictionary;
 roomInventoriesPromise: Promise<RoomInventory[] | null>;
}) {
 const { locale } = useBaseConfig();
 const numberFormatter = useCurrencyFormatter();
 const dateFns = useDateFns();
 const { arzID, channelID, providerID } = getSetupProviderCredentials();
 const [showDailyPrice, setShowDailyPrice] = useState(false);
 const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
 const data = use(roomInventoriesPromise);
 const {
  hotelID,
  rooms: { onUpdateRoomInventory },
  reserve: { fromDateValue },
 } = useHotelConfig();

 const [dailyPriceDate, setDailyPriceDate] = useState(
  fromDateValue
   ? dateFns.startOfMonth(fromDateValue)
   : dateFns.startOfMonth(new Date()),
 );

 function handleShowDailyPrice(newRoom: Room) {
  setSelectedRoom(newRoom);
  setShowDailyPrice(true);
 }

 const { data: roomDailyPrice, isFetching: roomDailyPriceIsLoading } = useQuery(
  {
   enabled: !!selectedRoom,
   queryKey: [
    getRoomDailyPriceApi,
    hotelID.toString(),
    selectedRoom?.roomTypeID.toString(),
    dailyPriceDate.toISOString(),
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
      .addDays(dateFns.endOfMonth(dailyPriceDate), 1)
      .toISOString(),
     startDate: dailyPriceDate.toISOString(),
    });
    return res.data;
   },
  },
 );

 useEffect(() => {
  onUpdateRoomInventory(data || []);
 }, [data, onUpdateRoomInventory]);

 useEffect(() => {
  if (!fromDateValue) return;
  setDailyPriceDate(dateFns.startOfMonth(fromDateValue));
 }, [fromDateValue, dateFns]);

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
      <DialogTitle className='text-base font-medium'>
       {dic.hotelRooms.dailyPrice}{' '}
       <span className='text-sm text-neutral-500'>(x ۱۰۰۰) (ریال)</span>
      </DialogTitle>
     </DialogHeader>
     <div className='grow overflow-auto flex flex-col *:[--cell-size:2.5rem] md:*:[--cell-size:3rem] lg:*:[--cell-size:3.3rem]'>
      <Calendar
       showOutsideDays={false}
       mode='single'
       selected={dailyPriceDate}
       defaultMonth={dailyPriceDate}
       onMonthChange={(selected) =>
        setDailyPriceDate(dateFns.startOfMonth(selected!))
       }
       components={{
        DayButton(props) {
         const dayDate = props.day.date;
         const dayNumber = dayDate.toLocaleDateString(locale, {
          day: 'numeric',
         });
         const dayPrice = roomDailyPrice?.find((item) => {
          return new Date(item.date).getTime() === dayDate.getTime();
         });
         return (
          <div
           className={`${props.className} size-(--cell-size) relative flex flex-col`}
          >
           <div className='basis-5'></div>
           <div className='grow text-center grid place-content-center text-neutral-600 dark:text-neutral-400'>
            {dayNumber}
           </div>
           <div className='text-[0.7rem] basis-5 font-medium'>
            {dayPrice && !roomDailyPriceIsLoading ? (
             numberFormatter.format(dayPrice?.roomOnlineShowRate / 1000)
            ) : roomDailyPriceIsLoading ? (
             <div className='px-2'>
              <Skeleton className='h-3' />
             </div>
            ) : (
             ''
            )}
           </div>
          </div>
         );
        },
       }}
       className='m-auto'
      />
      <div className='px-4 py-2'>
       <div className='flex flex-wrap gap-4 justify-center bg-neutral-100 dark:bg-neutral-900 border border-input rounded-md p-2'>
        {roomStates.map((state) => (
         <div key={state} className='flex gap-1 items-center'>
          <div
           className={`size-4 rounded-full ${roomStatesStyles.get(state)?.backgroundColor}`}
          ></div>
          <p className='text-xs text-neutral-700 dark:text-neutral-400'>
           {dic.hotelDatePicker[state]}
          </p>
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
