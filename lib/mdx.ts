import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDirectory = path.join(process.cwd(), 'content/vodic')

export interface Article {
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  coverImage: string
  date: string
  readTime: string
  author: string
  featured?: boolean
}

export function getAllArticles(): Article[] {
  const files = fs.readdirSync(contentDirectory)
  
  const articles = files
    .filter(file => file.endsWith('.mdx'))
    .map(file => {
      const filePath = path.join(contentDirectory, file)
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      const { data, content } = matter(fileContent)
      
      const wordCount = content.split(/\s+/).length
      const readTime = Math.ceil(wordCount / 200) // ~200 words per minute
      
      return {
        slug: file.replace('.mdx', ''),
        title: data.title,
        excerpt: data.excerpt,
        content,
        category: data.category,
        coverImage: data.coverImage,
        date: data.date,
        readTime: `${readTime} min čitanja`,
        author: data.author || 'MyStay Sarajevo tim',
        featured: data.featured || false,
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  
  return articles
}

export function getArticleBySlug(slug: string): Article | null {
  const filePath = path.join(contentDirectory, `${slug}.mdx`)
  
  if (!fs.existsSync(filePath)) {
    return null
  }
  
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(fileContent)
  
  const wordCount = content.split(/\s+/).length
  const readTime = Math.ceil(wordCount / 200)
  
  return {
    slug,
    title: data.title,
    excerpt: data.excerpt,
    content,
    category: data.category,
    coverImage: data.coverImage,
    date: data.date,
    readTime: `${readTime} min čitanja`,
    author: data.author || 'MyStay Sarajevo tim',
    featured: data.featured || false,
  }
}

export function getArticlesByCategory(category: string): Article[] {
  return getAllArticles().filter(article => article.category === category)
}

export function getFeaturedArticles(): Article[] {
  return getAllArticles().filter(article => article.featured)
}

export function getRelatedArticles(currentSlug: string, limit: number = 3): Article[] {
  const articles = getAllArticles()
  const currentArticle = getArticleBySlug(currentSlug)
  
  if (!currentArticle) {
    return articles.slice(0, limit)
  }
  
  // Find articles in the same category
  const relatedByCategory = articles.filter(
    article => article.category === currentArticle.category && article.slug !== currentSlug
  )
  
  if (relatedByCategory.length >= limit) {
    return relatedByCategory.slice(0, limit)
  }
  
  // Fill with other articles if needed
  const otherArticles = articles.filter(
    article => article.slug !== currentSlug && !relatedByCategory.includes(article)
  )
  
  return [...relatedByCategory, ...otherArticles].slice(0, limit)
}
