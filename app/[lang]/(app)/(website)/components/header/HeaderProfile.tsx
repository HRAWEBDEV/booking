import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function HeaderProfile() {
 return (
  <Button variant='ghost' size='icon' className='h-auto w-auto'>
   <Avatar className='size-12'>
    <AvatarFallback className='size-12'>H</AvatarFallback>
   </Avatar>
  </Button>
 );
}
