import { type PreviewHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/preview-hotel/dictionary';
import { FaLocationDot } from 'react-icons/fa6';
import { FaStar } from 'react-icons/fa6';
import { FaShareAlt } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

export default function HotelTitle({}: { dic: PreviewHotelDictionary }) {
 return (
  <div className='p-4'>
   <div className='flex gap-1 mb-2 items-center'>
    {Array.from({ length: 5 }, (_, i) => i).map((i) => (
     <FaStar
      data-active={i <= 3}
      key={i}
      className='size-4 text-neutral-200 dark:text-neutral-800 data-[active="true"]:text-orange-400 data-[active="true"]:dark:text-orange-800'
     />
    ))}
    <span className='text-xs text-neutral-500'>(3) ستاره</span>
   </div>
   <h1 className='text-2xl font-medium mb-2'>
    <Button variant='ghost' size='icon' className='text-neutral-500'>
     <FaShareAlt />
    </Button>
    <span>هتل کیش</span>
   </h1>
   <div className='text-xs text-neutral-600 dark:text-neutral-400'>
    <FaLocationDot className='inline size-4 text-rose-700 dark:text-rose-400' />
    <p className='inline ms-2'>
     لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
    </p>
   </div>
  </div>
 );
}
