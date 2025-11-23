'use client'

import { Article } from '@/types/article'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown, Calendar, User, FileText, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ArticleDetailModalProps {
  article: Article | null
  open: boolean
  onClose: () => void
}

export function ArticleDetailModal({ article, open, onClose }: ArticleDetailModalProps) {
  if (!article) return null

  const hasHeadcountChange = article.explicit_headcount_change_ind === true
  const headcountAmount = article.headcount_change_amount
  const isPositive = headcountAmount && headcountAmount > 0

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl pr-8">{article.title}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <span className="font-semibold text-foreground">{article.company_name}</span>
            <span>({article.company_ticker})</span>

            {article.author && (
              <span className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {article.author}
              </span>
            )}

            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(article.date_published).toLocaleDateString()}
            </span>

            <span className="flex items-center gap-1">
              <FileText className="w-4 h-4" />
              {article.word_count.toLocaleString()} words
            </span>
          </div>

          {hasHeadcountChange && headcountAmount !== null && (
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant={isPositive ? "outline" : "destructive"}
                className={cn(
                  "flex items-center gap-1",
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

              {article.months_to_headcount_change_completion !== null && (
                <span className="text-sm">
                  Timeline: {article.months_to_headcount_change_completion} month{article.months_to_headcount_change_completion !== 1 ? 's' : ''}
                </span>
              )}
            </div>
          )}
        </div>

        <div className="mt-6">
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <p className="whitespace-pre-wrap text-sm leading-relaxed">{article.text}</p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            Read original article
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </DialogContent>
    </Dialog>
  )
}
