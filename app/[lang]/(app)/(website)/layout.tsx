import MobileNav from './components/mobile-nav/MobileNav';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import ShareDictionaryProvider from './services/share-dictionary/ShareDictionaryProvider';
import { getShareDictionary } from '@/internalization/app/dictionaries/website/share/dictionary';
import { getMetaDictionary } from '@/internalization/app/dictionaries/meta/dictionary';
import { Locale } from '@/internalization/app/localization';
import AxiosCredentialsInterceptor from './services/axios-credentials/AxiosCredentialsInterceptor';
import { Toaster } from 'sonner';
import TrackReserveProvider from './services/reserve-hotel/TrackReserveProvider';
import 'leaflet/dist/leaflet.css';

export default async function WebsiteLayout({
 children,
 params,
}: LayoutProps<'/[lang]'>) {
 const { lang } = await params;
 const metaDic = await getMetaDictionary({
  locale: lang as Locale,
 });
 const shareDic = await getShareDictionary({
  locale: lang as Locale,
 });
 return (
  <ShareDictionaryProvider metaDictionary={metaDic} shareDictionary={shareDic}>
   <AxiosCredentialsInterceptor />
   <div>
    <TrackReserveProvider>
     <Header />
     {children}
     <MobileNav />
    </TrackReserveProvider>
    <Footer />
   </div>
   <Toaster
    className='font-[inherit]!'
    position='top-center'
    richColors
    closeButton
   />
  </ShareDictionaryProvider>
 );
}
