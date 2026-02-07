'use client';
import { useShareDictionary } from './services/share-dictionary/shareDictionaryContext';
import { Button } from '@/components/ui/button';
import { BiSolidError } from 'react-icons/bi';
import { useGoHome } from './hooks/useGoHome';

export default function WebsiteLayoutError(error: Error, reset: () => unknown) {
 const { goHome } = useGoHome();
 const {
  shareDictionary: { component },
 } = useShareDictionary();
 return (
  <div className='min-h-[calc(60svh-var(--website-header-height))] flex flex-col justify-center p-4 py-8'>
   <div className='w-[min(100%,30rem)] mx-auto border bg-destructive/10 border-destructive py-8 rounded-md flex flex-col items-center'>
    <div className='mx-auto text-destructive mb-6 flex flex-col items-center'>
     <BiSolidError className='text-9xl text-center' />
     <p className='text-center text-2xl font-medium'>
      {component.errorPage.errorHappened}.
     </p>
    </div>
    <div className='flex gap-4'>
     <Button
      size='lg'
      className='md:w-44 font-medium text-base'
      variant='outline'
      onClick={reset}
     >
      {component.errorPage.tryAgain}
     </Button>
     <Button
      variant='destructive'
      size='lg'
      className='md:w-44 font-medium text-base'
      onClick={() => goHome()}
     >
      {component.errorPage.goHome}
     </Button>
    </div>
   </div>
  </div>
 );
}
