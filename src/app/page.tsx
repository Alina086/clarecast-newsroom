'use client'

import { useEffect, useState } from 'react'
import { loadArticles } from '@/lib/data'
import { Article } from '@/types/article'
import { ArticleCard } from '@/components/article-card'

export default function Home() {
  // State to store our articles
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  // Load articles when page loads
  useEffect(() => {
    loadArticles().then(data => {
      setArticles(data)
      setLoading(false)
    })
  }, [])

  // Show loading message
  if (loading) {
    return <div>Loading articles...</div>
  }

  // Show the articles
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Clarecast Newsroom</h1>
        <p className="text-muted-foreground mb-6">Found {articles.length} articles</p>

        <div className="flex flex-col gap-4">
          {articles.map(article => (
            <ArticleCard key={article.url} article={article} />
          ))}
        </div>
      </div>
    </div>
  )
}