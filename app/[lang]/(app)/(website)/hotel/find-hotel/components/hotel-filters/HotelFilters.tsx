import { Input } from '@/components/ui/input';
import React from 'react';

export default function HotelFilters() {
 return (
  <div className='lg:flex flex-col hidden max-w-[200px] w-fullsticky self-start top-4'>
   <div>
    <Input value='outline' type='search' placeholder='جستجوی نام هتل' />
   </div>
  </div>
 );
}
