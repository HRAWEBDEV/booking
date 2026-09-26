import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function HeaderProfile() {
 return (
  <Button variant='ghost' size='icon' className='h-auto w-auto ms-4'>
   <Avatar className='size-12'>
    <AvatarFallback className='size-12'>U</AvatarFallback>
   </Avatar>
  </Button>
 );
}
