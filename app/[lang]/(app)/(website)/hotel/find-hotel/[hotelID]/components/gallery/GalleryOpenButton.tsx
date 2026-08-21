'use client';
import { Button } from '@/components/ui/button';
import { GrGallery } from 'react-icons/gr';

export default function GalleryOpenButton({
 label,
 count,
 onClick,
 onPreload,
}: {
 label: string;
 count?: string;
 onClick: () => unknown;
 onPreload: () => unknown;
}) {
 return (
  <Button
   type='button'
   variant='ghost'
   size='sm'
   onClick={onClick}
   onPointerEnter={onPreload}
   onFocus={onPreload}
   className='h-8 gap-1.5 rounded-full bg-background/85 px-3 text-xs font-medium text-foreground shadow-sm backdrop-blur-sm hover:bg-background hover:text-foreground'
  >
   <GrGallery className='size-4 text-primary' />
   <span>{count ? `${label} (${count})` : label}</span>
  </Button>
 );
}
