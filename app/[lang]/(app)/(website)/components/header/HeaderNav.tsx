'use client';
import Link from 'next/link';
import { FaRegQuestionCircle } from 'react-icons/fa';
import { MdSupportAgent } from 'react-icons/md';
import { FaTicket } from 'react-icons/fa6';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';
import {
 NavigationMenu,
 NavigationMenuItem,
 NavigationMenuLink,
 NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { useShareDictionary } from '../../services/share-dictionary/shareDictionaryContext';
import useReserveHotel from '../../services/reserve-hotel/ReserveHotelContext';
import {
 Popover,
 PopoverTrigger,
 PopoverContent,
} from '@/components/ui/popover';
import { BsTelephoneFill } from 'react-icons/bs';
import { Button } from '@/components/ui/button';

export default function HeaderNav() {
 const { localeInfo } = useBaseConfig();
 const {
  shareDictionary: {
   component: {
    header: { headerNav: headerNavDic },
   },
  },
 } = useShareDictionary();
 const { setIsOpen } = useReserveHotel();
 return (
  <div className='grow ms-10'>
   <div className='hidden lg:block'>
    <NavigationMenu dir={localeInfo.contentDirection}>
     <NavigationMenuList className='flex-wrap'>
      <NavigationMenuItem>
       <NavigationMenuLink asChild>
        <Popover>
         <PopoverTrigger asChild className='text-inherit text-sm'>
          <Link href='#' className='flex items-center flex-row gap-2'>
           <MdSupportAgent className='size-6 text-muted-foreground' />
           <span className='font-medium'>{headerNavDic.support}</span>
          </Link>
         </PopoverTrigger>
         <PopoverContent dir={localeInfo.contentDirection} align='start'>
          <Button asChild className='w-full' variant='outline'>
           <Link href='tel:02191780185'>
            <span>021-91780185</span>
            <BsTelephoneFill />
           </Link>
          </Button>
         </PopoverContent>
        </Popover>
       </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
       <NavigationMenuLink asChild onClick={() => setIsOpen(true)}>
        <Link href='#' className='flex items-center flex-row gap-2'>
         <FaTicket className='size-5' />
         <span className='font-medium'>{headerNavDic.checkReserve}</span>
        </Link>
       </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
       <NavigationMenuLink asChild>
        <Link href='#' className='flex items-center flex-row gap-2'>
         <FaRegQuestionCircle className='size-5' />
         <span className='font-medium'>{headerNavDic.aboutReserveOnline}</span>
        </Link>
       </NavigationMenuLink>
      </NavigationMenuItem>
     </NavigationMenuList>
    </NavigationMenu>
   </div>
  </div>
 );
}
