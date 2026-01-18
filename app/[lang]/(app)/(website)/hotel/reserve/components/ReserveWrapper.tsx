'use client';
import { type ReserveHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/reserve/dictionary';
import ReserveInfoWrapper from './reserve-info/ReserveInfoWrapper';
import { useReserveConfig } from '../services/reserve-config/reserveConfigContext';
import PaymentWrapper from './payment/PaymentWrapper';
import VoucherWrapper from './voucher/VoucherWrapper';

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
  case 'book':
   activeStep = <VoucherWrapper dic={dic} />;
   break;
 }

 return <>{activeStep}</>;
}
