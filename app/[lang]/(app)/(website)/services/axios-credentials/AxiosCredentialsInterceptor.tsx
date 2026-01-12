'use client';
import { useEffect } from 'react';
import { axios } from '../../../utils/defaultAxios';

export default function AxiosCredentialsInterceptor() {
 useEffect(() => {
  const requestInterceptor = axios.interceptors.request.use((config) => {
   config.headers.set('x-token', process.env.NEXT_PUBLIC_X_AUTH);
   return config;
  });
  return () => {
   axios.interceptors.request.eject(requestInterceptor);
  };
 }, []);
 return <></>;
}
