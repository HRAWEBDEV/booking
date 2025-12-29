'use client';
import { useShareDictionary } from '../../services/share-dictionary/shareDictionaryContext';
import { Button } from '@/components/ui/button';
import { FaUser } from 'react-icons/fa';
import { IoHome } from 'react-icons/io5';
import { FaTicket } from 'react-icons/fa6';

export default function MobileNav() {
 const {
  shareDictionary: {
   component: { mobileNav: mobileNavDic },
  },
 } = useShareDictionary();
 return (
  <nav className='grid fixed bg-background bottom-0 start-0 end-0 border-t border-input shadow-[0_-2px_8px] shadow-black/10 dark:shadow-white/10 z-(--website-mobile-nav-zindex) h-(--website-mobile-height) lg:hidden grid-cols-3 text-neutral-600 dark:text-neutral-400'>
   <Button variant='ghost' className='flex-col h-auto w-auto'>
    <IoHome className='size-6' />
    <span className='font-medium'>{mobileNavDic.home}</span>
   </Button>
   <Button variant='ghost' className='flex-col h-auto w-auto'>
    <FaTicket className='size-6' />
    <span className='font-medium'>{mobileNavDic.newReserve}</span>
   </Button>
   <Button variant='ghost' className='flex-col h-auto w-auto'>
    <FaUser className='size-6' />
    <span className='font-medium'>{mobileNavDic.profile}</span>
   </Button>
  </nav>
 );
}
