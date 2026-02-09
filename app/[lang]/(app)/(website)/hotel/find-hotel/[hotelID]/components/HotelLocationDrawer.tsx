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
    <DialogContent>
     <DialogHeader>
      <DialogTitle className='font-medium text-lg'>
       {dic.hotelInfo.location}
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
