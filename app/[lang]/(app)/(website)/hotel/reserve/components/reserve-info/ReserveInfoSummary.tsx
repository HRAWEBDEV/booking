'use client';
import { type ReserveHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/reserve/dictionary';
import { useReserveConfig } from '../../services/reserve-config/reserveConfigContext';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';
import { useCurrencyFormatter } from '@/hooks/useCurrencyFormatter';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Skeleton } from '@/components/ui/skeleton';
import useStickyScroll from '@/utils/useStickyScroll';
import { RiInformationLine } from 'react-icons/ri';
import CheckHotelTermsAndConditions from './CheckHotelTermsAndConditions';
import { FaLocationDot } from 'react-icons/fa6';
import HotelStars from '../../../components/HotelStars';

export default function ReserveInfoSummary({
 dic,
}: {
 dic: ReserveHotelDictionary;
}) {
 const numberFormatter = useCurrencyFormatter();
 const {
  hotelInfo,
  fromDate,
  toDate,
  bookingInvoiceInfo,
  onSubmitBookingFormInfo,
  onCancelReserve,
  cancelReserveIsLoading,
  confirmReserveIsPending,
  nights,
  rooms: { storeRooms, isLoading },
 } = useReserveConfig();
 const { containerRef } = useStickyScroll(16, 1024);
 const { locale } = useBaseConfig();
 return (
  <div className='row-start-1 lg:row-start-auto mb-4'>
   <div ref={containerRef}>
    {isLoading || hotelInfo.isLoading ? (
     <Skeleton className='w-full h-96' />
    ) : (
     <>
      <section className='p-4 rounded-md border border-input mb-2'>
       <div className='mb-3 pb-3 border-b border-border'>
        <div className='flex gap-2 mb-3 justify-between items-center'>
         <HotelStars
          grade={hotelInfo.data?.hotelGradeID || 0}
          label={dic.reserveInfo.reserveSummary.star}
         />
         <Button
          variant='outline'
          disabled={!hotelInfo.data?.publicRules}
          onClick={() => hotelInfo.onShowHotelRules(true)}
          className='border-destructive text-destructive'
         >
          <RiInformationLine className='size-6' />
          <span>{dic.reserveInfo.reserveSummary.hotelRules}</span>
         </Button>
        </div>
        <div className='grow'>
         <h1 className='text-xl font-medium mb-1'>{hotelInfo.data?.fName}</h1>
         <div>
          <FaLocationDot className='inline me-2 size-4 text-rose-700 dark:text-rose-400 ' />
          <p className='text-md text-neutral-600 dark:text-neutral-400 inline-block'>
           {hotelInfo.data?.address}
          </p>
         </div>
        </div>
       </div>
       <div className='grid grid-cols-[1fr_max-content_1fr] gap-2 justify-center items-center mb-3 pb-3'>
        <div className='flex flex-col justify-center text-center gap-1'>
         <p className='text-primary text-sm font-medium'>
          {dic.reserveInfo.reserveSummary.arrivalDate}
         </p>
         <p className='font-medium text-sm'>
          {fromDate
           ? `${new Date(fromDate).toLocaleDateString(locale, {
              dateStyle: 'full',
             })}`
           : ''}
         </p>
         <p className='text-neutral-600 dark:text-neutral-400'>
          {hotelInfo.data?.checkin}
         </p>
        </div>
        <div className='flex flex-col text-sm text-neutral-500'>
         <span>
          - {nights.toString()} {dic.reserveInfo.reserveSummary.night} -
         </span>
        </div>
        <div className='flex flex-col justify-center text-center gap-1'>
         <p className='text-primary text-sm font-medium'>
          {dic.reserveInfo.reserveSummary.departureDate}
         </p>
         <p className='font-medium text-sm'>
          {toDate
           ? `${new Date(toDate).toLocaleDateString(locale, {
              dateStyle: 'full',
             })}`
           : ''}
         </p>
         <p className='text-neutral-600 dark:text-neutral-400'>
          {hotelInfo.data?.checkout}
         </p>
        </div>
       </div>
       <div className='flex flex-col border-t border-input pt-4'>
        <ul className='mb-2'>
         {storeRooms
          .filter((item) => !item.isDeleted)
          .map((room, i) => (
           <li
            key={i}
            className='flex flex-wrap gap-2 text-sm text-neutral-600 dark:text-neutral-400'
           >
            <span>{room.fName}: </span>
            <div>
             <span>
              {numberFormatter.format(room.accommodationTypePrice.netRoomRate)}
             </span>
             <span className='text-xs'> ریال</span>
            </div>
           </li>
          ))}
        </ul>
        {!!bookingInvoiceInfo.totalDiscount && (
         <>
          <div className='mb-1'>
           <span className='text-rose-700 dark:text-rose-400'>
            {dic.reserveInfo.reserveSummary.TotalPrice}:{' '}
           </span>
           <span className='text-sm line-through'>
            {numberFormatter.format(bookingInvoiceInfo.price)}
           </span>
           <span className='text-xs'> ریال</span>
          </div>
          <div className='mb-3 pb-2 border-b border-input'>
           <span className='text-secondary'>
            {dic.reserveInfo.reserveSummary.totalDiscount}:{' '}
           </span>
           <span className='text-base'>
            {numberFormatter.format(bookingInvoiceInfo.totalDiscount)}
           </span>
           <span className='text-xs'> ریال</span>
          </div>
         </>
        )}
        <div className='flex flex-wrap gap-2 text-sm text-neutral-600 dark:text-neutral-400'>
         <span>{dic.reserveInfo.onlineReserveCommition}: </span>
         <div>
          <span>
           {numberFormatter.format(bookingInvoiceInfo.commitionPrice)}
          </span>
          <span className='text-xs'> ریال</span>
         </div>
        </div>
        <div className='font-medium'>
         <span className='text-primary'>
          {dic.reserveInfo.reserveSummary.discountTotalPrice}:{' '}
         </span>
         <span className='text-lg '>
          {numberFormatter.format(bookingInvoiceInfo.totalDiscountPrice)}
         </span>
         <span className='text-xs'> ریال</span>
        </div>
       </div>
      </section>
      <div className='gap-4 grid-cols-2 hidden lg:grid'>
       <div className='col-span-full'>
        <CheckHotelTermsAndConditions dic={dic} />
       </div>
       <Button
        className='text-base'
        variant='outline'
        size='lg'
        type='button'
        disabled={
         isLoading ||
         hotelInfo.isLoading ||
         confirmReserveIsPending ||
         cancelReserveIsLoading
        }
        onClick={onCancelReserve}
       >
        {(isLoading ||
         hotelInfo.isLoading ||
         confirmReserveIsPending ||
         cancelReserveIsLoading) && <Spinner />}
        {dic.reserveInfo.reserveForm.cancel}
       </Button>
       <Button
        className='text-base'
        variant='secondary'
        size='lg'
        disabled={
         isLoading ||
         hotelInfo.isLoading ||
         confirmReserveIsPending ||
         cancelReserveIsLoading
        }
        onClick={onSubmitBookingFormInfo}
       >
        {(isLoading ||
         hotelInfo.isLoading ||
         confirmReserveIsPending ||
         cancelReserveIsLoading) && <Spinner />}
        {dic.reserveInfo.reserveForm.confirm}
       </Button>
      </div>
     </>
    )}
   </div>
  </div>
 );
}
