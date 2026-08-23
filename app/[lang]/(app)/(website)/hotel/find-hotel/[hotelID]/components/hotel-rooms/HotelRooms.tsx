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
import {
 Drawer,
 DrawerContent,
 DrawerHeader,
 DrawerTitle,
} from '@/components/ui/drawer';
import { Calendar } from '@/components/ui/calendar';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
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
import { useMediaQuery } from '@/services/base-config/hooks/useMediaQuery';
import { cn } from '@/lib/utils';

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
 const isDesktop = useMediaQuery('(min-width: 768px)');
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
  if (fromDateValue) {
   setDailyPriceDate(dateFns.startOfMonth(fromDateValue));
  }
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

 const dailyPriceHeader = (
  <div className='flex flex-col gap-1 w-full'>
   <div className='flex items-center justify-between gap-2 flex-wrap'>
    <span className='font-bold text-base sm:text-lg text-foreground'>
     {dic.hotelRooms.dailyPrice}
    </span>
    <Badge
     variant='outline'
     className='text-xs font-normal py-0.5 px-2 text-muted-foreground'
    >
     (x ۱۰۰۰ ریال)
    </Badge>
   </div>
   {selectedRoom && (
    <div className='flex items-center gap-2 text-xs text-muted-foreground'>
     <span className='font-medium text-primary'>
      {selectedRoom.roomTypeName}
     </span>
     <span>•</span>
     <span>
      {selectedRoom.beds} {dic.hotelRooms.person}
     </span>
    </div>
   )}
  </div>
 );

 const dailyPriceCalendar = (
  <div className='w-full flex flex-col items-center gap-3'>
   <Calendar
    showOutsideDays={false}
    mode='single'
    selected={dailyPriceDate}
    defaultMonth={dailyPriceDate}
    startMonth={dateFns.startOfMonth(new Date())}
    onMonthChange={(selected) =>
     selected && setDailyPriceDate(dateFns.startOfMonth(selected))
    }
    className='w-full max-w-lg sm:max-w-xl mx-auto p-1 sm:p-2'
    classNames={{
     root: 'w-full',
     months: 'w-full flex flex-col relative',
     month: 'w-full flex flex-col gap-3',
     nav: 'flex items-center justify-between w-full absolute top-0 inset-x-0 z-10 px-1',
     button_previous:
      'size-8 sm:size-9 rounded-lg border border-input bg-background hover:bg-accent text-foreground transition-colors p-0 flex items-center justify-center cursor-pointer shadow-2xs',
     button_next:
      'size-8 sm:size-9 rounded-lg border border-input bg-background hover:bg-accent text-foreground transition-colors p-0 flex items-center justify-center cursor-pointer shadow-2xs',
     month_caption:
      'flex items-center justify-center min-h-9 sm:min-h-10 w-full relative px-10 mb-1',
     caption_label:
      'text-sm sm:text-base font-bold text-foreground select-none',
     table: 'w-full border-collapse',
     weekdays: 'grid grid-cols-7 gap-1 sm:gap-1.5 mb-1.5 w-full',
     weekday:
      'text-muted-foreground text-center font-semibold text-xs sm:text-sm py-1.5 bg-muted/40 rounded-lg select-none flex items-center justify-center',
     week: 'grid grid-cols-7 gap-1 sm:gap-1.5 mt-1 sm:mt-1.5 w-full',
     day: 'relative w-full h-full p-0 flex aspect-auto',
     outside: 'invisible pointer-events-none opacity-0',
    }}
    components={{
     Chevron(props) {
      if (props.orientation === 'left') {
       return (
        <ChevronRightIcon
         className={cn('size-4', props.className)}
         {...props}
        />
       );
      }
      if (props.orientation === 'right') {
       return (
        <ChevronLeftIcon
         className={cn('size-4', props.className)}
         {...props}
        />
       );
      }
      return (
       <ChevronRightIcon
        className={cn('size-4', props.className)}
        {...props}
       />
      );
     },
     DayButton(props) {
      const dayDate = props.day.date;
      const isPast =
       dateFns.startOfDay(dayDate).getTime() <
       dateFns.startOfDay(new Date()).getTime();
      const isToday = dateFns.isSameDay(dayDate, new Date());
      const dayNumber = dayDate.toLocaleDateString(locale, {
       day: 'numeric',
      });
      const dayPrice = roomDailyPrice?.find((item) => {
       return dateFns.isSameDay(new Date(item.date), dayDate);
      });

      let roomDailyState: (typeof roomStates)[number] | null = null;
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
        className={cn(
         'w-full min-h-[4.2rem] sm:min-h-19 p-1 sm:p-1.5 rounded-xl border flex flex-col justify-between items-center transition-all duration-150 relative select-none',
         isPast
          ? 'bg-muted/20 border-border/30 opacity-40 cursor-not-allowed'
          : 'bg-card border-border/70 hover:border-primary/50 hover:bg-accent/30 hover:shadow-xs shadow-2xs',
         isToday && 'ring-2 ring-primary/60 border-primary bg-primary/5',
        )}
       >
        <div className='w-full flex items-center justify-between gap-1 leading-none'>
         <span
          className={cn(
           'text-xs sm:text-sm font-bold',
           isPast
            ? 'text-muted-foreground'
            : isToday
              ? 'text-primary font-black'
              : 'text-foreground',
          )}
         >
          {dayNumber}
         </span>
         {roomDailyState && (
          <span
           className={cn(
            'size-2 sm:size-2.5 rounded-full ring-1 ring-background shrink-0',
            roomStatesStyles.get(roomDailyState)?.backgroundColor,
           )}
           title={dic.hotelDatePicker[roomDailyState]}
          />
         )}
        </div>

        <div className='w-full flex flex-col items-center justify-center min-h-5 sm:min-h-6 mt-1'>
         {roomDailyPriceIsLoading ? (
          <Skeleton className='h-3 sm:h-3.5 w-full max-w-14 rounded-md' />
         ) : dayPrice && dayPrice.netRoomRate > 0 ? (
          <div className='w-full text-center'>
           <span className='block text-[0.72rem] sm:text-[0.82rem] font-bold text-primary dark:text-primary-foreground tracking-tight'>
            {numberFormatter.format(
             Math.round((dayPrice.netRoomRate || 0) / 1000),
            )}
           </span>
          </div>
         ) : !isPast ? (
          <span className='text-[0.68rem] sm:text-xs text-muted-foreground/60'>
           -
          </span>
         ) : null}
        </div>
       </div>
      );
     },
    }}
   />

   {/* Legend */}
   <div className='w-full px-2 pt-1'>
    <div className='flex flex-wrap items-center justify-center gap-3 sm:gap-6 bg-muted/50 dark:bg-muted/20 border border-border/60 rounded-xl p-2.5 px-4'>
     {roomStates.map((state) => (
      <div key={state} className='flex items-center gap-1.5'>
       <span
        className={cn(
         'size-2.5 sm:size-3 rounded-full shrink-0 shadow-2xs',
         roomStatesStyles.get(state)?.backgroundColor,
        )}
       />
       <span className='text-xs font-medium text-neutral-700 dark:text-neutral-300'>
        {dic.hotelDatePicker[state]}
       </span>
      </div>
     ))}
    </div>
   </div>
  </div>
 );

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
    {isDesktop ? (
     <Dialog open={showDailyPrice} onOpenChange={setShowDailyPrice}>
      <DialogContent
       showCloseButton={false}
       className='sm:max-w-2xl max-h-[90vh] p-0 gap-0 flex flex-col overflow-hidden rounded-2xl'
      >
       <DialogHeader className='p-4 sm:p-5 border-b border-border text-right shrink-0'>
        <DialogTitle asChild>{dailyPriceHeader}</DialogTitle>
       </DialogHeader>
       <div className='p-4 sm:p-6 overflow-y-auto grow flex flex-col items-center gap-4'>
        {dailyPriceCalendar}
       </div>
      </DialogContent>
     </Dialog>
    ) : (
     <Drawer open={showDailyPrice} onOpenChange={setShowDailyPrice}>
      <DrawerContent className='max-h-[90dvh] flex flex-col gap-0 p-0 rounded-t-2xl'>
       <DrawerHeader className='p-4 border-b border-border text-right shrink-0'>
        <DrawerTitle asChild>{dailyPriceHeader}</DrawerTitle>
       </DrawerHeader>
       <div className='p-3 overflow-y-auto grow flex flex-col items-center gap-3'>
        {dailyPriceCalendar}
       </div>
      </DrawerContent>
     </Drawer>
    )}
   </div>
  </section>
 );
}
