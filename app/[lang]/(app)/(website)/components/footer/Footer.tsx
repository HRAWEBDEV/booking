export default function Footer() {
 return (
  <footer className='min-h-24 bg-neutral-200 dark:bg-neutral-800 p-4 pb-[calc(var(--website-mobile-nav-height)*5)] lg:pb-4'>
   <div className='w-[min(100%,var(--website-container-max-width))] mx-auto'>
    <div className='flex justify-end'>
     <a
      className='size-28'
      target='_blank'
      href={
       'https://trustseal.enamad.ir/?id=690246&Code=RY1LetjZRJ0stnxZfW88jXpYCEJbLtwj'
      }
     >
      <img
       referrerPolicy={'origin'}
       src={
        'https://trustseal.enamad.ir/logo.aspx?id=690246&Code=RY1LetjZRJ0stnxZfW88jXpYCEJbLtwj'
       }
       alt=''
       style={{ cursor: 'pointer' }}
       // @ts-expect-error
       code='RY1LetjZRJ0stnxZfW88jXpYCEJbLtwj'
      />
     </a>
    </div>
   </div>
  </footer>
 );
}
