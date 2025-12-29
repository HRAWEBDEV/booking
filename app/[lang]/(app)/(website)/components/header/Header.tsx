import HeaderProfile from './HeaderProfile';
import HeaderLogo from '../HeaderLogo';

export default function Header() {
 return (
  <header className='bg-background border-b border-input shadow-[0_4px_8px] shadow-black/10 dark:shadow-white/10 z-(--website-header-zindex) h-(--website-header-height)'>
   <div>
    <HeaderLogo />
   </div>
   <div className='grow'></div>
   <div>
    <HeaderProfile />
   </div>
  </header>
 );
}
