'use client';
import { FaShareAlt } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { type PreviewHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/preview-hotel/dictionary';

export default function ShareHotelButton({
 dic,
}: {
 dic: PreviewHotelDictionary;
}) {
 return (
  <Button
   title={dic.hotelInfo.share}
   variant='ghost'
   size='icon'
   className='text-neutral-500'
   onClick={() => {
    navigator.clipboard.writeText(location.href);
    if (!navigator.share) return;
    navigator.share({
     url: location.href,
    });
   }}
  >
   <FaShareAlt />
  </Button>
 );
}
