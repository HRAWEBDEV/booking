'use client';
import Link from 'next/link';
import LogoShapeIcon from '@/components/icons/LogoShapeIcon';
import { useGoHome } from '../hooks/useGoHome';

export default function HeaderLogo() {
 const { link } = useGoHome();
 return (
  <div>
   <Link href={link}>
    <LogoShapeIcon className='size-12 text-primary' fill='currentColor' />
   </Link>
  </div>
 );
}
