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
import Image from 'next/image';
import HotelLocation from './HotelLocation';
import { type HotelInfo } from '../../../services/hotelApiActions';
import { openNeshanMap, openGoogleMaps } from '../utils/mapActions';

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
     <Button
      variant='outline'
      className='text-primary border border-primary'
      size='lg'
     >
      <FaMapMarkedAlt className='size-6' />
     </Button>
    </DialogTrigger>
    <DialogContent className='h-[95dvh] w-[95dvw] max-w-dvw flex flex-col'>
     <DialogHeader>
      <DialogTitle className='font-medium text-base sm:text-lg pe-8 text-start line-clamp-1'>
       {dic.hotelInfo.location} {hotelInfo.fName}
      </DialogTitle>
     </DialogHeader>
     <div className='grow flex flex-col'>
      <HotelLocation dic={dic} hotelInfo={hotelInfo} isDrawer />
     </div>
     <DialogFooter className='flex flex-col sm:flex-col gap-2 w-full'>
      <div className='grid grid-cols-2 gap-2 w-full'>
       <Button
        size='lg'
        className='w-full px-2 sm:px-4 text-xs sm:text-sm gap-1.5 sm:gap-2'
        onClick={() => openNeshanMap(hotelInfo.latitude, hotelInfo.longitude)}
        disabled={!hotelInfo.latitude || !hotelInfo.longitude}
       >
        <Image
         src='/neshan-logo.svg'
         alt='Neshan'
         width={24}
         height={24}
         className='size-5 shrink-0 object-contain'
        />
        <span className='whitespace-nowrap'>
         {dic.hotelInfo.routingWithNeshan}
        </span>
       </Button>
       <Button
        size='lg'
        className='w-full px-2 sm:px-4 text-xs sm:text-sm gap-1.5 sm:gap-2'
        onClick={() => openGoogleMaps(hotelInfo.latitude, hotelInfo.longitude)}
        disabled={!hotelInfo.latitude || !hotelInfo.longitude}
       >
        <Image
         src='/google-maps-icon.svg'
         alt='Google Maps'
         width={24}
         height={24}
         className='size-5 shrink-0 object-contain'
        />
        <span className='whitespace-nowrap'>
         {dic.hotelInfo.routingWithGoogle}
        </span>
       </Button>
      </div>
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
