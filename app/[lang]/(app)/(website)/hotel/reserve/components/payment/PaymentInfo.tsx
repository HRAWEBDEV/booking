import { type ReserveHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/reserve/dictionary';
import { useReserveConfig } from '../../services/reserve-config/reserveConfigContext';
import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';
import { useCurrencyFormatter } from '@/hooks/useCurrencyFormatter';
import { Button } from '@/components/ui/button';
import { GatewayTypes } from '../../../utils/gatewayTypes';
import { FaCreditCard } from 'react-icons/fa';

export default function PaymentInfo({ dic }: { dic: ReserveHotelDictionary }) {
 const {
  lockInfo,
  bookingInvoiceInfo,
  gateways,
  confirmPaymentIsPending,
  onConfirmPayment,
 } = useReserveConfig();
 const numberFormatter = useCurrencyFormatter();
 if (lockInfo.isLoading) return <Skeleton className='w-full h-56' />;
 return (
  <section className='border border-input rounded-md p-4'>
   <h3 className='font-medium mb-4 text-lg'>{dic.payment.paymentInfo.title}</h3>
   <div className='grid gap-4 grid-cols-1 md:grid-cols-2 mb-3 pb-3 border-b border-input'>
    <div>
     <span className='text-neutral-600 dark:text-neutral-400'>
      {dic.reserveInfo.reserveForm.firstName}:{' '}
     </span>
     <span className='font-medium'>{lockInfo.data?.lockInfo.firstName}</span>
    </div>
    <div>
     <span className='text-neutral-600 dark:text-neutral-400'>
      {dic.reserveInfo.reserveForm.lastName}:{' '}
     </span>
     <span className='font-medium'>{lockInfo.data?.lockInfo.lastName}</span>
    </div>
    <div>
     <span className='text-neutral-600 dark:text-neutral-400'>
      {dic.reserveInfo.reserveForm.phoneNumber}:{' '}
     </span>
     <span className='font-medium'>{lockInfo.data?.lockInfo.contactNo}</span>
    </div>
    <div>
     <span className='text-neutral-600 dark:text-neutral-400'>
      {dic.reserveInfo.reserveForm.email}:{' '}
     </span>
     <span className='font-medium'>
      {lockInfo.data?.lockInfo.email || '---'}
     </span>
    </div>
   </div>
   <section className='pb-3 mb-2 border-b border-input'>
    <ul>
     {lockInfo.data?.rooms.map((room, i) => {
      const discountPrice =
       room.accommodationTypePrice.roomOnlineShowRate -
       room.accommodationTypePrice.netRoomRate;
      return (
       <li key={i} className='w-full mb-4'>
        <div className='mb-1'>
         <h3 className='font-medium mb-1'>
          {i + 1}) {room.fName}
         </h3>
         <p className='font-medium text-neutral-600 dark:text-neutral-400'>
          {room.accommodationTypePrice.beds}{' '}
          {dic.reserveInfo.reserveForm.person}
         </p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2'>
         <div className='text-neutral-700 dark:text-neutral-400'>
          <span className='text-sm'>
           {dic.reserveInfo.reserveSummary.price}:{' '}
          </span>
          <span className='font-medium'>
           {numberFormatter.format(room.accommodationTypePrice.netRoomRate)}
          </span>
          <span className='text-xs me-2'> ریال</span>
          {!!discountPrice && (
           <span className='font-medium text-sm line-through text-red-600 dark:text-red-400'>
            {numberFormatter.format(
             room.accommodationTypePrice.roomOnlineShowRate,
            )}
           </span>
          )}
         </div>
         <div className='text-neutral-700 dark:text-neutral-400'>
          <span className='text-sm'>
           {dic.reserveInfo.reserveSummary.discount}:{' '}
          </span>
          <span className='font-medium'>
           {numberFormatter.format(discountPrice)}
          </span>
          <span className='text-xs'> ریال</span>
         </div>
        </div>
       </li>
      );
     })}
    </ul>
   </section>
   <section className='grid grid-cols-1 md:grid-cols-2 mb-4'>
    <div className='text-neutral-800 dark:text-neutral-400 font-medium'>
     <span className='text-primary'>
      {dic.reserveInfo.reserveSummary.discountTotalPrice}:{' '}
     </span>
     <span className='font-medium text-xl'>
      {numberFormatter.format(bookingInvoiceInfo.totalDiscountPrice)}
     </span>
     <span className='text-xs me-2'> ریال</span>
     {!!bookingInvoiceInfo.totalDiscount && (
      <span className='font-medium text-sm line-through text-red-600 dark:text-red-400'>
       {numberFormatter.format(bookingInvoiceInfo.price)}
      </span>
     )}
    </div>
    <div className='text-neutral-800 dark:text-neutral-400 font-medium'>
     <span className='text-secondary'>
      {dic.reserveInfo.reserveSummary.totalDiscount}:{' '}
     </span>
     <span className='font-medium text-xl'>
      {numberFormatter.format(bookingInvoiceInfo.totalDiscount)}
     </span>
     <span className='text-xs'> ریال</span>
    </div>
   </section>
   <section>
    <h4 className='font-medium mb-2'>
     <span>{dic.payment.paymentInfo.paymentMethod}: </span>
     {gateways.selectedGateway && (
      <span className='text-primary'>
       {
        dic.payment.gateways[
         GatewayTypes[
          gateways.selectedGateway.paymentGatewayTypeID
         ] as keyof typeof dic.payment.gateways
        ]
       }
      </span>
     )}
    </h4>
    <ul className='mb-6 flex flex-wrap gap-4'>
     {gateways.isLoading
      ? Array.from({ length: 4 }, (_, i) => i).map((item) => (
         <li key={item} className='size-24 rounded-md'>
          <Skeleton className='w-full h-full' />
         </li>
        ))
      : gateways.data?.map((gateway) => (
         <li key={gateway.id}>
          <Button
           data-is-selected={gateway.id === gateways.selectedGateway?.id}
           size={'icon'}
           variant={'outline'}
           className='group h-auto flex flex-col size-24 text-neutral-600 dark:text-neutral-400 data-[is-selected="true"]:border-primary data-[is-selected="true"]:text-primary'
           onClick={() => {
            gateways.setSelectedGateway(gateway);
           }}
          >
           <div className='grow overflow-hidden grid place-content-center'>
            <FaCreditCard className='size-10' />
           </div>
           <p className='text-center text-sm p-1'>
            {
             dic.payment.gateways[
              GatewayTypes[
               gateway.paymentGatewayTypeID
              ] as keyof typeof dic.payment.gateways
             ]
            }
           </p>
          </Button>
         </li>
        ))}
    </ul>
    <div className='flex justify-end'>
     <Button
      disabled={
       gateways.isLoading ||
       !gateways.isSuccess ||
       !gateways.data?.length ||
       !gateways.selectedGateway ||
       confirmPaymentIsPending
      }
      size='lg'
      className='w-40'
      onClick={onConfirmPayment}
     >
      {gateways.isLoading && <Spinner />}
      {dic.payment.paymentInfo.confirmPayment}
     </Button>
    </div>
   </section>
  </section>
 );
}
