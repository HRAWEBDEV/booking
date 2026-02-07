import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
 const baseUrl =
  process.env.NEXT_PUBLIC_MODE === 'PRODUCTION'
   ? process.env.NEXT_PUBLIC_BASE_URL
   : 'http://localhost:3000';

 return [
  {
   url: `${baseUrl}/fa`,
   lastModified: new Date(),
   changeFrequency: 'daily',
   priority: 1,
  },
  {
   url: `${baseUrl}/en`,
   lastModified: new Date(),
   changeFrequency: 'daily',
   priority: 1,
  },
 ];
}
