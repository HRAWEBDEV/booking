import Link from 'next/link';
import LogoShapeIcon from '@/components/icons/LogoShapeIcon';

export default function HeaderLogo() {
 return (
  <div>
   <Link href='#'>
    <LogoShapeIcon className='size-12 text-primary' fill='currentColor' />
   </Link>
  </div>
 );
}
