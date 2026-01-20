import {
 Card,
 CardContent,
 CardFooter,
 CardHeader,
} from '@/components/ui/card';
import { ImageMinus, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { HotelItem } from './HotelItemTypes';

export default function HotelCardListItem({
 dic,
 currentSlide,
 slidesCount,
 sliderRef,
 instanceRef,
}: HotelItem) {
 return (
  <>
   <Card className='w-full! shadow-none py-4 pt-0 gap-4'>
    <CardHeader className='px-0! gap-0 relative'>
     <div
      ref={sliderRef}
      className='keen-slider relative overflow-hidden rounded-xl rounded-b-none'
     >
      {Array.from({ length: 2 }, (_, i) => i).map((i) => (
       <div
        key={i}
        className='keen-slider__slide cursor-grab active:cursor-grabbing overflow-hidden w-full'
       >
        <div className='h-60 border border-input rounded-xl rounded-b-none bg-gray-200 dark:bg-gray-600 flex items-center justify-center gap-4 w-full'>
         <ImageMinus className='text-gray-600 dark:text-gray-300' size={64} />
        </div>
       </div>
      ))}
      {slidesCount > 0 && (
       <div className='flex justify-center gap-2 py-3 absolute bottom-0 left-0 right-0'>
        {[...Array(slidesCount).keys()].map((idx) => (
         <button
          key={idx}
          onClick={() => instanceRef?.current?.moveToIdx(idx)}
          className={`h-2 border cursor-pointer border-gray-300 rounded-full transition-all ${
           currentSlide === idx
            ? 'bg-white w-6'
            : 'bg-gray-200/80 hover:bg-white w-2'
          }`}
         />
        ))}
       </div>
      )}
     </div>
    </CardHeader>
    <Link href={'#'}>
     <CardContent className='px-4 flex flex-col gap-4'>
      <div className='flex flex-col gap-2'>
       <div className='flex items-center justify-between'>
        <span className='flex items-center justify-ceter gap-1'>
         {Array.from({ length: 5 }, (_, i) => i).map((i) => (
          <Star key={i} size={12} fill='#ed6c02' stroke='#ed6c02' />
         ))}
        </span>
       </div>
       <h3 className='font-semibold text-lg'>{dic.hotelCard.mockTitle}</h3>
       <div>
        <p className='text-sm text-muted-foreground'>
         {dic.hotelCard.mockLocation}
        </p>
       </div>
      </div>
      <div className='flex items-center gap-2 flex-wrap'>
       {dic?.hotelCard?.mockAmentities?.slice(0, 3).map((item, index) => (
        <Badge
         key={index}
         variant='outline'
         className='p-2 rounded-lg text-gray-600 dark:text-gray-300'
        >
         {item}
        </Badge>
       ))}
       {(dic?.hotelCard?.mockAmentities?.length ?? 0) > 3 && (
        <Badge
         variant='outline'
         className='p-2 px-4 rounded-lg text-gray-600 dark:text-gray-300'
        >
         +{(dic?.hotelCard?.mockAmentities?.length ?? 0) - 3}
        </Badge>
       )}
      </div>
     </CardContent>
     <CardFooter className='gap-2 flex items-center justify-between! px-4 pt-2'>
      <div className='flex gap-1 items-center w-full'>
       <span>{dic.hotelCard.fromText}</span>
       <div className='text-lg font-semibold'>
        {dic.hotelCard.mockBasePrice}
        <span className='text-sm text-muted-foreground'>
         / {dic.hotelCard.residentUnit}
        </span>
       </div>
      </div>
      <Badge
       variant='secondary'
       className='cursor-pointer text-gray-100 px-2 py-1 dark:text-gray-300 text-xs '
      >
       {dic.hotelCard.discountBadge}
      </Badge>
     </CardFooter>
    </Link>
   </Card>
  </>
 );
}
