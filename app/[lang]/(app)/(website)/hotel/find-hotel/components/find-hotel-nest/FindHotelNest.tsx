'use client';
import {
 Breadcrumb,
 BreadcrumbItem,
 BreadcrumbList,
 BreadcrumbLink,
 BreadcrumbPage,
 BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import { FindHotelDictionary } from '@/internalization/app/dictionaries/website/find-hotel/dictionary';
export default function FindHotelNest({ dic }: { dic: FindHotelDictionary }) {
 const [selectedCity] = useState('کیش');
 return (
  <>
   <Breadcrumb className='py-8'>
    <BreadcrumbList>
     <BreadcrumbItem>
      <BreadcrumbLink
       className='text-right text-gray-400 dark:text-gray-600 hover:text-gray-500 dark:hover:text-gray-400 font-normal'
       href='../../'
      >
       {dic.breadCrumb.home}
      </BreadcrumbLink>
     </BreadcrumbItem>
     <BreadcrumbSeparator>
      <ChevronLeft />
     </BreadcrumbSeparator>
     <BreadcrumbItem>
      <BreadcrumbLink
       className='text-right text-gray-400 dark:text-gray-600 hover:text-gray-500 dark:hover:text-gray-400 font-normal'
       href={`../`}
      >
       {dic.breadCrumb.hotel} {selectedCity}
      </BreadcrumbLink>
     </BreadcrumbItem>
     <BreadcrumbSeparator>
      <ChevronLeft />
     </BreadcrumbSeparator>
     <BreadcrumbItem>
      <BreadcrumbPage className='text-right text-ginger'>
       {dic.breadCrumb.findHotel} {selectedCity}
      </BreadcrumbPage>
     </BreadcrumbItem>
    </BreadcrumbList>
   </Breadcrumb>
  </>
 );
}
