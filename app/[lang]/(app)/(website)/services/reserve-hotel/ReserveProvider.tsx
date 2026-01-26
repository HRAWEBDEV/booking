'use client';

import { useState, ReactNode } from 'react';
import { ReserveHotelContext } from './ReserveHotelContext';
import { useMediaQuery } from '@/services/base-config/hooks/useMediaQuery'; // Adjust path as needed
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
 DialogDescription,
} from '@/components/ui/dialog';

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
     <DialogContent>
      <DialogHeader>
       <DialogTitle>Reserve Hotel</DialogTitle>
       <DialogDescription>Desktop view description.</DialogDescription>
      </DialogHeader>
     </DialogContent>
    </Dialog>
   ) : (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
     <DrawerContent>
      <DrawerHeader className='text-center'>
       <DrawerTitle>Reserve Hotel</DrawerTitle>
      </DrawerHeader>
     </DrawerContent>
    </Drawer>
   )}
  </ReserveHotelContext.Provider>
 );
}
