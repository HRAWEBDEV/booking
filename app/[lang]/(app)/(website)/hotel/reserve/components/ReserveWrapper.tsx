'use client';
import { type ReserveHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/reserve/dictionary';
import ReserveInfoWrapper from './reserve-info/ReserveInfoWrapper';
import ReserveStepper from './ReserveStepper';
import { useReserveConfig } from '../services/reserve-config/reserveConfigContext';
import PaymentWrapper from './payment/PaymentWrapper';

export default function ReserveWrapper({
 dic,
}: {
 dic: ReserveHotelDictionary;
}) {
 const { activeReserveStep } = useReserveConfig();

 let activeStep = <ReserveInfoWrapper dic={dic} />;
 switch (activeReserveStep) {
  case 'payment':
   activeStep = <PaymentWrapper dic={dic} />;
   break;
 }

 return (
  <>
   <ReserveStepper dic={dic} />
   {activeStep}
  </>
 );
}
