import {
 Accordion,
 AccordionItem,
 AccordionTrigger,
 AccordionContent,
} from '@/components/ui/accordion';
import { FindHotelDictionary } from '@/internalization/app/dictionaries/website/find-hotel/dictionary';
import useFindHotel from '../../../../services/find-hotel/FindHotelContext';
import { Button } from '@/components/ui/button';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';
import { useEffect } from 'react';
import { useKeenSlider } from 'keen-slider/react';

export default function HotelItemRowAccordion({
 dic,
}: {
 dic: FindHotelDictionary;
}) {
 const { localeInfo } = useBaseConfig();
 const [sliderRef, instanceRef] = useKeenSlider({
  initial: 0,

  rtl: localeInfo.contentDirection === 'rtl',
  slides: { perView: 'auto', spacing: 8 },
 });
 const { isRowView } = useFindHotel();
 useEffect(() => {
  instanceRef.current?.update();
 }, [instanceRef, isRowView]);
 return (
  <Accordion
   type='single'
   collapsible
   defaultValue={undefined}
   data-view={isRowView ? 'row' : 'grid'}
   className='w-full min-w-0 data-[view="grid"]:hidden overflow-x-hidden'
  >
   <AccordionItem value='item-1' className='w-full min-w-0 '>
    <AccordionTrigger className='cursor-pointer bg-neutral-100 dark:bg-neutral-800 text-neutral-100 rounded-t-none px-4 py-3 flex items-center justify-center data-[state=open]:rounded-b-none transition-all [&>svg]:text-neutral-700 dark:[&>svg]:text-neutral-100 hover:no-underline border border-input border-t-0'>
     {dic.hotelCard.fastReserve}
    </AccordionTrigger>

    <AccordionContent className='w-full min-w-0 bg-neutral-100 dark:bg-neutral-700 data-[state=open]:rounded-t-none rounded-b-xl border border-input border-t-0 py-2'>
     <div className='w-full min-w-0 overflow-x-auto  px-4 active:cursor-grabbing'>
      <div className='keen-slider inline-flex w-max' ref={sliderRef}>
       {Array.from({ length: 12 }).map((_, i) => (
        <div
         key={i}
         className='keen-slider__slide cursor-grab active:cursor-grabbing shrink-0 max-w-[200px] rounded-lg border bg-background dark:bg-neutral-800 p-2 flex flex-col gap-2 justify-around items-start'
        >
         <h6 className='font-medium text-base'>
          {dic.hotelCard.FastReserveRoomsMocData[0].title}
         </h6>
         <div className='text-md font-medium'>
          {dic.hotelCard.FastReserveRoomsMocData[0].roomPrice}
          <span className='text-sm text-muted-foreground'>
           / {dic.hotelCard.FastReserveRoomsMocData[0].residentUnit}
          </span>
         </div>
         <Button
          variant={'outline'}
          size={'sm'}
          className='w-full cursor-pointer rounded-sm border-primary text-primary dark:border-neutral-200'
         >
          {dic.hotelCard.resserve}
         </Button>
        </div>
       ))}
      </div>
     </div>
    </AccordionContent>
   </AccordionItem>
  </Accordion>
 );
}
