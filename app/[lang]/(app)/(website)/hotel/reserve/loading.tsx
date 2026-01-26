import { Spinner } from '@/components/ui/spinner';
export default function Loading() {
 return (
  <div className='h-[calc(100svh-var(--website-header-height))] grid place-content-center'>
   <Spinner className='size-16 text-primary' />
  </div>
 );
}
