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
  slides: { perView: 'auto', spacing: 16 },
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
    <AccordionTrigger className='cursor-pointer bg-primary/20 text-primary rounded-t-none px-4 flex items-center justify-center data-[state=open]:rounded-b-none transition-all [&>svg]:text-primary hover:no-underline'>
     {dic.hotelCard.fastReserve}
    </AccordionTrigger>

    <AccordionContent className='w-full min-w-0 bg-primary/10 data-[state=open]:rounded-t-none rounded-b-xl'>
     <div className='w-full min-w-0 overflow-x-auto pt-4 px-4 active:cursor-grabbing'>
      <div className='keen-slider inline-flex w-max' ref={sliderRef}>
       {Array.from({ length: 12 }).map((_, i) => (
        <div
         key={i}
         className='keen-slider__slide cursor-grab active:cursor-grabbing shrink-0 max-w-[260px] h-[140px] rounded-xl bg-muted p-4 flex flex-col gap-4 justify-center items-start'
        >
         <h6 className='font-medium text-lg'>
          {dic.hotelCard.FastReserveRoomsMocData[0].title}
         </h6>
         <div className='text-md font-medium'>
          {dic.hotelCard.FastReserveRoomsMocData[0].roomPrice}
          <span className='text-sm text-muted-foreground'>
           / {dic.hotelCard.FastReserveRoomsMocData[0].residentUnit}
          </span>
         </div>
         <Button className='w-full cursor-pointer bg-secondary/20 text-secondary border-secondary hover:bg-secondary/60 hover:text-secondary'>
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
