'use client'

import { Button } from '@/components/ui/button'
import { TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'

interface HeadcountFilterProps {
  enabled: boolean
  onToggle: () => void
}

export function HeadcountFilter({ enabled, onToggle }: HeadcountFilterProps) {
  return (
    <Button
      variant={enabled ? 'default' : 'outline'}
      onClick={onToggle}
      className={cn(
        'whitespace-nowrap',
        enabled && 'bg-primary text-primary-foreground'
      )}
    >
      <TrendingUp className="mr-2 h-4 w-4" />
      {enabled ? 'Headcount only' : 'Headcount filter'}
    </Button>
  )
}
