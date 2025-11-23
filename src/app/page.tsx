'use client'

import { useEffect, useState } from 'react'
import { loadArticles, getUniqueCompanies, filterByCompanies, filterByHeadcountImpact, sortByDateDesc } from '@/lib/data'
import { Article } from '@/types/article'
import { ArticleCard } from '@/components/article-card'
import { CompanySelector } from '@/components/company-selector'
import { HeadcountFilter } from '@/components/headcount-filter'
import { ArticleDetailModal } from '@/components/article-detail-modal'

export default function Home() {
  // State to store our articles
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([])
  const [headcountFilterEnabled, setHeadcountFilterEnabled] = useState(false)
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)

  // Load articles when page loads
  useEffect(() => {
    loadArticles().then(data => {
      setArticles(data)
      setLoading(false)
    })
  }, [])

  // Get unique companies from articles
  const companies = getUniqueCompanies(articles)

  // Filter articles based on selected companies and headcount filter
  let filteredArticles = articles

  // Apply company filter
  if (selectedCompanies.length > 0) {
    filteredArticles = filterByCompanies(filteredArticles, selectedCompanies)
  }

  // Apply headcount filter
  if (headcountFilterEnabled) {
    filteredArticles = filterByHeadcountImpact(filteredArticles)
  }

  // Sort by date (newest first)
  filteredArticles = sortByDateDesc(filteredArticles)

  // Show loading message
  if (loading) {
    return <div>Loading articles...</div>
  }

  // Show the articles
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header and Filters section - sticky */}
        <div className="sticky top-0 z-10 bg-background pb-6 mb-2">
          <h1 className="text-3xl font-bold mb-2">Clarecast Newsroom</h1>
          <p className="text-muted-foreground mb-6">
            {selectedCompanies.length > 0 || headcountFilterEnabled
              ? `Showing ${filteredArticles.length} of ${articles.length} articles`
              : `Found ${articles.length} articles`
            }
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <CompanySelector
                companies={companies}
                selectedTickers={selectedCompanies}
                onSelectionChange={setSelectedCompanies}
              />
            </div>
            <HeadcountFilter
              enabled={headcountFilterEnabled}
              onToggle={() => setHeadcountFilterEnabled(!headcountFilterEnabled)}
            />
          </div>
        </div>

        {/* Articles feed */}
        <div className="flex flex-col gap-4">
          {filteredArticles.map(article => (
            <ArticleCard
              key={article.url}
              article={article}
              onClick={() => setSelectedArticle(article)}
            />
          ))}
        </div>

        {/* Article Detail Modal */}
        <ArticleDetailModal
          article={selectedArticle}
          open={selectedArticle !== null}
          onClose={() => setSelectedArticle(null)}
        />
      </div>
    </div>
  )
}