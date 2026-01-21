import { Spinner } from '@/components/ui/spinner';
export default function Loading() {
 return (
  <div className='min-h-[calc(90svh-var(--website-header-height))] grid place-content-center'>
   <Spinner className='size-16 text-primary' />
  </div>
 );
}
