import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { FindHotelDictionary } from '@/internalization/app/dictionaries/website/find-hotel/dictionary';
import {
 Accordion,
 AccordionContent,
 AccordionItem,
 AccordionTrigger,
} from '@/components/ui/accordion';

const Beds = [1, 2, 3, 4, 5] as const;

export default function BedFilters({ dic }: { dic: FindHotelDictionary }) {
 return (
  <Accordion type='single' collapsible defaultValue='item-1' className='w-full'>
   <AccordionItem value='item-1' className='border-none'>
    <AccordionTrigger className='cursor-pointer hover:no-underline py-2 font-semibold text-base'>
     {dic.bedFilters.title}
    </AccordionTrigger>
    <AccordionContent className='pt-3 pb-4'>
     <div className='flex flex-col items-start gap-4'>
      {Beds.map((bedCount) => (
       <div key={bedCount} className='flex items-center gap-3'>
        <Checkbox
         className='cursor-pointer size-5'
         id={`bed-filter-${bedCount}`}
        />
        <Label
         htmlFor={`bed-filter-${bedCount}`}
         className='text-base cursor-pointer'
        >
         {dic.bedFilters.bedLabels[bedCount]}
        </Label>
       </div>
      ))}
     </div>
    </AccordionContent>
   </AccordionItem>
  </Accordion>
 );
}
