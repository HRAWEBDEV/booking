import React from 'react';
import SortDisplay from './SortDisplay';
import CardLayoutDisplay from './CardLayoutDisplay';
import { ShareDictionary } from '@/internalization/app/dictionaries/share/dictionary';

export default function DisplayFilters({ dic }: { dic: ShareDictionary }) {
 return (
  <div className='flex justify-between items-center'>
   <SortDisplay dic={dic} />
   <CardLayoutDisplay dic={dic} />
  </div>
 );
}
