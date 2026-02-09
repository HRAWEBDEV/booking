import { useState, useRef } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
 getLockInfo,
 downloadReserveVoucher,
} from '../../services/reserveApiActions';
import { getHotelInfoApi, getHotelInfo } from '../../services/hotelApiActions';
import { getSetupProviderCredentials } from '@/app/[lang]/(app)/(website)/utils/getSetupProviderCredentials';

export type ReserveStatus = 'failed' | 'pending' | 'success';

export const useTrackReserve = () => {
 const [isOpen, setIsOpen] = useState(false);
 const [isResultOpen, setIsResultOpen] = useState(false);
 const downloadVoucherAnchor = useRef<HTMLAnchorElement>(null);
 const { channelID } = getSetupProviderCredentials();

 const {
  mutate: trackReserve,
  data: trackData,
  isError: isTrackError,
  reset: resetTrack,
  isPending: reserveTrackIsPending,
 } = useMutation({
  mutationFn: ({
   trackingCode,
   signal,
  }: {
   trackingCode: string;
   signal?: AbortSignal;
  }) => {
   return getLockInfo({
    trackingCode: trackingCode,
    signal: signal,
   });
  },
  onSuccess: () => {
   setIsOpen(false);
   setIsResultOpen(true);
  },
  onError: (err) => {
   setIsOpen(false);
   setIsResultOpen(true);
   console.error('track reserve failed ', err);
  },
 });

 const res = trackData?.data;
 const hotelID = res?.lockInfo.hotelID;

 const { isLoading: isHotelInfoLoading, data: hotelInfoRes } = useQuery({
  staleTime: 'static',
  enabled: isResultOpen && !!hotelID,
  queryKey: [getHotelInfoApi, hotelID?.toString(), channelID.toString()],
  queryFn: async ({ signal }) => {
   const res = await getHotelInfo({
    signal,
    hotelID: hotelID!.toString(),
   });
   return res.data;
  },
 });

 const { mutate: downloadVoucher, isPending: isDownloadVoucherPending } =
  useMutation({
   mutationFn: ({
    reserveID,
    channelID,
    hotelID,
   }: {
    reserveID: string;
    channelID: string;
    hotelID: string;
   }) => {
    return downloadReserveVoucher({
     reserveID,
     channelID,
     hotelID,
    });
   },
   onSuccess: async (data) => {
    const reportFile = new Blob([data.data], { type: 'application/pdf' });
    const reportFileUrl = URL.createObjectURL(reportFile);
    if (downloadVoucherAnchor.current) {
     downloadVoucherAnchor.current.href = reportFileUrl;
     downloadVoucherAnchor.current.click();
    }
    window.open(reportFileUrl);
   },
   onError: (err) => {
    // toast.error(trackReserveDic.somethingWentWrongTryAgain);
    console.error('download voucher failed: ', err);
   },
  });

 const reserveStatus: ReserveStatus = (() => {
  if (isTrackError) return 'failed';
  if (trackData?.data.isBooked === false) return 'pending';
  return trackData?.data.isBooked ? 'success' : 'failed';
 })();

 const handleTrackSubmit = (trackingCode: string) => {
  trackReserve({ trackingCode });
 };

 const handleReset = () => {
  resetTrack();
  setIsOpen(false);
 };

 const handleDownloadVoucher = () => {
  if (hotelID && res?.lockInfo.pmsReserveID) {
   downloadVoucher({
    channelID,
    hotelID: hotelID.toString(),
    reserveID: res.lockInfo.pmsReserveID.toString(),
   });
  }
 };

 return {
  isOpen,
  setIsOpen,
  isResultOpen,
  setIsResultOpen,
  reserveStatus,
  trackData: res,
  hotelInfo: hotelInfoRes,
  isHotelInfoLoading,
  handleTrackSubmit,
  handleReset,
  downloadVoucherAnchor,
  isDownloadVoucherPending,
  handleDownloadVoucher,
  reserveTrackIsPending,
 };
};
