'use client';
import { useShareDictionary } from '../../services/share-dictionary/shareDictionaryContext';
import { Button } from '@/components/ui/button';
import { FaUser } from 'react-icons/fa';
import { IoHome } from 'react-icons/io5';
import { FaTicket } from 'react-icons/fa6';
import { LuCirclePlus } from 'react-icons/lu';

export default function MobileNav() {
 const {
  shareDictionary: {
   component: { mobileNav: mobileNavDic },
  },
 } = useShareDictionary();
 return (
  <nav className='grid fixed bg-background bottom-0 start-0 end-0 border-t border-input shadow-[0_-4px_8px] shadow-black/10 dark:shadow-white/10 z-(--website-mobile-nav-zindex) h-(--website-mobile-nav-height) lg:hidden grid-cols-4 text-neutral-500'>
   <Button
    data-active='true'
    variant='ghost'
    size={'icon'}
    className='group flex-col h-auto w-auto'
   >
    <IoHome className='size-6' />
    <span className='font-medium'>{mobileNavDic.home}</span>
   </Button>
   <Button variant='ghost' size={'icon'} className='flex-col h-auto w-auto'>
    <LuCirclePlus className='size-6' />
    <span className='font-medium'>{mobileNavDic.newReserve}</span>
   </Button>
   <Button variant='ghost' size={'icon'} className='flex-col h-auto w-auto'>
    <FaTicket className='size-6' />
    <span className='font-medium'>{mobileNavDic.checkReserve}</span>
   </Button>
   <Button variant='ghost' size={'icon'} className='flex-col h-auto w-auto'>
    <FaUser className='size-6' />
    <span className='font-medium'>{mobileNavDic.profile}</span>
   </Button>
  </nav>
 );
}
