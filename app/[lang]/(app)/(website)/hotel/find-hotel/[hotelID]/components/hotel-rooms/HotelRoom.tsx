'use client';
import { useState } from 'react';
import { type PreviewHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/preview-hotel/dictionary';
import { Button } from '@/components/ui/button';
import { useKeenSlider } from 'keen-slider/react';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';
import { Badge } from '@/components/ui/badge';
import { FiMinus, FiPlus } from 'react-icons/fi';
import {
 type RoomAccomodationType,
 type RoomInventory,
} from '../../services/hotelApiActions';
import { useCurrencyFormatter } from '@/hooks/useCurrencyFormatter';
import { LuImageOff } from 'react-icons/lu';
import { ratePlanTypes } from '../../utils/ratePlanTypes';
import { useHotelConfig } from '../../services/hotel-config/hotelConfigContext';
import {
 type Room,
 findRoom,
 isTargetRoom,
} from '../../utils/hotelRoomsPickerReducer';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Spinner } from '@/components/ui/spinner';
// import { BiError } from 'react-icons/bi';

const imageContainerClass =
 'mb-4 rounded-md overflow-hidden lg:mb-0 lg:me-4 lg:basis-44 grow-0 relative shrink-0';
const imageWrapperClass = 'h-56 lg:h-44 rounded-md overflow-hidden';

export default function HotelRoom({
 accType,
 dic,
 roomType,
 selectedRoom,
 roomDailyPriceIsLoading,
 onShowDailyPrice,
}: {
 dic: PreviewHotelDictionary;
 accType: RoomAccomodationType;
 roomType: RoomInventory;
 selectedRoom: Room | null;
 roomDailyPriceIsLoading: boolean;
 onShowDailyPrice: (newRoom: Room) => unknown;
}) {
 const {
  rooms: { selectedRoomsDispatch, selectedRooms, roomTypeCapacity },
  reserve: { reserveRoomNights, toDateValue, fromDateValue },
 } = useHotelConfig();
 const formatNumber = useCurrencyFormatter();
 const [sliderCount, setSliderCount] = useState(0);
 const [activeSliderIndex, setActiveSliderIndex] = useState(0);
 const { locale, localeInfo } = useBaseConfig();
 const [bannerSlideRef, instanceRef] = useKeenSlider({
  rtl: localeInfo.contentDirection === 'rtl',
  created(slider) {
   setSliderCount(slider.track.details.slidesLength);
  },
  slideChanged(slider) {
   setActiveSliderIndex(slider.track.details.rel);
  },
 });
 const discountPercentage = accType.roomOnlineShowRate
  ? Number(
     (
      ((accType.roomOnlineShowRate - accType.netRoomRate) * 100) /
      accType.roomOnlineShowRate
     ).toFixed(0),
    )
  : 0;

 const activeRatePlanTypes = ratePlanTypes.filter(
  (item) => accType.accommodationRatePlanModel.ratePlanModel[item.type],
 );

 const roomInfo: Room = {
  beds: accType.beds,
  ratePlanID: accType.accommodationRatePlanModel.ratePlanID,
  roomTypeID: roomType.roomTypeID,
  ratePlanTypeID:
   accType.accommodationRatePlanModel.ratePlanModel.ratePlanTypeID,
 };
 const selectedRoomInfo = findRoom(selectedRooms, roomInfo);
 const targetRoomTypeCapacity = roomTypeCapacity[roomType.roomTypeID];

 const targetRoomDailyPricingIsLoading = selectedRoom
  ? isTargetRoom(selectedRoom, roomInfo) && roomDailyPriceIsLoading
  : false;

 return (
  <article
   data-sold-out={roomType.roomCount === 0}
   className='shadow-lg rounded-md p-3 flex flex-col lg:flex-row overflow-hidden dark:border dark:border-input data-[sold-out="true"]:bg-neutral-100 dark:data-[sold-out="true"]:bg-neutral-900'
  >
   <div className={`keen-slider ${imageContainerClass}`} ref={bannerSlideRef}>
    {roomType.accommodationImages.length ? (
     roomType.accommodationImages.map(({ imageURL }) => (
      <div className={`keen-slider__slide ${imageWrapperClass}`} key={imageURL}>
       <img
        src={imageURL}
        alt='hotel image'
        loading='lazy'
        className='h-full w-full object-cover object-center'
       />
      </div>
     ))
    ) : (
     <div
      className={`bg-neutral-100 ${imageWrapperClass} w-full grid place-content-center`}
     >
      <LuImageOff className='size-16 text-neutral-400 dark:text-neutral-600' />
     </div>
    )}
    {roomType.accommodationImages.length > 1 && (
     <div className='flex justify-center gap-2 py-3 absolute bottom-0 left-0 right-0'>
      {roomType.accommodationImages.map((_, idx) => (
       <button
        key={idx}
        onClick={() => {
         instanceRef.current?.moveToIdx(idx);
        }}
        className={`h-2 border cursor-pointer border-gray-300 rounded-full transition-all ${
         activeSliderIndex === idx
          ? 'bg-white w-6'
          : 'bg-gray-200/80 hover:bg-white w-2'
        }`}
       />
      ))}
     </div>
    )}
   </div>
   <main className='grow mb-2 lg:mb-0 flex flex-col lg:pe-4'>
    <h3 className='text-lg font-medium mb-2'>{roomType.fName}</h3>
    <p className='font-medium text-neutral-600 dark:text-neutral-400 mb-4'>
     {accType.beds} {dic.hotelRooms.person}
    </p>
    {!!activeRatePlanTypes.length && (
     <div className='mb-2 lg:mb-0 flex-wrap flex gap-2'>
      {activeRatePlanTypes.map((item) => {
       return (
        <Badge key={item.type} variant='outline' className='rounded-md p-2'>
         {dic.hotelRooms.ratePlanTypes[item.type]}
        </Badge>
       );
      })}
     </div>
    )}
    {!roomType.roomCount && (
     <>
      <div className='grow'></div>
      <div className='mb-2 lg:mb-0 mt-2'>
       <Alert
        variant={'destructive'}
        className='bg-rose-50 dark:bg-rose-950 border-rose-500 p-2'
       >
        <AlertDescription className='font-medium'>
         {dic.hotelDatePicker.from}{' '}
         {fromDateValue?.toLocaleDateString(locale, {
          dateStyle: 'medium',
         })}
         {' , '}
         {dic.hotelDatePicker.to}{' '}
         {toDateValue?.toLocaleDateString(locale, {
          dateStyle: 'medium',
         })}{' '}
         {dic.hotelRooms.capacityIsFull}
        </AlertDescription>
       </Alert>
      </div>
     </>
    )}
   </main>
   <footer className='flex flex-col lg:justify-end lg:basis-52'>
    <div className='mb-4 flex gap-4 items-end flex-wrap lg:gap-1 lg:justify-center'>
     <div className='lg:order-2'>
      <span className='font-medium text-lg'>
       {formatNumber.format(accType.netRoomRate)}
      </span>
      <span className='ms-1 text-sm'>ریال</span>
      <span className='ms-1 text-sm text-neutral-600 dark:text-neutral-400'>
       / {reserveRoomNights} {dic.hotelRooms.nights}
      </span>
     </div>
     {!!discountPercentage && (
      <div className='flex gap-1 items-end'>
       <Badge variant='secondary' className='size-7'>
        {discountPercentage}٪
       </Badge>
       <div className='text-sm text-red-700 dark:text-red-400'>
        <span className='font-medium line-through'>
         {formatNumber.format(accType.roomOnlineShowRate)}
        </span>
        <span className='ms-1 text-sm'>ریال</span>
       </div>
      </div>
     )}
    </div>
    <div className='flex flex-col gap-2'>
     {selectedRoomInfo ? (
      <div className='flex gap-4 items-center w-[min(100%,9rem)] mx-auto'>
       <Button
        variant='outline'
        size='icon-lg'
        onClick={() =>
         selectedRoomsDispatch({
          type: 'decrease',
          payload: roomInfo,
         })
        }
       >
        <FiMinus className='size-4' />
       </Button>
       <div className='grow text-center text-primary text-xl font-medium'>
        {selectedRoomInfo?.count || 0}
       </div>
       <Button
        size='icon-lg'
        disabled={targetRoomTypeCapacity?.isFull || !roomType.roomCount}
        onClick={() => {
         if (targetRoomTypeCapacity?.isFull || !roomType.roomCount) return;
         selectedRoomsDispatch({
          type: 'increase',
          payload: roomInfo,
         });
        }}
       >
        <FiPlus className='size-4' />
       </Button>
      </div>
     ) : (
      <Button
       size='lg'
       className='w-full'
       disabled={targetRoomTypeCapacity?.isFull || !roomType.roomCount}
       onClick={() => {
        if (targetRoomTypeCapacity?.isFull || !roomType.roomCount) return;
        selectedRoomsDispatch({
         type: 'increase',
         payload: roomInfo,
        });
       }}
      >
       <FiPlus className='size-4' />
       {dic.hotelRooms.addRoom}
      </Button>
     )}
     <Button
      variant='outline'
      size='lg'
      disabled={targetRoomDailyPricingIsLoading}
      className='w-full'
      onClick={() => onShowDailyPrice(roomInfo)}
     >
      {targetRoomDailyPricingIsLoading && <Spinner />}
      {dic.hotelRooms.viewPricingCalendar}
     </Button>
    </div>
   </footer>
  </article>
 );
}
