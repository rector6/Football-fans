import { useEffect, useState } from 'react';
import {
  NEWS,
  PRODUCTS,
  PODCASTS,
  ALL_MATCHES,
  LIVE_TICKER,
  IMAGES,
  formatNaira,
  type NewsArticle,
  type Product,
  type PageId,
} from './data';
import { fetchScoresBundle } from './api/football';

export default function App() {
  const [page, setPage] = useState<PageId>('home');
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [matches, setMatches] = useState(ALL_MATCHES);
  const [ticker, setTicker] = useState(LIVE_TICKER);

  useEffect(() => {
    fetchScoresBundle().then((b) => {
      setMatches(b.matches);
      setTicker(b.ticker);
    });
  }, []);

  if (article) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-6">
        <button type="button" onClick={() => setArticle(null)} className="mb-4 text-sm font-semibold text-brand-600">
          ← Back
        </button>
        <img src={article.image} alt="" className="mb-4 h-56 w-full rounded-2xl object-cover" />
        <h1 className="text-2xl font-extrabold">{article.title}</h1>
        <p className="mt-2 text-sm text-slate-500">{article.author} · {article.time}</p>
        <div className="mt-4 whitespace-pre-line text-slate-700">{article.body}</div>
      </div>
    );
  }

  if (product) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-6">
        <button type="button" onClick={() => setProduct(null)} className="mb-4 text-sm font-semibold text-brand-600">
          ← Shop
        </button>
        <img src={product.image} alt="" className="mb-4 aspect-square w-full rounded-2xl object-cover" />
        <h1 className="text-2xl font-extrabold">{product.name}</h1>
        <p className="mt-1 text-lg font-bold text-brand-700">{formatNaira(product.price)}</p>
        <p className="mt-3 text-sm text-slate-600">{product.description}</p>
      </div>
    );
  }

  return (
    <div className="bg-mesh min-h-screen pb-24">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-600 text-sm font-black text-white">FT</div>
            <span className="font-extrabold">Fans Tribe</span>
          </div>
          <nav className="flex gap-1 text-sm font-semibold">
            {(['home', 'news', 'scores', 'shop', 'podcasts'] as PageId[]).map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => setPage(id)}
                className={`rounded-full px-3 py-1.5 capitalize ${page === id ? 'bg-brand-50 text-brand-700' : 'text-slate-600'}`}
              >
                {id}
              </button>
            ))}
          </nav>
        </div>
        <div className="overflow-hidden border-t border-slate-100 bg-white py-1.5 text-xs">
          <div className="flex gap-6 whitespace-nowrap px-4">
            {ticker.map((m) => (
              <span key={m.id}>
                <span className="live-dot mr-1 inline-block h-1.5 w-1.5 rounded-full bg-live" />
                {m.home} {m.homeScore}-{m.awayScore} {m.away} · {m.minute}
              </span>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6">
        {page === 'home' && (
          <div className="space-y-6">
            <section className="relative overflow-hidden rounded-3xl">
              <img src={IMAGES.heroStudio} alt="" className="h-56 w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 p-6 text-white">
                <h1 className="text-2xl font-extrabold">Football Fans Tribe</h1>
                <p className="mt-1 text-sm text-white/80">Interviews, scores, podcasts & shop for 1.9M Naija fans</p>
              </div>
            </section>
            <h2 className="text-lg font-bold">Featured</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {NEWS.filter((n) => n.featured).map((a) => (
                <button key={a.id} type="button" onClick={() => setArticle(a)} className="glass overflow-hidden rounded-2xl text-left">
                  <img src={a.image} alt="" className="h-36 w-full object-cover" />
                  <div className="p-3">
                    <div className="text-xs font-semibold text-brand-600">{a.category}</div>
                    <div className="mt-1 font-bold">{a.title}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {page === 'news' && (
          <div className="space-y-3">
            <h1 className="text-2xl font-extrabold">News</h1>
            {NEWS.map((a) => (
              <button key={a.id} type="button" onClick={() => setArticle(a)} className="glass flex w-full gap-3 rounded-2xl p-3 text-left">
                <img src={a.image} alt="" className="h-20 w-20 rounded-xl object-cover" />
                <div>
                  <div className="text-xs font-semibold text-brand-600">{a.category}</div>
                  <div className="font-bold">{a.title}</div>
                  <div className="text-xs text-slate-400">{a.time}</div>
                </div>
              </button>
            ))}
          </div>
        )}

        {page === 'scores' && (
          <div className="space-y-3">
            <h1 className="text-2xl font-extrabold">Live scores</h1>
            {matches.map((m) => (
              <div key={m.id} className="glass flex items-center justify-between rounded-2xl px-4 py-3 text-sm">
                <span className="font-semibold">{m.home}</span>
                <span className="tabular-nums font-bold">
                  {m.status === 'fixture' ? m.time : `${m.homeScore ?? 0} – ${m.awayScore ?? 0}`}
                </span>
                <span className="font-semibold text-right">{m.away}</span>
              </div>
            ))}
          </div>
        )}

        {page === 'shop' && (
          <div className="space-y-3">
            <h1 className="text-2xl font-extrabold">Shop</h1>
            <div className="grid grid-cols-2 gap-3">
              {PRODUCTS.map((p) => (
                <button key={p.id} type="button" onClick={() => setProduct(p)} className="glass overflow-hidden rounded-2xl text-left">
                  <img src={p.image} alt="" className="aspect-square w-full object-cover" />
                  <div className="p-3">
                    <div className="text-sm font-bold">{p.name}</div>
                    <div className="text-sm font-extrabold text-brand-700">{formatNaira(p.price)}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {page === 'podcasts' && (
          <div className="space-y-3">
            <h1 className="text-2xl font-extrabold">Podcasts</h1>
            {PODCASTS.map((ep) => (
              <div key={ep.id} className="glass flex gap-3 rounded-2xl p-3">
                <img src={ep.image} alt="" className="h-16 w-16 rounded-xl object-cover" />
                <div>
                  <div className="text-xs font-semibold text-brand-600">{ep.show}</div>
                  <div className="font-bold">{ep.title}</div>
                  <div className="text-xs text-slate-400">{ep.duration} · {ep.time}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
