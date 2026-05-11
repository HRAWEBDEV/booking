'use client';
import { useState } from 'react';
import Link from 'next/link';
import LogoShapeIcon from '@/components/icons/LogoShapeIcon';
import { useGoHome } from '../hooks/useGoHome';

export default function HeaderLogo() {
 const [loadLogoError, setLoadLogoError] = useState(false);
 const { link, isHomePage } = useGoHome();
 const hotelID = process.env.NEXT_PUBLIC_HOTELID;

 function renderHeaderLogo() {
  if (loadLogoError || !hotelID)
   return (
    <LogoShapeIcon className='size-16 text-primary' fill='currentColor' />
   );
  return (
   <img
    alt='hotel image'
    src='/hotel-logo.png'
    className='size-16 object-center object-contain'
    onError={() => {
     setLoadLogoError(true);
    }}
   />
  );
 }

 return (
  <div>
   <Link href={isHomePage ? '#' : link}>{renderHeaderLogo()}</Link>
  </div>
 );
}
