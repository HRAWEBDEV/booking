import HeaderProfile from './HeaderProfile';
import HeaderLogo from '../HeaderLogo';
import HeaderNav from './HeaderNav';
import { LocaleControllerButton } from '../LocaleController';
import { getHotelLogoUrl } from '../../hotel/services/getHotelLogoUrl';

export default async function Header() {
 const logoUrl = await getHotelLogoUrl();
 return (
  <header className='bg-background border-b border-input shadow-[0_4px_8px] shadow-black/10 dark:shadow-white/10 z-(--website-header-zindex) h-(--website-header-height)'>
   <div className='flex items-center p-4 py-2 w-[min(100%,var(--website-container-max-width))] mx-auto h-full'>
    <HeaderLogo logoUrl={logoUrl} />
    <HeaderNav />
    <div className='flex gap-2 lg:gap-4 items-center'>
     <LocaleControllerButton />
     <HeaderProfile />
    </div>
   </div>
  </header>
 );
}
