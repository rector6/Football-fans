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

export const IMAGES = {
  heroStudio: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1600&q=85',
  interview: 'https://images.unsplash.com/photo-1516280440614-6697288d5d38?auto=format&fit=crop&w=1200&q=85',
  analysis: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=85',
  naijaFans: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1200&q=85',
  preview: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=1200&q=85',
  review: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=85',
  feature: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1200&q=85',
  podcast: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=800&q=85',
  about: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=1200&q=85',
  jerseyGreen: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&w=800&q=85',
  jerseyRed: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=800&q=85',
  jerseyBlue: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=85',
  jerseySky: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=800&q=85',
  jerseyWhite: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=85',
  hoodie: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=85',
  cap: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=85',
  scarf: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=85',
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

export const NEWS: NewsArticle[] = [
  {
    id: 'n1',
    title: 'Inside the Super Eagles camp: Osimhen on pressure, pride and Paris',
    summary: 'Exclusive sit-down with Victor Osimhen on the AFCON qualifiers, club form, and what the 1.9M Tribe means to him.',
    body: 'Victor Osimhen talks with the same intensity he shows in the box. Every time I pull on the green, I feel 200 million people — that is fuel. The full conversation covers AFCON, club ambitions, and the Tribe.',
    category: 'Interview',
    time: '2 hours ago',
    readMins: 8,
    author: 'Adaeze Okonkwo',
    authorRole: 'Senior Writer',
    featured: true,
    image: IMAGES.interview,
  },
  {
    id: 'n2',
    title: 'Tactical breakdown: How Arsenal dismantled Chelsea in the second half',
    summary: 'Shape, press triggers and the inverted full-back that unlocked the Blues.',
    body: 'Arsenal second-half was controlled aggression. Press triggers, inverted full-back, and wide overloads decided the game. Full board analysis for the Tribe.',
    category: 'Match Analysis',
    time: '5 hours ago',
    readMins: 6,
    author: 'Tunde Bakare',
    authorRole: 'Tactical Analyst',
    featured: true,
    image: IMAGES.analysis,
  },
  {
    id: 'n3',
    title: 'NPFL weekend preview: Enyimba vs Rangers and the title race squeeze',
    summary: 'Two powerhouses collide. What it means for the table.',
    body: 'Enyimba host Rangers International in a fixture that rarely disappoints. Form guide and key battles inside.',
    category: 'Preview',
    time: '8 hours ago',
    readMins: 4,
    author: 'Chinedu Eze',
    authorRole: 'NPFL Desk',
    image: IMAGES.preview,
  },
  {
    id: 'n4',
    title: 'Match review: Nigeria 1-0 Ghana — clinical, organised, unfinished business',
    summary: 'A hard-fought qualifier that showed the Super Eagles can grind.',
    body: 'One goal. Clean sheet. Three points. Defensive shape held firm. Qualification stays on track.',
    category: 'Review',
    time: '1 day ago',
    readMins: 5,
    author: 'Adaeze Okonkwo',
    authorRole: 'Senior Writer',
    image: IMAGES.review,
  },
  {
    id: 'n5',
    title: 'The Tribe abroad: How Naija fans turned a London pub into a stadium',
    summary: 'From Peckham to Wembley — diaspora supporters who never miss a kick.',
    body: 'On Super Eagles night the same chants roll through London and Lagos. This is the other half of the 1.9 million family.',
    category: 'Naija Fans',
    time: '1 day ago',
    readMins: 7,
    author: 'Kemi Adeyemi',
    authorRole: 'Community Editor',
    image: IMAGES.naijaFans,
  },
  {
    id: 'n6',
    title: 'Feature: Building a modern football media brand from Lagos to the world',
    summary: 'Content, community, and the next chapter for Nigerian sports media.',
    body: 'Football Fans Tribe started as friends who refused to watch in silence. Today it reaches millions. Merch, live events, and a tighter bond with the audience are next.',
    category: 'Feature',
    time: '2 days ago',
    readMins: 9,
    author: 'Studio Desk',
    authorRole: 'Editorial',
    image: IMAGES.feature,
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Nigeria Home Jersey 24/25',
    price: 45000,
    compareAt: 55000,
    tag: 'Best seller',
    category: 'jersey',
    club: 'Nigeria',
    colors: ['Green', 'White'],
    description: 'Official-style Super Eagles home shirt. Lightweight fabric, embroidered crest.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    image: IMAGES.jerseyGreen,
    gallery: [IMAGES.jerseyGreen],
  },
  {
    id: 'p2',
    name: 'Arsenal Home Jersey',
    price: 52000,
    tag: 'New',
    category: 'jersey',
    club: 'Arsenal',
    colors: ['Red', 'White'],
    description: 'Classic Gunners home kit replica. Premium fit, moisture-wicking.',
    sizes: ['S', 'M', 'L', 'XL'],
    image: IMAGES.jerseyRed,
    gallery: [IMAGES.jerseyRed],
  },
  {
    id: 'p3',
    name: 'Chelsea Away Jersey',
    price: 52000,
    category: 'jersey',
    club: 'Chelsea',
    colors: ['Blue', 'White'],
    description: 'Away kit with modern cut and club detailing.',
    sizes: ['S', 'M', 'L', 'XL'],
    image: IMAGES.jerseyBlue,
    gallery: [IMAGES.jerseyBlue],
  },
  {
    id: 'p4',
    name: 'Man City Third Kit',
    price: 52000,
    category: 'jersey',
    club: 'Man City',
    colors: ['Sky', 'Navy'],
    description: 'Third kit energy. Clean lines, City crest.',
    sizes: ['S', 'M', 'L', 'XL'],
    image: IMAGES.jerseySky,
    gallery: [IMAGES.jerseySky],
  },
  {
    id: 'p5',
    name: 'Fans Tribe Hoodie',
    price: 38000,
    compareAt: 42000,
    tag: 'Tribe exclusive',
    category: 'hoodie',
    club: 'Fans Tribe',
    colors: ['Black', 'Green'],
    description: 'Heavyweight fleece hoodie with embroidered Tribe mark.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    image: IMAGES.hoodie,
    gallery: [IMAGES.hoodie],
  },
  {
    id: 'p6',
    name: 'Tribe Cap',
    price: 12000,
    category: 'cap',
    club: 'Fans Tribe',
    colors: ['Black', 'Green'],
    description: 'Structured cap with adjustable strap and subtle logo.',
    sizes: ['One size'],
    image: IMAGES.cap,
    gallery: [IMAGES.cap],
  },
  {
    id: 'p7',
    name: 'Super Eagles Scarf',
    price: 15000,
    category: 'accessories',
    club: 'Nigeria',
    colors: ['Green', 'White'],
    description: 'Classic knitted scarf in national colours.',
    sizes: ['One size'],
    image: IMAGES.scarf,
    gallery: [IMAGES.scarf],
  },
  {
    id: 'p8',
    name: 'Real Madrid Home Jersey',
    price: 55000,
    category: 'jersey',
    club: 'Real Madrid',
    colors: ['White', 'Gold'],
    description: 'Los Blancos home shirt. Clean and iconic.',
    sizes: ['S', 'M', 'L', 'XL'],
    image: IMAGES.jerseyWhite,
    gallery: [IMAGES.jerseyWhite],
  },
];

export const PODCASTS: PodcastEpisode[] = [
  {
    id: 'ep1',
    title: 'AFCON Qualifiers debrief + Osimhen exclusive clips',
    show: 'Fans Tribe Live',
    duration: '58 min',
    time: 'Today',
    description: 'Full reaction to Nigeria vs Ghana and unreleased interview moments.',
    image: IMAGES.podcast,
  },
  {
    id: 'ep2',
    title: 'Matchday: Arsenal–Chelsea and the Premier League race',
    show: 'Matchday',
    duration: '42 min',
    time: 'Yesterday',
    description: 'Board work, key battles, and what the result means for the top four.',
    image: IMAGES.analysis,
  },
  {
    id: 'ep3',
    title: 'Vlog: Behind the scenes at the studio',
    show: 'Vlogs',
    duration: '24 min',
    time: '3 days ago',
    description: 'How an episode of Fans Tribe Live actually gets made.',
    image: IMAGES.heroStudio,
  },
  {
    id: 'ep4',
    title: 'NPFL round-up: title contenders and rising stars',
    show: 'Fans Tribe Live',
    duration: '51 min',
    time: '4 days ago',
    description: 'Weekend results and young players to watch.',
    image: IMAGES.preview,
  },
];

export const NEWS_CATEGORIES = [
  'All',
  'Interview',
  'Match Analysis',
  'Preview',
  'Review',
  'Naija Fans',
  'Feature',
] as const;

export function formatNaira(n: number): string {
  return `₦${n.toLocaleString('en-NG')}`;
}
