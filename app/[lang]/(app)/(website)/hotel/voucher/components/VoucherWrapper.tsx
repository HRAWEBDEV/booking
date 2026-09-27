'use client';
import { useEffect } from 'react';
import { clearLocalReserveInfo } from '../../find-hotel/[hotelID]/utils/localReserveInfoManager';
import { type ReserveVoucherDictionary } from '@/internalization/app/dictionaries/website/hotel/voucher/dictionary';
import FailedReserve from './FailedReserve';
import ConfirmedVoucher from './ConfirmedVoucher';
import {
 type BookReserveInfo,
 type BookReserveError,
} from '../../services/reserveApiActions';
import { VoucherErrorCodes } from '../utils/voucherErrorCodes';
import ProcessingVoucherAlert from './ProcessingVoucherAlert';

export default function VoucherWrapper({
 dic,
 bookReserveInfo,
 trackingCode,
 bookReserveError,
}: {
 dic: ReserveVoucherDictionary;
 bookReserveInfo: BookReserveInfo | null;
 bookReserveError: BookReserveError | null;
 trackingCode: string;
}) {
 useEffect(() => {
  clearLocalReserveInfo();
 }, []);

 if (bookReserveError && 'errorInfo' in bookReserveError) {
  if (bookReserveError.errorInfo.code === VoucherErrorCodes.processingReserve) {
   return (
    <ProcessingVoucherAlert
     dic={dic}
     trackingCode={(trackingCode as string) || ''}
    />
   );
  }
 }

 return (
  <>
   {bookReserveInfo && bookReserveInfo.success ? (
    <ConfirmedVoucher dic={dic} bookReserveInfo={bookReserveInfo} />
   ) : (
    <FailedReserve
     dic={dic}
     bookReserveInfo={bookReserveInfo}
     trackingCode={trackingCode}
    />
   )}
  </>
 );
}
