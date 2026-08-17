'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { type ReserveHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/reserve/dictionary';
import Link from 'next/link';
import { useReserveConfig } from '../../services/reserve-config/reserveConfigContext';

export default function CheckHotelTermsAndConditions({
 dic,
}: {
 dic: ReserveHotelDictionary;
}) {
 const { hotelInfo } = useReserveConfig();
 return (
  <div className='flex items-center gap-4'>
   <Checkbox
    className='scale-150'
    checked={hotelInfo.acceptedHotelTermsAndConditions}
    onCheckedChange={(value) =>
     hotelInfo.onAcceptHotelTermsAndConditions(value as boolean)
    }
   />
   <p>
    <Link
     className='underline text-destructive'
     href='#'
     onClick={() => hotelInfo.onShowHotelRules(true)}
    >
     {dic.reserveInfo.hotelTermsAndConditions}
    </Link>
    <span> {dic.reserveInfo.accept}.</span>
   </p>
  </div>
 );
}
