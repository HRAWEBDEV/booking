import { Spinner } from '@/components/ui/spinner';
export default function Loading() {
 return (
  <div className='fixed z-1000 inset-0 bg-background/50 grid place-content-center'>
   <Spinner className='size-16 text-primary' />
  </div>
 );
}
