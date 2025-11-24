## Overview
**Problem**: Tracking hiring trends and headcount changes across multiple companies from news sources is time-consuming and scattered.

**Solution**: Centralized news feed with smart filtering to quickly identify companies with hiring/layoff activity.

**Impact**: Reduces research time from hours to minutes for competitive intelligence and market analysis.

## Development Setup

### Prerequisites

- [Node.js 20+](https://nodejs.org/en/download) installed

### Installation & Running

1. Clone the repository
   ```bash
   git clone <repo-url>
   cd clarecast-newsroom
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Technical Overview

### Architecture
- **Frontend**: Next.js 16 (React) with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Data**: Client-side CSV parsing (PapaParse)

### Why These Choices?
- **Next.js**: Production-ready framework with excellent developer experience
- **TypeScript**: Type safety reduces bugs, improves maintainability
- **shadcn/ui**: Accessible, customizable components without vendor lock-in
- **CSV data**: Lightweight prototype approach, easily replaceable with API/database

### Project Structure
```
src/
├── app/
│   ├── page.tsx          # Main application logic & state management
│   ├── layout.tsx        # Root layout with theme provider
│   └── globals.css       # Theme variables & Tailwind imports
├── components/
│   ├── ui/              # shadcn/ui base components
│   └── *.tsx            # Feature components
├── lib/
│   └── data.ts          # Data loading & filtering logic
└── types/
    └── article.ts       # TypeScript interfaces

public/
└── data/                # CSV data files
```

### Current Features
1. Multi-select company filtering with type-ahead search
2. Headcount impact filter toggle
3. Article detail modal
4. Real-time filter counts
5. Dark mode

### Notes
**Data**: The dataset contains null values for some fields (headcount amount, author names and others).

### Future Work
- Add pagination instead of endless scroll for better user experience and performance with large datasets
- Include additional filters (date range, author, title, article source, etc.)
- Highlight key headcount-related points from detailed article view for easier scanning








