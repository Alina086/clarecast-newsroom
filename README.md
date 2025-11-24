## Clarecast Newsroom Prototype
A news article feed interface for tracking company hiring and headcount changes

### Prerequisites

- Node.js 20+ installed

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

## Prototype Design

### Tech Stack
- Next.js 16 with TypeScript
- shadcn/ui components
- CSV-based data loading with PapaParse

### Key Architectural Decisions
- Chose shadcn/ui library: Lightweight. No vendor lock-in. Fully customizable.
- Client side rendering: Fast prototype development without backend complexity.
- Mobile-first design

### Features
1. Multi-select filtering of companies with type-ahead
2. Headcount impact filter
3. Dark Mode
4. Article detail modal

## Notes
**Data**: The dataset contains null values for some fields (headcount amount, author names and others).




