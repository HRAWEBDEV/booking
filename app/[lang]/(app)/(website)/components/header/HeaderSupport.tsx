import { Button } from '@/components/ui/button';
import { MdSupportAgent } from 'react-icons/md';
import Link from 'next/link';
import { contactUs } from '../../utils/contractUs';

export default function HeaderSupport() {
 return (
  <Button variant='ghost' size='icon-lg' className='rounded-full'>
   <Link href={`tel:${contactUs}`}>
    <MdSupportAgent className='size-5' />
   </Link>
  </Button>
 );
}
