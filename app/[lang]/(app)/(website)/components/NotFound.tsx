'use client';
import { useShareDictionary } from '../services/share-dictionary/shareDictionaryContext';
import { Button } from '@/components/ui/button';
import { useGoHome } from '../hooks/useGoHome';
import { useRouter } from 'next/navigation';

export default function NotFound() {
 const router = useRouter();
 const { goHome } = useGoHome();
 const {
  shareDictionary: { component },
 } = useShareDictionary();
 return (
  <div className='w-[min(100%,30rem)] mx-auto border bg-primary/10 border-primary p-4 py-8 rounded-md flex flex-col items-center'>
   <div className='mx-auto text-primary mb-6'>
    <h2 className='text-9xl text-center'>404</h2>
    <p className='text-center text-2xl font-medium'>
     {component.notFound.noItemFound}
    </p>
   </div>
   <div className='flex gap-4'>
    <Button
     size='lg'
     className='md:w-44 font-medium text-base'
     variant='outline'
     onClick={() => router.refresh()}
    >
     {component.notFound.tryAgain}
    </Button>
    <Button
     size='lg'
     className='md:w-44 font-medium text-base'
     onClick={() => goHome()}
    >
     {component.notFound.goHome}
    </Button>
   </div>
  </div>
 );
}
