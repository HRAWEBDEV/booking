'use client';

import { useState, ReactNode } from 'react';
import { ReserveHotelContext } from './ReserveHotelContext';
import { useMediaQuery } from '@/services/base-config/hooks/useMediaQuery';
import {
 Drawer,
 DrawerContent,
 DrawerHeader,
 DrawerTitle,
} from '@/components/ui/drawer';
import {
 Dialog,
 DialogContent,
 DialogHeader,
 DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ReserveProviderProps {
 children: ReactNode;
}

export default function ReserveProvider({ children }: ReserveProviderProps) {
 const [isOpen, setIsOpen] = useState(false);
 const isDesktop = useMediaQuery('(min-width: 768px)');

 return (
  <ReserveHotelContext.Provider value={{ isOpen, setIsOpen }}>
   {children}

   {isDesktop ? (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
     <DialogContent className='w-full p-4'>
      <DialogHeader>
       <DialogTitle className='dark:text-gray-300 text-gray-700'>
        پیگیری رزرو
       </DialogTitle>
      </DialogHeader>
      <div className='flex flex-col gap-4'>
       <Input
        type='text'
        placeholder='کد پیگیری رزرو'
        className='text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:border-primary!'
       />
       <Input
        type='number'
        placeholder='شماره تماس'
        className='text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:border-primary!'
       />
       <div className='flex items-center gap-4'>
        <Button className='flex-1' variant='destructive'>
         انصراف
        </Button>
        <Button className='flex-1'>تایید</Button>
       </div>
      </div>
     </DialogContent>
    </Dialog>
   ) : (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
     <DrawerContent className='p-4 [&_div.bg-muted]:bg-primary!'>
      <DrawerHeader className='text-right px-0'>
       <DrawerTitle className='dark:text-gray-300 text-gray-700'>
        پیگیری رزرو
       </DrawerTitle>
      </DrawerHeader>
      <div className='flex flex-col gap-4'>
       <Input
        type='text'
        placeholder='کد پیگیری رزرو'
        className='text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:border-primary!'
       />
       <Input
        type='number'
        placeholder='شماره تماس'
        className='text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:border-primary!'
       />
       <div className='flex items-center gap-4'>
        <Button className='flex-1' variant='destructive'>
         انصراف
        </Button>
        <Button className='flex-1'>تایید</Button>
       </div>
      </div>
     </DrawerContent>
    </Drawer>
   )}
  </ReserveHotelContext.Provider>
 );
}
