import {
 Breadcrumb,
 BreadcrumbItem,
 BreadcrumbList,
 BreadcrumbLink,
 BreadcrumbPage,
 BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { ChevronLeft } from 'lucide-react';

export default function FindHotelNest() {
 return (
  <>
   <Breadcrumb className='py-8'>
    <BreadcrumbList>
     <BreadcrumbItem>
      <BreadcrumbLink
       className='text-right text-gray-400 dark:text-gray-600 hover:text-gray-500 dark:hover:text-gray-400 font-normal'
       href='../../'
      >
       خانه
      </BreadcrumbLink>
     </BreadcrumbItem>
     <BreadcrumbSeparator>
      <ChevronLeft />
     </BreadcrumbSeparator>
     <BreadcrumbItem>
      <BreadcrumbLink
       className='text-right text-gray-400 dark:text-gray-600 hover:text-gray-500 dark:hover:text-gray-400 font-normal'
       href='../'
      >
       رزرو هتل کیش
      </BreadcrumbLink>
     </BreadcrumbItem>
     <BreadcrumbSeparator>
      <ChevronLeft />
     </BreadcrumbSeparator>
     <BreadcrumbItem>
      <BreadcrumbPage className='text-right text-ginger'>
       جستجوی هتل کیش
      </BreadcrumbPage>
     </BreadcrumbItem>
    </BreadcrumbList>
   </Breadcrumb>
  </>
 );
}
