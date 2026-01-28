import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
 /* config options here */
 reactCompiler: true,
 typedRoutes: true,
 compiler: {
  removeConsole: process.env.NODE_ENV === 'production',
 },
};

export default nextConfig;
