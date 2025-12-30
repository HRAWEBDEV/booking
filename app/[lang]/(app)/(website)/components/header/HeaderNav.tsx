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

export default function HeaderNav() {
 const { localeInfo } = useBaseConfig();
 const {
  shareDictionary: {
   component: {
    header: { headerNav: headerNavDic },
   },
  },
 } = useShareDictionary();
 return (
  <div className='grow ms-10'>
   <div className='hidden lg:block'>
    <NavigationMenu dir={localeInfo.contentDirection}>
     <NavigationMenuList className='flex-wrap'>
      <NavigationMenuItem>
       <NavigationMenuLink asChild>
        <Link href='#' className='flex items-center flex-row gap-2'>
         <MdSupportAgent className='size-6' />
         <span className='font-medium'>{headerNavDic.support}</span>
        </Link>
       </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
       <NavigationMenuLink asChild>
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
