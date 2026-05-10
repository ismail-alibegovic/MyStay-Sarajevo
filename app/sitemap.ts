import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'
import { getAllArticles } from '@/lib/mdx'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://mystaysarajevo.ba'
  
  // Get all accommodations
  const accommodations = await prisma.accommodation.findMany({
    select: { slug: true, updatedAt: true }
  })
  
  // Get all articles
  const articles = getAllArticles()
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/vodic`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/o-nama`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/kontakt`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/politika-privatnosti`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ]
  
  // Accommodation pages
  const accommodationPages = accommodations.map((acc) => ({
    url: `${baseUrl}/smjestaj/${acc.slug}`,
    lastModified: acc.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))
  
  // Article pages
  const articlePages = articles.map((article) => ({
    url: `${baseUrl}/vodic/${article.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))
  
  return [...staticPages, ...accommodationPages, ...articlePages]
}
