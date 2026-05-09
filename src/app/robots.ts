import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  // Update this to your actual production domain
  const baseUrl = 'https://theoddone.com'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard'], // Usually don't want to index internal dashboards
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
