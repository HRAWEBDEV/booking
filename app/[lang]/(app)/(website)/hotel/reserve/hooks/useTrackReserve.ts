import { useState, useRef } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
 getLockInfo,
 downloadReserveVoucher,
} from '../../services/reserveApiActions';
import { getHotelInfo } from '../../services/hotelApiActions';
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
    signal: signal!,
   });
  },
  onSuccess: () => {
   setIsOpen(false);
   setIsResultOpen(true);
  },
  onError: (err) => {
   setIsOpen(false);
   setIsResultOpen(true);
   console.error(`API Request Failed `, err);
  },
 });

 const res = trackData?.data;
 const hotelID = res?.lockInfo.hotelID;

 const { isLoading: isHotelInfoLoading, data: hotelInfoRes } = useQuery({
  queryKey: ['hotel-info', hotelID],
  queryFn: ({ signal }) =>
   getHotelInfo({
    signal,
    hotelID: String(hotelID),
   }),
  enabled: isResultOpen && !!hotelID,
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
    console.error(err);
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
    hotelID: String(hotelID),
    reserveID: String(res.lockInfo.pmsReserveID),
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
  hotelInfo: hotelInfoRes?.data,
  isHotelInfoLoading,
  handleTrackSubmit,
  handleReset,
  downloadVoucherAnchor,
  isDownloadVoucherPending,
  handleDownloadVoucher,
 };
};
