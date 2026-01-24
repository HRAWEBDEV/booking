import { Badge } from '@/components/ui/badge';
import { FindHotelDictionary } from '@/internalization/app/dictionaries/website/find-hotel/dictionary';

export default function PricingInfo({ dic }: { dic: FindHotelDictionary }) {
 const { mockBaseDiscountPrice, mockBasePrice, discountBadge, residentUnit } =
  dic.hotelCard;

 if (!mockBaseDiscountPrice) {
  return (
   <div className='flex items-center justify-center w-full group-data-[view="row"]:justify-center'>
    <div className='text-lg font-semibold'>
     {mockBasePrice}
     <span className='text-sm text-muted-foreground'>/ {residentUnit}</span>
    </div>
   </div>
  );
 }

 return (
  <>
   <div className='flex items-center justify-between w-full group-data-[view="row"]:justify-start group-data-[view="grid"]:justify-center group-data-[view="row"]:mb-0'>
    <Badge
     variant='secondary'
     className='cursor-pointer text-gray-100 px-1.5 py-1 dark:text-gray-300 text-xs group-data-[view="grid"]:hidden'
    >
     {discountBadge}
    </Badge>

    <div className='text-md font-semibold line-through text-destructive group-data-[view="row"]:hidden'>
     {mockBasePrice}
    </div>
   </div>

   <div className='hidden group-data-[view="row"]:flex group-data-[view="row"]:flex-col group-data-[view="row"]:items-center group-data-[view="row"]:gap-2 group-data-[view="row"]:w-full'>
    <div className='flex flex-col-reverse items-center group-data-[view="grid"]:justify-center w-full gap-2'>
     <div className='sm:text-lg font-semibold text-xl'>
      {mockBaseDiscountPrice}
      <span className='text-sm text-muted-foreground'>/ {residentUnit}</span>
     </div>
    </div>
    <div className='flex relative items-center gap-2'>
     <div className='flex gap-1 items-center w-full'>
      <div className='text-md font-semibold line-through text-destructive'>
       {mockBasePrice}
      </div>
     </div>
    </div>
   </div>

   <div className='flex items-center w-full group-data-[view="row"]:hidden justify-center'>
    <div className='text-lg font-semibold'>
     {mockBaseDiscountPrice}
     <span className='text-sm text-muted-foreground'>/ {residentUnit}</span>
    </div>
   </div>
  </>
 );
}
