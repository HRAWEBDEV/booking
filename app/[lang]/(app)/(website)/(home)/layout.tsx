import Hero from '../components/hero/Hero';
import ReservePicker from '../components/reserve-picker/ReservePicker';

export default function HomeLayout({ children }: LayoutProps<'/[lang]'>) {
 return (
  <div>
   <Hero />
   {children}
  </div>
 );
}
