'use client';
import { type PreviewHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/preview-hotel/dictionary';
import {
 Drawer,
 DrawerTrigger,
 DrawerTitle,
 DrawerHeader,
 DrawerContent,
} from '@/components/ui/drawer';
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
   <Drawer>
    <DrawerTrigger asChild>
     <Button size='lg'>
      <FaMapMarkedAlt className='size-6' />
     </Button>
    </DrawerTrigger>
    <DrawerContent>
     <DrawerHeader>
      <DrawerTitle className='font-medium text-lg'>
       {dic.hotelInfo.location}
      </DrawerTitle>
     </DrawerHeader>
     <div>
      <HotelLocation dic={dic} hotelInfo={hotelInfo} isDrawer />
     </div>
    </DrawerContent>
   </Drawer>
  </div>
 );
}
