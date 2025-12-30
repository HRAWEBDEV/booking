import Hero from '../components/hero/Hero';
import ReservePicker from '../components/reserve-picker/ReservePicker';

export default function HomeLayout({ children }: LayoutProps<'/[lang]'>) {
 return (
  <div>
   <Hero />
   <div className='-mt-[calc(var(--website-hero-height)/2)] mb-4 px-2 md:px-4  w-[min(100%,var(--website-container-max-width))] mx-auto'>
    <ReservePicker />
   </div>
   {children}
  </div>
 );
}
