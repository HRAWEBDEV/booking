import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Star } from 'lucide-react';
import { FindHotelDictionary } from '@/internalization/app/dictionaries/website/find-hotel/dictionary';
import {
 Accordion,
 AccordionContent,
 AccordionItem,
 AccordionTrigger,
} from '@/components/ui/accordion';

const STAR_RATINGS = [5, 4, 3, 2, 1] as const;

export default function StarFilters({ dic }: { dic: FindHotelDictionary }) {
 return (
  <Accordion
   type='single'
   collapsible
   defaultValue='star-filters'
   className='w-full'
  >
   <AccordionItem value='star-filters' className='border-none'>
    <AccordionTrigger className='cursor-pointer hover:no-underline py-2 font-semibold text-base'>
     {dic.starFilter.title}
    </AccordionTrigger>
    <AccordionContent className='pt-3 pb-4'>
     <div className='flex flex-col items-start gap-4'>
      {STAR_RATINGS.map((starCount) => (
       <div key={starCount} className='flex items-center gap-3'>
        <Checkbox
         className='cursor-pointer size-5'
         id={`star-filter-${starCount}`}
        />
        <Label
         htmlFor={`star-filter-${starCount}`}
         className='text-base cursor-pointer'
        >
         <span>{dic.starFilter.starLabels[starCount]}</span>
         <span className='flex items-center justify-center gap-1'>
          {Array.from({ length: starCount }, (_, i) => (
           <Star key={i} size={16} className='fill-[#ed6c02] text-[#ed6c02]' />
          ))}
         </span>
        </Label>
       </div>
      ))}
     </div>
    </AccordionContent>
   </AccordionItem>
  </Accordion>
 );
}
