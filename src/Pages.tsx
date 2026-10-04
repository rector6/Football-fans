import { useState } from 'react';
import { Check } from 'lucide-react';
import {
  type NewsArticle, type Product, type ScheduledMatch,
  NEWS, PRODUCTS, PODCASTS, NEWS_CATEGORIES, IMAGES, formatNaira,
} from './data';

function LiveDot() {
  return <span className="live-dot inline-block h-2 w-2 rounded-full bg-live" />;
}

function Badge({ children, tone = 'brand' }: { children: React.ReactNode; tone?: 'brand' | 'live' | 'slate' }) {
  const cls =
    tone === 'live' ? 'bg-red-50 text-red-600 ring-red-100'
    : tone === 'slate' ? 'bg-slate-100 text-slate-600 ring-slate-200'
    : 'bg-brand-50 text-brand-700 ring-brand-100';
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ${cls}`}>
      {children}
    </span>
  );
}

export function HomePage({
  featured, onArticle, onNews, onShop, email, setEmail, done, onSubscribe,
}: {
  featured: NewsArticle[];
  onArticle: (a: NewsArticle) => void;
  onNews: () => void;
  onShop: () => void;
  email: string;
  setEmail: (v: string) => void;
  done: boolean;
  onSubscribe: () => void;
}) {
  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl">
        <img src={IMAGES.heroStudio} alt="" className="h-56 w-full object-cover sm:h-72" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
          <Badge>Studio · Live & On-demand</Badge>
          <h1 className="mt-2 max-w-xl text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            Interviews, analysis & the Tribe — built for 1.9M Naija fans
          </h1>
          <p className="mt-2 max-w-md text-sm text-slate-200">Exclusive sit-downs, match boards, NPFL coverage and official merch.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" onClick={onNews} className="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-900">Read the latest</button>
            <button type="button" onClick={onShop} className="rounded-full bg-white/15 px-4 py-2 text-sm font-bold text-white ring-1 ring-white/30 backdrop-blur">Shop merch</button>
          </div>
        </div>
      </section>
      <section>
        <div className="mb-3 flex items-end justify-between">
          <h2 className="text-lg font-extrabold tracking-tight">Featured</h2>
          <button type="button" onClick={onNews} className="text-sm font-semibold text-brand-600">All news →</button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {featured.map((a) => (
            <button key={a.id} type="button" onClick={() => onArticle(a)} className="glass group overflow-hidden rounded-2xl text-left transition hover:shadow-lg">
              <img src={a.image} alt="" className="h-40 w-full object-cover transition group-hover:scale-[1.02]" />
              <div className="p-4">
                <Badge>{a.category}</Badge>
                <h3 className="mt-2 text-base font-bold leading-snug">{a.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-slate-600">{a.summary}</p>
                <div className="mt-2 text-xs text-slate-400">{a.time} · {a.readMins} min read</div>
              </div>
            </button>
          ))}
        </div>
      </section>
      <section className="glass-strong rounded-3xl p-6 sm:p-8">
        <h2 className="text-lg font-extrabold">Stay in the Tribe</h2>
        <p className="mt-1 text-sm text-slate-600">Match previews, exclusive clips and drop alerts — no spam.</p>
        {done ? (
          <p className="mt-4 text-sm font-semibold text-emerald-600">You are on the list. Welcome.</p>
        ) : (
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com"
              className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-500/30" />
            <button type="button" onClick={onSubscribe} className="rounded-2xl bg-brand-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-brand-500/20">Subscribe</button>
          </div>
        )}
      </section>
    </div>
  );
}

export function NewsPage({ filter, setFilter, articles, onArticle }: {
  filter: string; setFilter: (v: string) => void; articles: NewsArticle[]; onArticle: (a: NewsArticle) => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">News</h1>
        <p className="text-sm text-slate-500">Interviews, analysis, NPFL and the Tribe.</p>
      </div>
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
        {NEWS_CATEGORIES.map((c) => (
          <button key={c} type="button" onClick={() => setFilter(c)}
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${filter === c ? 'bg-brand-600 text-white' : 'bg-white text-slate-600 ring-1 ring-slate-200'}`}>{c}</button>
        ))}
      </div>
      <div className="space-y-3">
        {articles.map((a) => (
          <button key={a.id} type="button" onClick={() => onArticle(a)} className="glass flex w-full gap-3 overflow-hidden rounded-2xl p-3 text-left transition hover:shadow-md">
            <img src={a.image} alt="" className="h-24 w-24 shrink-0 rounded-xl object-cover" />
            <div className="min-w-0 flex-1">
              <Badge>{a.category}</Badge>
              <h3 className="mt-1 line-clamp-2 text-sm font-bold leading-snug">{a.title}</h3>
              <div className="mt-1 text-[11px] text-slate-400">{a.time} · {a.readMins} min · {a.author}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export function ScoresPage({ matches, source }: { matches: ScheduledMatch[]; source: 'api' | 'demo' }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Live scores</h1>
        <p className="text-sm text-slate-500">EPL · La Liga · UCL · Serie A · Bundesliga · Ligue 1 · NPFL{source === 'demo' ? ' · demo data' : ''}</p>
      </div>
      {(['live', 'fixture', 'result'] as const).map((status) => {
        const list = matches.filter((m) => m.status === status);
        if (!list.length) return null;
        const title = status === 'live' ? 'Live' : status === 'fixture' ? 'Fixtures' : 'Results';
        return (
          <section key={status} className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">{title}</h2>
            {list.map((m) => (
              <div key={m.id} className="glass flex items-center gap-3 rounded-2xl px-4 py-3">
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] font-medium text-slate-400">{m.league}</div>
                  <div className="mt-0.5 flex items-center justify-between gap-2 text-sm font-semibold">
                    <span className="truncate">{m.home}</span>
                    {m.status !== 'fixture' ? <span className="tabular-nums">{m.homeScore} – {m.awayScore}</span> : <span className="text-slate-400">{m.time}</span>}
                    <span className="truncate text-right">{m.away}</span>
                  </div>
                </div>
                {m.status === 'live' && <Badge tone="live"><LiveDot /> {m.minute || m.time}</Badge>}
                {m.status === 'result' && <Badge tone="slate">FT</Badge>}
              </div>
            ))}
          </section>
        );
      })}
    </div>
  );
}

export function ShopPage({ products, onProduct }: { products: Product[]; onProduct: (p: Product) => void }) {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Shop</h1>
        <p className="text-sm text-slate-500">Jerseys, Tribe gear and matchday essentials.</p>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {products.map((p) => (
          <button key={p.id} type="button" onClick={() => onProduct(p)} className="glass overflow-hidden rounded-2xl text-left transition hover:shadow-md">
            <img src={p.image} alt="" className="aspect-square w-full object-cover" />
            <div className="p-3">
              {p.tag && <Badge>{p.tag}</Badge>}
              <h3 className="mt-1 line-clamp-2 text-sm font-bold leading-snug">{p.name}</h3>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-sm font-extrabold text-brand-700">{formatNaira(p.price)}</span>
                {p.compareAt && <span className="text-xs text-slate-400 line-through">{formatNaira(p.compareAt)}</span>}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export function PodcastsPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Podcasts</h1>
        <p className="text-sm text-slate-500">Fans Tribe Live · Matchday · Vlogs</p>
      </div>
      <div className="space-y-3">
        {PODCASTS.map((ep) => (
          <div key={ep.id} className="glass flex gap-3 rounded-2xl p-3">
            <img src={ep.image} alt="" className="h-20 w-20 shrink-0 rounded-xl object-cover" />
            <div className="min-w-0 flex-1">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-brand-600">{ep.show}</div>
              <h3 className="mt-0.5 text-sm font-bold leading-snug">{ep.title}</h3>
              <p className="mt-1 line-clamp-2 text-xs text-slate-500">{ep.description}</p>
              <div className="mt-1 text-[11px] text-slate-400">{ep.duration} · {ep.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AboutPage() {
  return (
    <div className="space-y-6">
      <img src={IMAGES.about} alt="" className="h-48 w-full rounded-3xl object-cover" />
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">About Fans Tribe</h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          Football Fans Tribe is a Naija-first media and community brand. From exclusive interviews and tactical analysis to NPFL coverage and matchday merch, we exist for the loudest football family on the continent — and in the diaspora.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          With nearly two million fans on Facebook, the Tribe is studio energy, street culture, and the green-and-white heartbeat of Nigerian football.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {[{ k: '1.9M+', v: 'Facebook following' }, { k: 'Studio', v: 'Live shows & interviews' }, { k: 'Shop', v: 'Official Tribe merch' }].map((s) => (
          <div key={s.k} className="glass rounded-2xl p-4 text-center">
            <div className="text-xl font-extrabold text-brand-700">{s.k}</div>
            <div className="text-xs text-slate-500">{s.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AdvertisePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Advertise with us</h1>
        <p className="mt-2 text-sm text-slate-600">Reach a highly engaged football audience across web, social and live studio shows.</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { title: 'Homepage feature', price: 'From ₦500k', desc: 'Hero placement and newsletter mention for a full week.' },
          { title: 'Show sponsorship', price: 'From ₦1.2M', desc: 'Integrated reads on Fans Tribe Live plus social cut-downs.' },
          { title: 'Shop collab', price: 'Custom', desc: 'Co-branded drops and exclusive Tribe product placements.' },
        ].map((p) => (
          <div key={p.title} className="glass rounded-2xl p-5">
            <h3 className="font-bold">{p.title}</h3>
            <div className="mt-1 text-sm font-extrabold text-brand-700">{p.price}</div>
            <p className="mt-2 text-xs text-slate-500">{p.desc}</p>
          </div>
        ))}
      </div>
      <p className="text-sm text-slate-600">Media kit: <span className="font-semibold">ads@fanstribe.ng</span> or use Contact.</p>
    </div>
  );
}

export function ContactPage({ sent, onSend }: { sent: boolean; onSend: () => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  if (sent) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-extrabold tracking-tight">Contact</h1>
        <div className="glass-strong rounded-3xl p-6 text-center">
          <Check className="mx-auto h-8 w-8 text-emerald-600" />
          <p className="mt-2 font-semibold">Message received. We will reply soon.</p>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Contact</h1>
        <p className="mt-2 text-sm text-slate-600">Support, partnerships, press and Tribe feedback.</p>
      </div>
      <form className="glass space-y-3 rounded-3xl p-5" onSubmit={(e) => { e.preventDefault(); if (name && email && msg) onSend(); }}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-500/30" />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-500/30" />
        <textarea value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="How can we help?" rows={4} className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-500/30" />
        <button type="submit" className="w-full rounded-2xl bg-brand-600 py-3 text-sm font-bold text-white shadow-lg shadow-brand-500/20">Send message</button>
      </form>
    </div>
  );
}
