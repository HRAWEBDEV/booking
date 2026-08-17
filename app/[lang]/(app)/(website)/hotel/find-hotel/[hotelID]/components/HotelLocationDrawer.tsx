'use client';
import { type PreviewHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/preview-hotel/dictionary';
import {
 Dialog,
 DialogTrigger,
 DialogContent,
 DialogHeader,
 DialogTitle,
 DialogFooter,
 DialogClose,
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
    <DialogContent className='h-[95dvh] w-[95dvw] max-w-dvw flex flex-col'>
     <DialogHeader>
      <DialogTitle className='font-medium text-lg'>
       {dic.hotelInfo.location} {hotelInfo.fName}
      </DialogTitle>
     </DialogHeader>
     <div className='grow flex flex-col'>
      <HotelLocation dic={dic} hotelInfo={hotelInfo} isDrawer />
     </div>
     <DialogFooter>
      <DialogClose asChild>
       <Button size='lg' variant='outline' className='w-full'>
        {dic.hotelInfo.close}
       </Button>
      </DialogClose>
     </DialogFooter>
    </DialogContent>
   </Dialog>
  </div>
 );
}
