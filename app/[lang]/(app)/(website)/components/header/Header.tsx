import HeaderProfile from './HeaderProfile';
import HeaderLogo from '../HeaderLogo';
import { ModeControllerButton } from '../ModeContoller';
import { LocaleControllerButton } from '../LocaleController';

export default function Header() {
 return (
  <header className='bg-background border-b border-input shadow-[0_4px_8px] shadow-black/10 dark:shadow-white/10 z-(--website-header-zindex) h-(--website-header-height)'>
   <div className='flex items-center p-4 py-2 w-[min(100%,var(--website-container-max-width))] mx-auto'>
    <div>
     <HeaderLogo />
    </div>
    <div className='grow'></div>
    <div className='flex gap-2 lg:gap-4 items-center'>
     <LocaleControllerButton />
     <ModeControllerButton />
     <HeaderProfile />
    </div>
   </div>
  </header>
 );
}
