import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { FindHotelDictionary } from '@/internalization/app/dictionaries/website/find-hotel/dictionary';
import {
 Accordion,
 AccordionContent,
 AccordionItem,
 AccordionTrigger,
} from '@/components/ui/accordion';

const OFFER_KEYS = [
 'freeNightPackage',
 'freeHalfBoardEntry',
 'freeCancellation',
 'restaurantDiscount',
] as const;

export default function OffersFilter({ dic }: { dic: FindHotelDictionary }) {
 return (
  <Accordion type='single' collapsible defaultValue='item-1' className='w-full'>
   <AccordionItem value='item-1' className='border-none'>
    <AccordionTrigger className='cursor-pointer hover:no-underline py-2 font-semibold text-sm'>
     {dic.offersFilter.title}
    </AccordionTrigger>
    <AccordionContent className='pt-2 pb-4'>
     <div className='flex flex-col items-start gap-4'>
      {OFFER_KEYS.map((offerKey) => (
       <div key={offerKey} className='flex items-center gap-3'>
        <Checkbox className='cursor-pointer' id={`offer-filter-${offerKey}`} />
        <Label htmlFor={`offer-filter-${offerKey}`}>
         {dic.offersFilter.offers[offerKey]}
        </Label>
       </div>
      ))}
     </div>
    </AccordionContent>
   </AccordionItem>
  </Accordion>
 );
}
