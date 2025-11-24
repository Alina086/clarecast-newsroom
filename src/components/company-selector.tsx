'use client'

import { useState } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Company } from '@/types/article'

interface CompanySelectorProps {
  companies: Company[]
  selectedTickers: string[]
  onSelectionChange: (tickers: string[]) => void
}

export function CompanySelector({
  companies,
  selectedTickers,
  onSelectionChange,
}: CompanySelectorProps) {
  const [open, setOpen] = useState(false)

  // Toggle a company selection
  const toggleCompany = (ticker: string) => {
    const newSelection = selectedTickers.includes(ticker)
      ? selectedTickers.filter(t => t !== ticker)
      : [...selectedTickers, ticker]

    onSelectionChange(newSelection)
  }

  // Get display text for the button
  const getButtonText = () => {
    if (selectedTickers.length === 0) {
      return 'Select companies...'
    }
    if (selectedTickers.length === 1) {
      const company = companies.find(c => c.ticker === selectedTickers[0])
      return company?.name || 'Unknown'
    }
    return `${selectedTickers.length} companies selected`
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {getButtonText()}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search companies..." />
          <CommandList>
            <CommandEmpty>No company found.</CommandEmpty>
            <CommandGroup>
              {companies.map((company) => {
                const isSelected = selectedTickers.includes(company.ticker)
                return (
                  <CommandItem
                    key={company.ticker}
                    value={`${company.name} ${company.ticker}`}
                    onSelect={() => toggleCompany(company.ticker)}
                  >
                    <div className={cn(
                      'mr-2 h-4 w-4 border-2 rounded flex items-center justify-center shrink-0',
                      isSelected ? 'bg-primary border-primary' : 'border-muted-foreground/30 bg-background'
                    )}>
                      <Check
                        className={cn(
                          'h-3 w-3 text-primary-foreground',
                          isSelected ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                    </div>
                    <div className="flex flex-col">
                      <span>{company.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {company.ticker}
                      </span>
                    </div>
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
