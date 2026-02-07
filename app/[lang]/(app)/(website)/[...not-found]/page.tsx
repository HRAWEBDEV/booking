import NotFound from '../components/NotFound';

export default function page() {
 return (
  <div className='min-h-[calc(60svh-var(--website-header-height))] flex flex-col justify-center p-4 py-8'>
   <NotFound />
  </div>
 );
}
