import { MetadataRoute } from 'next'
import { posts } from '@/lib/posts'
import { learningPaths } from '@/lib/learning'
 
export default function sitemap(): MetadataRoute.Sitemap {
  // Update this to your actual production domain
  const baseUrl = 'https://theoddone.com'

  const staticRoutes = [
    '',
    '/mission',
    '/community',
    '/blogs',
    '/learn',
    '/login'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  const blogRoutes = posts.map((post) => ({
    url: `${baseUrl}/blogs/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const learnRoutes = learningPaths.map((path) => ({
    url: `${baseUrl}/learn/${path.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...blogRoutes, ...learnRoutes]
}
