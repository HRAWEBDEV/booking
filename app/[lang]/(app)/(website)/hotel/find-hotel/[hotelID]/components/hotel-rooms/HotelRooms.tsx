'use client';
import { Fragment, use, useEffect, useState } from 'react';
import { type PreviewHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/preview-hotel/dictionary';
import HotelRoom from './HotelRoom';
import HotelRoomsLoading from './HotelRoomsLoading';
import {
 type RoomInventory,
 getRoomDailyPriceApi,
 getRoomPriceDaily,
} from '../../../../services/hotelApiActions';
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
import { Alert, AlertDescription } from '@/components/ui/alert';
import { IoSearch } from 'react-icons/io5';
import { Badge } from '@/components/ui/badge';

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
 const {
  hotelID,
  ratePlanTypes,
  rooms: { result, selectedRooms, isLoading, onUpdateRoomInventory },
  reserve: { fromDateValue, toDateValue, ratePlanValue },
 } = useHotelConfig();

 const data = use(roomInventoriesPromise);

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
    arzID.toString(),
    selectedRoom?.roomTypeID.toString(),
    selectedRoom?.ratePlanID.toString(),
    selectedRoom?.ratePlanTypeID.toString(),
    selectedRoom?.beds.toString(),
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
  <section id='rooms' className='scroll-mt-16 mb-4'>
   <div className='p-2 flex flex-wrap items-center gap-2'>
    <span className='text-sm'>
     {dic.hotelRooms.searched} ({dic.hotelDatePicker.results} {result}
     ):{' '}
    </span>
    <Badge
     variant='outline'
     className='p-1 px-2 rounded-md text-[0.9rem] font-normal'
    >
     <span>{dic.hotelDatePicker.from} </span>
     <span>
      {fromDateValue?.toLocaleDateString(locale, { dateStyle: 'long' })}
     </span>
    </Badge>
    <Badge
     variant='outline'
     className='p-1 px-2 rounded-md text-[0.9rem] font-normal'
    >
     <span>{dic.hotelDatePicker.to} </span>
     <span>
      {toDateValue?.toLocaleDateString(locale, { dateStyle: 'long' })}
     </span>
    </Badge>

    {ratePlanValue && (
     <Badge
      variant='outline'
      className='p-1 px-2 rounded-md text-[0.9rem] font-normal'
     >
      <span>{dic.hotelDatePicker.ratePlan} </span>
      <span>
       {ratePlanTypes.data?.find(
        (item) => item.ratePlanID.toString() === ratePlanValue,
       )?.fName || ''}
      </span>
     </Badge>
    )}
   </div>
   {!!selectedRooms.length && (
    <div className='mb-2'>
     <Alert className='border-primary text-primary bg-primary/10'>
      <AlertDescription className='text-primary font-medium'>
       {dic.hotelRooms.forEachPurchaseOnlyReserveRoomsWithSameRatePlan}.
      </AlertDescription>
     </Alert>
    </div>
   )}
   <div className='grid gap-4'>
    {isLoading ? (
     <HotelRoomsLoading />
    ) : data && !data.length ? (
     <div className='min-h-56 p-4 border rounded-md border-primary bg-primary/10 flex flex-col gap-6 items-center justify-center text-center'>
      <IoSearch className='size-16 text-primary/60' />
      <div>
       <p className='font-medium text-primary mb-2'>
        {dic.hotelDatePicker.from}{' '}
        {fromDateValue?.toLocaleDateString(locale, {
         dateStyle: 'long',
        })}{' '}
        {dic.hotelDatePicker.to}{' '}
        {toDateValue?.toLocaleDateString(locale, {
         dateStyle: 'long',
        })}{' '}
        {dic.hotelRooms.noRoomsFound}
       </p>
       <p className='font-medium text-primary'>
        {dic.hotelRooms.changeReserveDateOrRatePlan}
       </p>
      </div>
     </div>
    ) : (
     data?.map((roomType) => {
      const filteredRooms = selectedRooms.length
       ? roomType.accommodationTypePrices.filter(
          (item) =>
           item.accommodationRatePlanModel.ratePlanID ===
           selectedRooms[0].ratePlanID,
         )
       : roomType.accommodationTypePrices;
      return (
       <Fragment key={roomType.roomTypeID}>
        {filteredRooms.map((accType) => (
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
      );
     })
    )}
    <Dialog open={showDailyPrice} onOpenChange={setShowDailyPrice}>
     <DialogContent className='gap-0 p-0 flex flex-col overflow-hidden max-h-[90svh]'>
      <DialogHeader className='p-4 shrink-0'>
       <DialogTitle className='text-base font-medium'>
        {dic.hotelRooms.dailyPrice}{' '}
        <span className='text-sm text-neutral-500'>(x ۱۰۰۰) (ریال)</span>
       </DialogTitle>
      </DialogHeader>
      <div className='grow overflow-auto flex flex-col *:[--cell-size:2.8rem] md:*:[--cell-size:3rem] lg:*:[--cell-size:3.3rem]'>
       <Calendar
        showOutsideDays={false}
        mode='single'
        selected={dailyPriceDate}
        defaultMonth={dailyPriceDate}
        startMonth={dateFns.startOfMonth(new Date())}
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

          let roomDailyState: (typeof roomStates)[number] | 'normal' = 'normal';
          if (dayPrice) {
           for (const state of roomStates) {
            if (dayPrice[state]) {
             roomDailyState = state;
             break;
            }
           }
          }

          return (
           <div
            className={`${props.className} size-(--cell-size) relative flex flex-col`}
           >
            <div className='basis-5 flex'>
             {roomDailyState !== 'normal' && (
              <div
               className={`size-2 bg-purple-400 rounded-full ${roomStatesStyles.get(roomDailyState)?.backgroundColor}`}
              ></div>
             )}
            </div>
            <div className='grow text-center grid place-content-center text-neutral-600 dark:text-neutral-400'>
             {dayNumber}
            </div>
            <div className='text-[0.74rem] basis-5 font-medium'>
             {dayPrice && !roomDailyPriceIsLoading ? (
              numberFormatter.format(
               Math.round((dayPrice?.netRoomRate || 0) / 1000),
              )
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
   </div>
  </section>
 );
}
