'use client';
import { useState, useRef, useEffect } from 'react';
import { type PreviewHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/preview-hotel/dictionary';
import { Button } from '@/components/ui/button';
import { useKeenSlider } from 'keen-slider/react';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';
import { Badge } from '@/components/ui/badge';
import { FiMinus, FiPlus } from 'react-icons/fi';
import {
 type RoomAccomodationType,
 type RoomInventory,
} from '../../../../services/hotelApiActions';
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
import { FaUserFriends, FaCaretDown, FaCaretUp } from 'react-icons/fa';
import { useImageLightbox } from '@/components/image-lightbox/imageLightboxContext';
import GalleryOpenButton from '../gallery/GalleryOpenButton';

const imageContainerClass =
 'mb-4 rounded-md overflow-hidden lg:mb-0 lg:me-4 lg:basis-40 grow-0 relative shrink-0 self-start';
const imageWrapperClass = 'h-56 lg:h-40 rounded-md overflow-hidden';

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
 const facilitiesRef = useRef<HTMLDivElement>(null);
 const [showFacilities, setShowFacilities] = useState(false);
 const [expandableFacilities, setExpandableFacilities] = useState(false);
 const lightbox = useImageLightbox();
 const {
  rooms: { selectedRoomsDispatch, selectedRooms, roomTypeCapacity },
  reserve: { reserveRoomNights, toDateValue, fromDateValue },
 } = useHotelConfig();
 const formatNumber = useCurrencyFormatter();
 const [activeSliderIndex, setActiveSliderIndex] = useState(0);
 const { locale, localeInfo } = useBaseConfig();
 const [bannerSlideRef, instanceRef] = useKeenSlider({
  rtl: localeInfo.contentDirection === 'rtl',
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
  roomTypeName: roomType.fName,
  ratePlanID: accType.accommodationRatePlanModel.ratePlanID,
  roomTypeID: roomType.roomTypeID,
  ratePlanTypeID:
   accType.accommodationRatePlanModel.ratePlanModel.ratePlanTypeID,
  discountPercent: discountPercentage,
  price: accType.roomOnlineShowRate,
  discountPrice: accType.netRoomRate,
 };
 const selectedRoomInfo = findRoom(selectedRooms, roomInfo);
 const targetRoomTypeCapacity = roomTypeCapacity[roomType.roomTypeID];

 const targetRoomDailyPricingIsLoading = selectedRoom
  ? isTargetRoom(selectedRoom, roomInfo) && roomDailyPriceIsLoading
  : false;

 let roomTypeBadgeImagesContent = '';
 if (roomType.accommodationImages.length >= 1) {
  if (roomType.accommodationImages.length >= 20) {
   roomTypeBadgeImagesContent = '20+';
  } else {
   roomTypeBadgeImagesContent = roomType.accommodationImages.length.toString();
  }
 }

 const roomDescription = (
  <div className='flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium'>
   <span>
    {formatNumber.format(accType.netRoomRate)} ریال / {reserveRoomNights}{' '}
    {dic.hotelRooms.nights}
   </span>
   <span>•</span>
   <span>
    {accType.beds} {dic.hotelRooms.person}
   </span>
   {!!discountPercentage && (
    <>
     <span>•</span>
     <span className='line-through text-red-300'>
      {formatNumber.format(accType.roomOnlineShowRate)} ریال
     </span>
     <span className='text-amber-300 font-bold'>
      ({discountPercentage}٪ {dic.hotelRooms.discount})
     </span>
    </>
   )}
   {!!activeRatePlanTypes.length && (
    <>
     <span>•</span>
     <span className='text-neutral-300'>
      {activeRatePlanTypes
       .map((item) => dic.hotelRooms.ratePlanTypes[item.type])
       .join('، ')}
     </span>
    </>
   )}
  </div>
 );

 const slides = roomType.accommodationImages.map(({ imageURL }, index) => ({
  src: imageURL,
  alt: `${roomType.fName} ${dic.gallery.image} ${index + 1}`,
  title: roomType.fName,
  description: roomDescription,
 }));

 function handleOpenLightbox(index: number) {
  lightbox.open({
   images: slides,
   index,
   onClose: (lastIndex) => instanceRef.current?.moveToIdx(lastIndex),
  });
 }

 useEffect(() => {
  if (!facilitiesRef.current) return;
  const frame = requestAnimationFrame(() => {
   if (
    facilitiesRef.current &&
    facilitiesRef.current.scrollHeight > facilitiesRef.current.clientHeight
   ) {
    setExpandableFacilities(true);
   }
  });
  return () => cancelAnimationFrame(frame);
 }, []);
 return (
  <div className='overflow-hidden rounded-md border border-neutral-200 dark:border-neutral-800'>
   <article
    data-sold-out={roomType.roomCount === 0}
    data-selected={!!selectedRoomInfo?.count}
    className='p-3 flex flex-col lg:flex-row overflow-hidden dark:border dark:border-input data-[sold-out="true"]:bg-neutral-100 dark:data-[sold-out="true"]:bg-neutral-900 data-[selected="true"]:bg-primary/5'
   >
    <div
     className={`keen-slider ${imageContainerClass} relative`}
     ref={bannerSlideRef}
    >
     {!!roomType.accommodationImages.length && (
      <div className='absolute top-1 start-1 z-2'>
       <GalleryOpenButton
        label={dic.hotelRooms.images}
        count={roomTypeBadgeImagesContent}
        onClick={() => handleOpenLightbox(activeSliderIndex)}
        onPreload={lightbox.preload}
       />
      </div>
     )}

     {roomType.accommodationImages.length ? (
      roomType.accommodationImages.map(({ imageURL }, index) => (
       <div
        className={`keen-slider__slide ${imageWrapperClass} cursor-pointer`}
        key={imageURL}
        onClick={() => handleOpenLightbox(index)}
       >
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
     {roomTypeBadgeImagesContent && (
      <div className='flex justify-center gap-2 py-3 absolute bottom-0 left-0 right-0'>
       {roomType.accommodationImages.slice(0, 5).map((_, idx) => (
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
     <div className='flex gap-4 items-center'>
      <div className='flex gap-2 items-center mb-4 text-neutral-600 dark:text-neutral-400'>
       <FaUserFriends className='size-6' />
       <p className='font-medium'>
        {accType.beds} {dic.hotelRooms.person}
       </p>
      </div>
     </div>
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
   {!!roomType.accommodationFacilities.length && (
    <div
     ref={facilitiesRef}
     data-expand={showFacilities}
     className='h-10 data-[expand="true"]:h-auto bg-neutral-100 dark:bg-neutral-900 p-1 flex gap-4 items-start overflow-hidden'
    >
     <div className='flex gap-2 flex-wrap grow'>
      {roomType.accommodationFacilities.map((item) => (
       <Badge
        variant='outline'
        className='rounded p-1 min-w-24 font-medium text-sm'
        key={item.key}
       >
        {item.value}
       </Badge>
      ))}
     </div>
     {expandableFacilities && (
      <div className='shrink-0'>
       <Button
        variant='ghost'
        onClick={() => {
         setShowFacilities((pre) => !pre);
        }}
       >
        {showFacilities ? <FaCaretUp /> : <FaCaretDown />}
        {showFacilities ? (
         <span>{dic.hotelRooms.less}</span>
        ) : (
         <span>{dic.hotelRooms.more}</span>
        )}
       </Button>
      </div>
     )}
    </div>
   )}
  </div>
 );
}
