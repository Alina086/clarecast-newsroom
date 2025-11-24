import { Article } from '@/types/article'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown, Calendar, User } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ArticleCardProps {
  article: Article
  onClick?: () => void
}

export function ArticleCard({ article, onClick }: ArticleCardProps) {
  // Format the date nicely
  const formattedDate = new Date(article.date_published).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })

  // Get snippet (first 200 chars of text)
  const snippet = article.text.slice(0, 200) + '...'

  // Check if there's headcount change
  const hasHeadcountChange = article.explicit_headcount_change_ind === true
  const headcountAmount = article.headcount_change_amount
  const isPositive = headcountAmount && headcountAmount > 0

  return (
    <Card
      className="cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick}
    >
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div className="flex-1">
            <CardTitle className="text-xl mb-2">{article.title}</CardTitle>
            <CardDescription className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formattedDate}
              </span>
              {article.author && (
                <span className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  {article.author}
                </span>
              )}
            </CardDescription>
          </div>

          {hasHeadcountChange && headcountAmount && (
            <Badge
              variant={isPositive ? "outline" : "destructive"}
              className={cn(
                "flex items-center gap-1 shrink-0",
                isPositive && "bg-green-100 text-green-800 border-green-300 dark:bg-green-950 dark:text-green-400 dark:border-green-800"
              )}
            >
              {isPositive ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {isPositive ? '+' : ''}{headcountAmount.toLocaleString()} staff
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground">{snippet}</p>

        {hasHeadcountChange && article.months_to_headcount_change_completion && (
          <p className="text-xs text-muted-foreground mt-2 italic">
            Over the next {article.months_to_headcount_change_completion} month{article.months_to_headcount_change_completion !== 1 ? 's' : ''}
          </p>
        )}

        <p className="text-xs font-medium text-primary mt-3">{article.company_name}</p>
      </CardContent>
    </Card>
  )
}
