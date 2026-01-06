import {
 Accordion,
 AccordionContent,
 AccordionItem,
 AccordionTrigger,
} from '@/components/ui/accordion';
import { Slider } from '@/components/ui/slider';
import { FindHotelDictionary } from '@/internalization/app/dictionaries/website/find-hotel/dictionary';

export default function PriceRangeFilter({
 dic,
 currentPriceRange,
 setCurrentPriceRange,
}: {
 dic: FindHotelDictionary;
 currentPriceRange: number[];
 setCurrentPriceRange: React.Dispatch<React.SetStateAction<number[]>>;
}) {
 return (
  <>
   <Accordion
    type='single'
    collapsible
    defaultValue='item-1'
    className='w-full '
   >
    <AccordionItem value='item-1' className='border-none'>
     <AccordionTrigger className='cursor-pointer hover:no-underline py-2 font-semibold text-base'>
      {dic.priceRangeFilter.priceTitle}
     </AccordionTrigger>
     <AccordionContent className='pt-3 pb-4'>
      <Slider
       className='py-4 w-full **:data-[slot=slider-thumb]:size-5 cursor-pointer **:data-[slot=slider-range]:bg-blue-500'
       value={currentPriceRange}
       onValueChange={setCurrentPriceRange}
       min={0}
       max={50_000_000}
       inverted
      />
      <div className='flex justify-between items-center text-sm text-muted-foreground mt-3'>
       <div className='flex flex-col items-start gap-1'>
        <span className='text-muted-foreground/70'>
         {dic.priceRangeFilter.unit}
        </span>
        <span className='font-medium text-foreground text-base'>
         {currentPriceRange[0].toLocaleString('fa-IR')}
        </span>
       </div>
       <div className='flex flex-col items-end gap-1'>
        <span className='text-muted-foreground/70'>
         {dic.priceRangeFilter.unit}
        </span>
        <span className='font-medium text-foreground text-base'>
         {currentPriceRange[1].toLocaleString('fa-IR')}
        </span>
       </div>
      </div>
     </AccordionContent>
    </AccordionItem>
   </Accordion>
  </>
 );
}
