export type PageId =
  | 'home'
  | 'news'
  | 'scores'
  | 'shop'
  | 'podcasts'
  | 'about'
  | 'advertise'
  | 'contact';

export interface LiveMatch {
  id: string;
  home: string;
  away: string;
  homeScore: number;
  awayScore: number;
  minute: string;
  league: string;
}

export interface ScheduledMatch {
  id: string;
  home: string;
  away: string;
  time: string;
  league: string;
  status: 'live' | 'fixture' | 'result';
  homeScore?: number;
  awayScore?: number;
  minute?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  compareAt?: number;
  tag?: string;
  category: 'jersey' | 'hoodie' | 'cap' | 'accessories';
  club: string;
  colors: string[];
  description: string;
  sizes: string[];
  image: string;
  gallery: string[];
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  body: string;
  category: 'Interview' | 'Match Analysis' | 'Preview' | 'Review' | 'Naija Fans' | 'Feature';
  time: string;
  readMins: number;
  author: string;
  authorRole: string;
  featured?: boolean;
  image: string;
}

export interface PodcastEpisode {
  id: string;
  title: string;
  show: string;
  duration: string;
  time: string;
  description: string;
  image: string;
}

/** High-quality production images (Unsplash) — studio, pitch, and product-style */
export const IMAGES = {
  heroStudio:
    'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1600&q=85',
  heroAlt:
    'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=1600&q=85',
  interview:
    'https://images.unsplash.com/photo-1516280440614-6697288d5d38?auto=format&fit=crop&w=1200&q=85',
  analysis:
    'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=85',
  naijaFans:
    'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1200&q=85',
  preview:
    'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=1200&q=85',
  review:
    'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=85',
  feature:
    'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1200&q=85',
  podcast:
    'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=800&q=85',
  about:
    'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=1200&q=85',
  jerseyGreen:
    'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&w=800&q=85',
  jerseyRed:
    'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=800&q=85',
  jerseyBlue:
    'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=85',
  jerseySky:
    'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=800&q=85',
  jerseyWhite:
    'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=85',
  jerseyYellow:
    'https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=800&q=85',
  hoodie:
    'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=85',
  cap:
    'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=85',
  scarf:
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=85',
  jerseyGreen2:
    'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=800&q=85',
  jerseyRed2:
    'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=85',
};

export const LIVE_TICKER: LiveMatch[] = [
  { id: '1', home: 'ARS', away: 'CHE', homeScore: 2, awayScore: 1, minute: "78'", league: 'EPL' },
  { id: '2', home: 'RMA', away: 'BAR', homeScore: 1, awayScore: 1, minute: "64'", league: 'La Liga' },
  { id: '3', home: 'MCI', away: 'LIV', homeScore: 0, awayScore: 0, minute: "23'", league: 'EPL' },
  { id: '4', home: 'NGA', away: 'GHA', homeScore: 1, awayScore: 0, minute: "55'", league: 'AFCON Q' },
  { id: '5', home: 'PSG', away: 'OM', homeScore: 2, awayScore: 0, minute: "55'", league: 'Ligue 1' },
  { id: '6', home: 'INT', away: 'MIL', homeScore: 1, awayScore: 0, minute: "39'", league: 'Serie A' },
];

export const ALL_MATCHES: ScheduledMatch[] = [
  { id: 'm1', home: 'Arsenal', away: 'Chelsea', time: "78'", league: 'Premier League', status: 'live', homeScore: 2, awayScore: 1, minute: "78'" },
  { id: 'm2', home: 'Man City', away: 'Liverpool', time: "23'", league: 'Premier League', status: 'live', homeScore: 0, awayScore: 0, minute: "23'" },
  { id: 'm3', home: 'Nigeria', away: 'Ghana', time: "55'", league: 'AFCON Qualifiers', status: 'live', homeScore: 1, awayScore: 0, minute: "55'" },
  { id: 'm4', home: 'Real Madrid', away: 'Barcelona', time: "64'", league: 'La Liga', status: 'live', homeScore: 1, awayScore: 1, minute: "64'" },
  { id: 'm5', home: 'Tottenham', away: 'Newcastle', time: '17:30', league: 'Premier League', status: 'fixture' },
  { id: 'm6', home: 'Bayern', away: 'Dortmund', time: 'FT', league: 'UCL', status: 'result', homeScore: 3, awayScore: 2 },
  { id: 'm7', home: 'Enyimba', away: 'Rangers Int.', time: 'FT', league: 'NPFL', status: 'result', homeScore: 2, awayScore: 1 },
  { id: 'm8', home: 'Remo Stars', away: 'Plateau Utd', time: '16:00', league: 'NPFL', status: 'fixture' },
];
