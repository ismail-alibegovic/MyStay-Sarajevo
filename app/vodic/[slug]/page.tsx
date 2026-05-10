import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getArticleBySlug, getAllArticles, getRelatedArticles } from '@/lib/mdx'
import { Clock, ArrowLeft, User, Calendar } from 'lucide-react'

// Generate static params
export async function generateStaticParams() {
  const articles = getAllArticles()
  return articles.map(article => ({
    slug: article.slug,
  }))
}

// Generate metadata
export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
  const article = getArticleBySlug(params.slug)
  
  if (!article) {
    return { title: 'Not Found' }
  }
  
  return {
    title: `${article.title} - MyStay Vodič`,
    description: article.excerpt,
    authors: [{ name: article.author }],
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.date,
      authors: [article.author],
      images: [
        {
          url: article.coverImage,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      locale: 'bs_BA',
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [article.coverImage],
    },
  }
}

// JSON-LD Article schema
function generateArticleJsonLd(article: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.coverImage,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      '@type': 'Organization',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'MyStay Sarajevo',
      logo: {
        '@type': 'ImageObject',
        url: 'https://mystaysarajevo.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://mystaysarajevo.com/vodic/${article.slug}`,
    },
  }
}

export default function ArticlePage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const article = getArticleBySlug(params.slug)
  
  if (!article) {
    notFound()
  }
  
  const relatedArticles = getRelatedArticles(params.slug, 3)

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateArticleJsonLd(article)),
        }}
      />

      <article className="min-h-screen bg-cream">
        {/* Hero */}
        <header className="relative h-[50vh] min-h-[400px]">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/40 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-12">
            <div className="max-w-4xl mx-auto">
              {/* Breadcrumb */}
              <nav className="mb-6">
                <ol className="flex items-center gap-2 text-xs text-white/60">
                  <li>
                    <Link href="/" className="hover:text-white transition-colors">
                      Početna
                    </Link>
                  </li>
                  <li>/</li>
                  <li>
                    <Link href="/vodic" className="hover:text-white transition-colors">
                      Vodič
                    </Link>
                  </li>
                  <li>/</li>
                  <li className="text-white">{article.title}</li>
                </ol>
              </nav>

              <span className="inline-block bg-luxury-gold text-white px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4">
                {article.category}
              </span>

              <h1 className="text-4xl lg:text-5xl font-serif text-white mb-6 leading-tight">
                {article.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-sm text-white/70">
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>
                    {new Date(article.date).toLocaleDateString('bs-BA', { 
                      day: 'numeric', 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>{article.readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-ink prose-p:text-ink/70 prose-a:text-luxury-gold prose-a:no-underline hover:prose-a:underline prose-strong:text-ink prose-ul:text-ink/70 prose-ol:text-ink/70">
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </div>

          {/* Affiliate Disclosure */}
          <div className="mt-12 p-6 bg-luxury-gold/5 rounded-2xl border border-luxury-gold/10">
            <p className="text-sm text-ink/60 text-center">
              <strong className="text-ink">Napomena:</strong> Neki linkovi su partnerski linkovi. Rezervacijom nam pomažete da održavamo ovaj sajt.
            </p>
          </div>

          {/* Author Byline */}
          <div className="mt-12 flex items-center gap-4 p-6 bg-white rounded-2xl border border-ink/5">
            <div className="w-16 h-16 bg-luxury-gold/10 rounded-full flex items-center justify-center">
              <User className="text-luxury-gold" size={24} />
            </div>
            <div>
              <p className="font-bold text-ink">{article.author}</p>
              <p className="text-sm text-ink/50">Lokalni stručnjak za Sarajevo smještaj i turizam</p>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 pb-24">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-serif text-ink">Slični članci</h2>
              <Link href="/vodic" className="text-sm text-luxury-gold hover:underline">
                Pogledaj sve →
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {relatedArticles.map((related) => (
                <Link
                  key={related.slug}
                  href={`/vodic/${related.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-ink/5 hover:border-luxury-gold/30 transition-all"
                >
                  <div className="relative aspect-video">
                    <Image
                      src={related.coverImage}
                      alt={related.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-5 space-y-2">
                    <h3 className="font-serif text-lg text-ink group-hover:text-luxury-gold transition-colors line-clamp-2">
                      {related.title}
                    </h3>
                    <p className="text-xs text-ink/40">{related.readTime}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Back to Guide */}
        <div className="max-w-4xl mx-auto px-6 pb-12">
          <Link
            href="/vodic"
            className="inline-flex items-center gap-2 text-sm text-ink/50 hover:text-luxury-gold transition-colors"
          >
            <ArrowLeft size={16} />
            Nazad na vodič
          </Link>
        </div>
      </article>
    </>
  )
}

// Revalidate every hour
export const revalidate = 3600
