import MobileNav from './components/mobile-nav/MobileNav';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import ShareDictionaryProvider from './services/share-dictionary/ShareDictionaryProvider';
import { getShareDictionary } from '@/internalization/app/dictionaries/website/share/dictionary';
import { getMetaDictionary } from '@/internalization/app/dictionaries/meta/dictionary';
import { Locale } from '@/internalization/app/localization';

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
   <div className='h-svh bg-neutral-100 dark:bg-neutral-900'>
    <Header />
    {children}
    <MobileNav />
    <Footer />
   </div>
  </ShareDictionaryProvider>
 );
}
