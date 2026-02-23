'use client';
import { type PreviewHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/preview-hotel/dictionary';
import {
 Dialog,
 DialogTrigger,
 DialogContent,
 DialogHeader,
 DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FaMapMarkedAlt } from 'react-icons/fa';
import HotelLocation from './HotelLocation';
import { type HotelInfo } from '../../../services/hotelApiActions';

export default function HotelLocationDrawer({
 dic,
 hotelInfo,
}: {
 dic: PreviewHotelDictionary;
 hotelInfo: HotelInfo;
}) {
 return (
  <div>
   <Dialog>
    <DialogTrigger asChild>
     <Button size='lg'>
      <FaMapMarkedAlt className='size-6' />
     </Button>
    </DialogTrigger>
    <DialogContent className='h-dvh w-dvw max-w-dvw rounded-none'>
     <DialogHeader>
      <DialogTitle className='font-medium text-lg'>
       {dic.hotelInfo.location} {hotelInfo.fName}
      </DialogTitle>
     </DialogHeader>
     <div>
      <HotelLocation dic={dic} hotelInfo={hotelInfo} isDrawer />
     </div>
    </DialogContent>
   </Dialog>
  </div>
 );
}
