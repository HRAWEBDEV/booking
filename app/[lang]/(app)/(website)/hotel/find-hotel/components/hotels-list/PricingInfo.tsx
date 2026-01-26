import { Badge } from '@/components/ui/badge';
import { FindHotelDictionary } from '@/internalization/app/dictionaries/website/find-hotel/dictionary';

export default function PricingInfo({ dic }: { dic: FindHotelDictionary }) {
 const { mockBaseDiscountPrice, mockBasePrice, discountBadge, residentUnit } =
  dic.hotelCard;

 if (!mockBaseDiscountPrice) {
  return (
   <div className='flex items-center justify-center w-full group-data-[view="row"]:justify-center'>
    <div className='sm:text-md text-lg font-semibold'>
     {mockBasePrice}
     <span className='text-sm text-muted-foreground'>/ {residentUnit}</span>
    </div>
   </div>
  );
 }

 return (
  <>
   <div className='flex items-center justify-between w-full group-data-[view="row"]:justify-start group-data-[view="row"]:flex-row group-data-[view="grid"]:flex-row-reverse'>
    <Badge
     variant='secondary'
     className='cursor-pointer text-gray-100 px-1.5 py-1 dark:text-gray-300 text-xs group-data-[view="grid"]:hidden group-data-[view="row"]:mb-4'
    >
     {discountBadge}
    </Badge>

    <div className='text-sm font-semibold line-through text-destructive group-data-[view="row"]:hidden'>
     {mockBasePrice}
    </div>
   </div>

   <div className='hidden group-data-[view="row"]:flex group-data-[view="row"]:flex-col group-data-[view="row"]:items-center group-data-[view="row"]:justify-center group-data-[view="row"]:gap-1 group-data-[view="row"]:w-full'>
    <div className='flex flex-col-reverse justify-center items-center w-full gap-1'>
     <div className='font-semibold text-md'>
      {mockBaseDiscountPrice}
      <span className='text-sm text-muted-foreground'>/ {residentUnit}</span>
     </div>
    </div>
    <div className='flex relative items-center gap-2 w-full justify-center'>
     <div className='flex gap-1 items-center'>
      <div className='text-sm font-semibold line-through text-destructive whitespace-nowrap'>
       {mockBasePrice}
      </div>
     </div>
    </div>
   </div>

   <div className='flex items-center w-full group-data-[view="row"]:hidden justify-start'>
    <div className='text-md font-semibold whitespace-nowrap'>
     {mockBaseDiscountPrice}
     <span className='text-xs md:text-sm text-muted-foreground'>
      / {residentUnit}
     </span>
    </div>
   </div>
  </>
 );
}
