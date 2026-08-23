import { type ReserveHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/reserve/dictionary';
import { useReserveConfig } from '../../services/reserve-config/reserveConfigContext';
import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';
import { useCurrencyFormatter } from '@/hooks/useCurrencyFormatter';
import { Button } from '@/components/ui/button';
import { GatewayTypes } from '../../../utils/gatewayTypes';
import { getGatewayImage } from '../../../utils/getGatewayImage';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

export default function PaymentInfo({ dic }: { dic: ReserveHotelDictionary }) {
 const {
  lockInfo,
  bookingInvoiceInfo,
  gateways,
  confirmPaymentIsPending,
  cancelReserveIsLoading,
  onCancelReserve,
  onConfirmPayment,
 } = useReserveConfig();
 const numberFormatter = useCurrencyFormatter();

 if (lockInfo.isLoading) return <Skeleton className='w-full h-56' />;

 return (
  <section className='border border-input rounded-md p-4'>
   {lockInfo.lockExpireTimeIsSuccess &&
    lockInfo.lockExpireTime !== undefined &&
    lockInfo.lockExpireTime <= 0 && (
     <div className='mb-2'>
      <Alert
       variant='destructive'
       className='bg-destructive/10 border-destructive'
      >
       <AlertDescription className='font-medium'>
        {dic.reserveInfo.pendingReserveIsExpired}
       </AlertDescription>
      </Alert>
     </div>
    )}

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
            ریال
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

   <section className='grid grid-cols-1 md:grid-cols-2 mb-4 gap-2'>
    <div className='text-neutral-800 dark:text-neutral-400 font-medium'>
     <div>
      <span className='text-primary'>
       {dic.reserveInfo.reserveSummary.discountTotalPrice}:{' '}
      </span>
      <span className='font-medium text-xl'>
       {numberFormatter.format(bookingInvoiceInfo.totalDiscountPrice)}
      </span>
      <span className='text-xs me-2'> ریال</span>
     </div>
     {!!bookingInvoiceInfo.totalDiscount && (
      <span className='font-medium text-sm line-through text-red-600 dark:text-red-400'>
       {numberFormatter.format(bookingInvoiceInfo.price)}ریال
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

   {/* Payment Gateway Selection (Snapp Market Style) */}
   <section>
    <h4 className='font-medium mb-3'>
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

    {gateways.isLoading ? (
     <div className='space-y-3 mb-6'>
      {Array.from({ length: 3 }, (_, i) => i).map((item) => (
       <div key={item} className='h-16 w-full rounded-2xl'>
        <Skeleton className='w-full h-full rounded-2xl' />
       </div>
      ))}
     </div>
    ) : !gateways.data?.length ? (
     <Alert className='bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 mb-6'>
      <AlertDescription className='text-sm text-neutral-600 dark:text-neutral-400'>
       {dic.payment.paymentInfo.noGatewaysAvailable || 'در حال حاضر درگاه پرداختی یافت نشد.'}
      </AlertDescription>
     </Alert>
    ) : (
     <div
      role='radiogroup'
      aria-label={dic.payment.paymentInfo.paymentMethod}
      className='space-y-3 mb-6'
     >
      {gateways.data.map((gateway) => {
       const isSelected = gateway.id === gateways.selectedGateway?.id;
       const gatewayName =
        dic.payment.gateways[
         GatewayTypes[gateway.paymentGatewayTypeID] as keyof typeof dic.payment.gateways
        ] || gateway.paymentGatewayTypeName;

       return (
        <div
         key={gateway.id}
         role='radio'
         aria-checked={isSelected}
         tabIndex={0}
         onClick={() => {
          gateways.setSelectedGateway(gateway);
         }}
         onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
           e.preventDefault();
           gateways.setSelectedGateway(gateway);
          }
         }}
         className={cn(
          'group relative flex items-center justify-between p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
          isSelected
           ? 'border-neutral-900 dark:border-neutral-100 bg-neutral-50/90 dark:bg-neutral-900/70 shadow-xs ring-1 ring-neutral-900/10 dark:ring-white/10'
           : 'border-neutral-200 dark:border-neutral-800 bg-card hover:border-neutral-400 dark:hover:border-neutral-600 hover:bg-neutral-50/50 dark:hover:bg-neutral-900/30'
         )}
        >
         {/* Right Side (RTL Start): Gateway Name & Bank Logo */}
         <div className='flex items-center gap-3 sm:gap-3.5'>
          <div className='size-11 sm:size-12 rounded-xl bg-white dark:bg-neutral-950 p-1.5 shadow-2xs border border-neutral-100 dark:border-neutral-800 flex items-center justify-center shrink-0 overflow-hidden'>
           {getGatewayImage(gateway.paymentGatewayTypeID)}
          </div>
          <div className='flex flex-col'>
           <span className='font-semibold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors'>
            {gatewayName}
           </span>
           <span className='text-xs text-muted-foreground'>
            {dic.payment.paymentInfo.shetabCards || 'کلیه کارت‌های عضو شتاب'}
           </span>
          </div>
         </div>

         {/* Left Side (RTL End): Snapp-style Radio Indicator */}
         <div className='flex items-center justify-center shrink-0 me-1'>
          <div
           className={cn(
            'size-5 sm:size-5.5 rounded-full border-2 transition-all flex items-center justify-center',
            isSelected
             ? 'border-neutral-900 dark:border-neutral-100 bg-transparent'
             : 'border-neutral-300 dark:border-neutral-600 bg-background group-hover:border-neutral-400 dark:group-hover:border-neutral-500'
           )}
          >
           {isSelected && (
            <div className='size-2.5 sm:size-3 rounded-full bg-neutral-900 dark:bg-neutral-100 animate-in zoom-in-50 duration-150' />
           )}
          </div>
         </div>
        </div>
       );
      })}
     </div>
    )}

    {/* Original Action Buttons */}
    <div className='flex justify-end gap-4'>
     <Button
      className='text-base w-36 flex-1 md:flex-none'
      variant='outline'
      size='lg'
      type='button'
      disabled={
       gateways.isLoading ||
       !gateways.isSuccess ||
       !gateways.data?.length ||
       !gateways.selectedGateway ||
       confirmPaymentIsPending ||
       cancelReserveIsLoading
      }
      onClick={onCancelReserve}
     >
      {(gateways.isLoading ||
       confirmPaymentIsPending ||
       cancelReserveIsLoading) && <Spinner />}
      {dic.reserveInfo.reserveForm.cancel}
     </Button>
     <Button
      disabled={
       gateways.isLoading ||
       !gateways.isSuccess ||
       !gateways.data?.length ||
       !gateways.selectedGateway ||
       confirmPaymentIsPending ||
       cancelReserveIsLoading ||
       !lockInfo.lockExpireTimeIsSuccess ||
       !lockInfo.lockExpireTime ||
       lockInfo.lockExpireTime <= 0
      }
      size='lg'
      className='w-36 flex-1 md:flex-none'
      onClick={onConfirmPayment}
     >
      {(gateways.isLoading ||
       confirmPaymentIsPending ||
       cancelReserveIsLoading) && <Spinner />}
      {dic.payment.paymentInfo.confirmPayment}
     </Button>
    </div>
   </section>
  </section>
 );
}


