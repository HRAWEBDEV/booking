'use client';
import { useState } from 'react';
import Link from 'next/link';
import LogoShapeIcon from '@/components/icons/LogoShapeIcon';
import { useGoHome } from '../hooks/useGoHome';

export default function HeaderLogo({ logoUrl }: { logoUrl: string | null }) {
 const [loadLogoError, setLoadLogoError] = useState(false);
 const { link, isHomePage } = useGoHome();

 function renderHeaderLogo() {
  if (loadLogoError || !logoUrl)
   return (
    <LogoShapeIcon className='size-16 text-primary' fill='currentColor' />
   );
  return (
   <img
    alt='hotel image'
    src={logoUrl}
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
