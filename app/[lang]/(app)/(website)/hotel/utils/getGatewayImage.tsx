import { GatewayTypes, SEP, ZARIN_PAL } from './gatewayTypes';
import { FaCreditCard } from 'react-icons/fa';

export function getGatewayImage(gatetwayTypeID: number) {
 const gatewayName = GatewayTypes[gatetwayTypeID];
 switch (gatewayName) {
  case ZARIN_PAL:
   return (
    <img
     src='/images/gateways/zarin-pal.jpeg'
     alt='zarin pal logo'
     className='h-full w-full object-center object-contain'
    />
   );
  case SEP:
   return (
    <img
     src='/images/gateways/sep-payment.jpg'
     alt='sep payment pal logo'
     className='h-full w-full object-center object-contain'
    />
   );
 }
 return <FaCreditCard />;
}
