'use client'

import { useEffect, useState } from 'react'
import { loadArticles, getUniqueCompanies, filterByCompanies, filterByHeadcountImpact, sortByDateDesc } from '@/lib/data'
import { Article } from '@/types/article'
import { ArticleCard } from '@/components/article-card'
import { CompanySelector } from '@/components/company-selector'
import { HeadcountFilter } from '@/components/headcount-filter'
import { ArticleDetailModal } from '@/components/article-detail-modal'
import { ThemeToggle } from '@/components/theme-toggle'
import { Badge } from '@/components/ui/badge'
import { X } from 'lucide-react'

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
      <div className="max-w-6xl mx-auto">
        {/* Header and Filters section - sticky */}
        <div className="sticky top-0 z-10 bg-background pt-4 pb-6 mb-2">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold">Clarecast Newsroom</h1>
            <ThemeToggle />
          </div>
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

        {/* Selected Companies Display */}
        {selectedCompanies.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
            {selectedCompanies.map(ticker => {
              const company = companies.find(c => c.ticker === ticker)
              return (
                <Badge
                  key={ticker}
                  variant="secondary"
                  className="pl-3 pr-2 py-1.5 flex items-center gap-2"
                >
                  <span>{company?.name}</span>
                  <button
                    onClick={() => setSelectedCompanies(prev => prev.filter(t => t !== ticker))}
                    className="hover:bg-muted-foreground/20 rounded-full p-0.5 transition-colors"
                    aria-label={`Remove ${company?.name}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )
            })}
          </div>
        )}

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