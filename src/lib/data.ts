import Papa from 'papaparse';
import { Article, Company } from '@/types/article';

/**
 * Loads and parses the CSV data
 * Since this is client-side only, we'll fetch from the public folder
 */
export async function loadArticles(): Promise<Article[]> {
  const response = await fetch('/data/takehome_assignment_data.csv');
  const csvText = await response.text();

  const result = Papa.parse<Article>(csvText, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
  });

  return result.data;
}

/**
 * Extracts unique companies from articles
 */
export function getUniqueCompanies(articles: Article[]): Company[] {
  const companiesMap = new Map<string, Company>();

  articles.forEach(article => {
    if (!companiesMap.has(article.company_ticker)) {
      companiesMap.set(article.company_ticker, {
        ticker: article.company_ticker,
        name: article.company_name,
      });
    }
  });

  return Array.from(companiesMap.values()).sort((a, b) =>
    a.name.localeCompare(b.name)
  );
}

/**
 * Filters articles by selected companies
 */
export function filterByCompanies(
  articles: Article[],
  selectedTickers: string[]
): Article[] {
  if (selectedTickers.length === 0) return articles;
  return articles.filter(article =>
    selectedTickers.includes(article.company_ticker)
  );
}

/**
 * Filters articles to only show those with explicit headcount changes
 */
export function filterByHeadcountImpact(articles: Article[]): Article[] {
  return articles.filter(article =>
    article.explicit_headcount_change_ind === 'Y'
  );
}

/**
 * Sorts articles by date (newest first)
 */
export function sortByDateDesc(articles: Article[]): Article[] {
  return [...articles].sort((a, b) =>
    new Date(b.date_published).getTime() - new Date(a.date_published).getTime()
  );
}
