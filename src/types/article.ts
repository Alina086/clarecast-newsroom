export interface Article {
  company_ticker: string;
  company_name: string;
  url: string;
  title: string;
  author: string;
  date_published: string;
  word_count: number;
  text: string;
  headcount_change_confidence: string;
  explicit_headcount_change_ind: string;
  headcount_change_amount: number | null;
  months_to_headcount_change_completion: number | null;
}

export interface Company {
  ticker: string;
  name: string;
}
