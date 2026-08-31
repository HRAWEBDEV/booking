import { FaStar } from 'react-icons/fa6';

export default function HotelStars({
 grade,
 label,
}: {
 grade: number;
 label: string;
}) {
 return (
  <div className='flex gap-1 items-center'>
   {Array.from({ length: 5 }, (_, i) => i).map((i) => (
    <FaStar
     data-active={i < (grade || 0)}
     key={i}
     className='size-6 text-neutral-200 dark:text-neutral-800 data-[active="true"]:text-orange-400 data-[active="true"]:dark:text-orange-800'
    />
   ))}
   <span className='text-md text-neutral-500'>
    ({grade}) {label}
   </span>
  </div>
 );
}
