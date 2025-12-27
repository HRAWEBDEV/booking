'use client';
import { useEffect } from 'react';
import { axios } from '../../utils/defaultAxios';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';

export default function AxoisBaseConfig() {
 const { locale } = useBaseConfig();
 useEffect(() => {
  const interceptorID = axios.interceptors.request.use((config) => {
   // multi language flag on herader
   config.headers.set('languageid', locale);
   return config;
  });
  return () => {
   axios.interceptors.request.eject(interceptorID);
  };
 }, [locale]);
 return <></>;
}
