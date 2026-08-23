import { GatewayTypes, SEP, ZARIN_PAL } from './gatewayTypes';
import { BsCreditCard2FrontFill } from 'react-icons/bs';
import { cn } from '@/lib/utils';

export function getGatewayImage(gatewayTypeID: number, className?: string) {
 const gatewayName = GatewayTypes[gatewayTypeID];
 switch (gatewayName) {
  case ZARIN_PAL:
   return (
    <img
     src='/images/gateways/zarin-pal.jpeg'
     alt='زرین‌پال'
     className={cn('h-full w-full object-contain object-center rounded-lg', className)}
    />
   );
  case SEP:
   return (
    <img
     src='/images/gateways/sep-payment.jpg'
     alt='بانک سامان'
     className={cn('h-full w-full object-contain object-center rounded-lg', className)}
    />
   );
 }
 return <BsCreditCard2FrontFill className={cn('size-7 text-primary/80', className)} />;
}



