import { useCallback, useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, Newspaper, Radio, ShoppingBag, Mic2, Info, Megaphone, Mail,
  ChevronLeft, Share2, Copy, Check, X, Plus, Minus, ShoppingCart, Menu, Loader2,
} from 'lucide-react';
import {
  type PageId, type NewsArticle, type Product, type ScheduledMatch, type LiveMatch,
  NEWS, PRODUCTS, formatNaira,
} from './data';
import { fetchScoresBundle } from './api/football';
import {
  HomePage, NewsPage, ScoresPage, ShopPage, PodcastsPage,
  AboutPage, AdvertisePage, ContactPage,
} from './Pages';

type CartItem = { product: Product; size: string; qty: number };

const NAV: { id: PageId; label: string; icon: typeof Home }[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'news', label: 'News', icon: Newspaper },
  { id: 'scores', label: 'Scores', icon: Radio },
  { id: 'shop', label: 'Shop', icon: ShoppingBag },
  { id: 'podcasts', label: 'Pods', icon: Mic2 },
];

const MORE: { id: PageId; label: string; icon: typeof Info }[] = [
  { id: 'about', label: 'About', icon: Info },
  { id: 'advertise', label: 'Advertise', icon: Megaphone },
  { id: 'contact', label: 'Contact', icon: Mail },
];

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-600 text-sm font-black text-white shadow-md shadow-brand-500/30">FT</div>
      <div className="leading-tight">
        <div className="text-sm font-extrabold tracking-tight text-slate-900">Fans Tribe</div>
        <div className="text-[10px] font-medium uppercase tracking-wider text-slate-500">Media · Shop</div>
      </div>
    </div>
  );
}

function LiveDot() {
  return <span className="live-dot inline-block h-2 w-2 rounded-full bg-live" />;
}

export default function App() {
  const [page, setPage] = useState<PageId>('home');
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newsFilter, setNewsFilter] = useState('All');
  const [matches, setMatches] = useState<ScheduledMatch[]>([]);
  const [ticker, setTicker] = useState<LiveMatch[]>([]);
  const [scoreSource, setScoreSource] = useState<'api' | 'demo'>('demo');
  const [copied, setCopied] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterDone, setNewsletterDone] = useState(false);
  const [contactSent, setContactSent] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetchScoresBundle().then((b) => {
      if (cancelled) return;
      setMatches(b.matches);
      setTicker(b.ticker);
      setScoreSource(b.source);
    });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page, article, product]);

  const go = useCallback((id: PageId) => {
    setArticle(null);
    setProduct(null);
    setPage(id);
    setMenuOpen(false);
  }, []);

  const cartCount = cart.reduce((n, c) => n + c.qty, 0);
  const cartTotal = cart.reduce((n, c) => n + c.product.price * c.qty, 0);

  const addToCart = () => {
    if (!product || !selectedSize) return;
    setCart((prev) => {
      const i = prev.findIndex((c) => c.product.id === product.id && c.size === selectedSize);
      if (i >= 0) {
        const next = [...prev];
        next[i] = { ...next[i], qty: next[i].qty + 1 };
        return next;
      }
      return [...prev, { product, size: selectedSize, qty: 1 }];
    });
    setCartOpen(true);
  };

  const updateQty = (idx: number, delta: number) => {
    setCart((prev) => {
      const next = [...prev];
      const q = next[idx].qty + delta;
      if (q <= 0) return next.filter((_, i) => i !== idx);
      next[idx] = { ...next[idx], qty: q };
      return next;
    });
  };

  const shareArticle = async () => {
    if (!article) return;
    const url = window.location.href;
    if (navigator.share) {
      try { await navigator.share({ title: article.title, text: article.summary, url }); return; } catch { /* */ }
    }
    await navigator.clipboard.writeText(`${article.title}\n${url}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredNews = useMemo(
    () => (newsFilter === 'All' ? NEWS : NEWS.filter((n) => n.category === newsFilter)),
    [newsFilter]
  );
  const featured = NEWS.filter((n) => n.featured);

  return (
    <div className="bg-mesh min-h-screen text-slate-900">
      <AnimatePresence>
        {loading && (
          <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-50">
            <div className="flex flex-col items-center gap-3">
              <Logo />
              <Loader2 className="h-6 w-6 animate-spin text-brand-600" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
          <button type="button" onClick={() => go('home')} className="shrink-0"><Logo /></button>
          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((n) => (
              <button key={n.id} type="button" onClick={() => go(n.id)}
                className={`rounded-full px-3 py-1.5 text-sm font-semibold transition ${
                  page === n.id && !article && !product ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-100'
                }`}>{n.label}</button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            {(page === 'shop' || cartCount > 0) && (
              <button type="button" onClick={() => setCartOpen(true)}
                className="relative rounded-full bg-slate-100 p-2 text-slate-700 hover:bg-slate-200" aria-label="Cart">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-600 px-1 text-[10px] font-bold text-white">{cartCount}</span>
                )}
              </button>
            )}
            <button type="button" className="rounded-full bg-slate-100 p-2 text-slate-700 md:hidden" onClick={() => setMenuOpen(true)} aria-label="Menu">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
        {ticker.length > 0 && (
          <div className="overflow-hidden border-t border-slate-100 bg-white/90">
            <div className="flex animate-[marquee_30s_linear_infinite] gap-6 whitespace-nowrap py-2 text-xs font-medium text-slate-700">
              {[...ticker, ...ticker].map((m, i) => (
                <span key={`${m.id}-${i}`} className="inline-flex items-center gap-2 px-2">
                  <LiveDot />
                  <span className="font-semibold">{m.league}</span>
                  <span>{m.home} {m.homeScore}–{m.awayScore} {m.away}</span>
                  <span className="text-slate-400">{m.minute}</span>
                </span>
              ))}
            </div>
            <style>{`@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
          </div>
        )}
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 md:hidden" onClick={() => setMenuOpen(false)}>
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-white p-5 shadow-2xl"
              onClick={(e) => e.stopPropagation()}>
              <div className="mb-6 flex items-center justify-between">
                <Logo />
                <button type="button" onClick={() => setMenuOpen(false)} className="rounded-full p-2 hover:bg-slate-100"><X className="h-5 w-5" /></button>
              </div>
              <div className="space-y-1">
                {[...NAV, ...MORE].map((n) => (
                  <button key={n.id} type="button" onClick={() => go(n.id)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold ${
                      page === n.id ? 'bg-brand-50 text-brand-700' : 'text-slate-700 hover:bg-slate-50'
                    }`}>
                    <n.icon className="h-4 w-4" />{n.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {cartOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40" onClick={() => setCartOpen(false)}>
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4">
                <h2 className="text-lg font-bold">Your cart</h2>
                <button type="button" onClick={() => setCartOpen(false)} className="rounded-full p-2 hover:bg-slate-100"><X className="h-5 w-5" /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                {cart.length === 0 ? (
                  <p className="py-12 text-center text-sm text-slate-500">Cart is empty. Grab a jersey for the Tribe.</p>
                ) : (
                  <ul className="space-y-4">
                    {cart.map((c, i) => (
                      <li key={`${c.product.id}-${c.size}`} className="flex gap-3">
                        <img src={c.product.image} alt="" className="h-16 w-16 rounded-xl object-cover" />
                        <div className="flex-1">
                          <div className="text-sm font-semibold">{c.product.name}</div>
                          <div className="text-xs text-slate-500">Size {c.size}</div>
                          <div className="mt-1 text-sm font-bold text-brand-700">{formatNaira(c.product.price)}</div>
                          <div className="mt-2 flex items-center gap-2">
                            <button type="button" onClick={() => updateQty(i, -1)} className="rounded-lg bg-slate-100 p-1"><Minus className="h-3.5 w-3.5" /></button>
                            <span className="text-sm font-semibold">{c.qty}</span>
                            <button type="button" onClick={() => updateQty(i, 1)} className="rounded-lg bg-slate-100 p-1"><Plus className="h-3.5 w-3.5" /></button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {cart.length > 0 && (
                <div className="border-t border-slate-100 p-4">
                  <div className="mb-3 flex justify-between text-sm">
                    <span className="text-slate-500">Subtotal</span>
                    <span className="font-bold">{formatNaira(cartTotal)}</span>
                  </div>
                  <button type="button" className="w-full rounded-2xl bg-brand-600 py-3 text-sm font-bold text-white shadow-lg shadow-brand-500/25"
                    onClick={() => { alert('Checkout demo — connect payments when ready.'); setCartOpen(false); }}>
                    Checkout
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="mx-auto max-w-5xl px-4 pb-safe pt-4">
        <AnimatePresence mode="wait">
          {article ? (
            <motion.article key={article.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-5">
              <button type="button" onClick={() => setArticle(null)} className="inline-flex items-center gap-1 text-sm font-semibold text-slate-600">
                <ChevronLeft className="h-4 w-4" /> Back
              </button>
              <img src={article.image} alt="" className="h-52 w-full rounded-3xl object-cover sm:h-72" />
              <div>
                <span className="inline-flex rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-semibold text-brand-700 ring-1 ring-brand-100">{article.category}</span>
                <h1 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">{article.title}</h1>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-500">
                  <span className="font-semibold text-slate-700">{article.author}</span>
                  <span>·</span><span>{article.authorRole}</span>
                  <span>·</span><span>{article.time}</span>
                  <span>·</span><span>{article.readMins} min read</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={shareArticle} className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700">
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Share2 className="h-3.5 w-3.5" />}
                  {copied ? 'Copied' : 'Share'}
                </button>
                <button type="button" onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.href)}`, '_blank')}
                  className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold">X</button>
                <button type="button" onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                  className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold">Facebook</button>
                <button type="button" onClick={async () => { await navigator.clipboard.writeText(window.location.href); }}
                  className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold"><Copy className="h-3.5 w-3.5" /> Link</button>
              </div>
              <div className="whitespace-pre-line text-[15px] leading-relaxed text-slate-700">{article.body}</div>
            </motion.article>
          ) : product ? (
            <motion.div key={product.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-5">
              <button type="button" onClick={() => setProduct(null)} className="inline-flex items-center gap-1 text-sm font-semibold text-slate-600">
                <ChevronLeft className="h-4 w-4" /> Shop
              </button>
              <img src={product.image} alt="" className="aspect-square w-full rounded-3xl object-cover sm:aspect-[4/3]" />
              <div>
                {product.tag && <span className="inline-flex rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-semibold text-brand-700 ring-1 ring-brand-100">{product.tag}</span>}
                <h1 className="mt-2 text-2xl font-extrabold tracking-tight">{product.name}</h1>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-xl font-extrabold text-brand-700">{formatNaira(product.price)}</span>
                  {product.compareAt && <span className="text-sm text-slate-400 line-through">{formatNaira(product.compareAt)}</span>}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{product.description}</p>
              </div>
              <div>
                <div className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">Size</div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button key={s} type="button" onClick={() => setSelectedSize(s)}
                      className={`rounded-xl px-3 py-2 text-sm font-semibold ${selectedSize === s ? 'bg-brand-600 text-white' : 'bg-white ring-1 ring-slate-200 text-slate-700'}`}>{s}</button>
                  ))}
                </div>
              </div>
              <button type="button" onClick={addToCart} className="w-full rounded-2xl bg-brand-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-500/25">
                Add to cart
              </button>
            </motion.div>
          ) : (
            <motion.div key={page} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              {page === 'home' && (
                <HomePage featured={featured} onArticle={setArticle} onNews={() => go('news')} onShop={() => go('shop')}
                  email={newsletterEmail} setEmail={setNewsletterEmail} done={newsletterDone}
                  onSubscribe={() => { if (newsletterEmail.includes('@')) setNewsletterDone(true); }} />
              )}
              {page === 'news' && <NewsPage filter={newsFilter} setFilter={setNewsFilter} articles={filteredNews} onArticle={setArticle} />}
              {page === 'scores' && <ScoresPage matches={matches} source={scoreSource} />}
              {page === 'shop' && <ShopPage products={PRODUCTS} onProduct={(p) => { setProduct(p); setSelectedSize(p.sizes[0] || ''); }} />}
              {page === 'podcasts' && <PodcastsPage />}
              {page === 'about' && <AboutPage />}
              {page === 'advertise' && <AdvertisePage />}
              {page === 'contact' && <ContactPage sent={contactSent} onSend={() => setContactSent(true)} />}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-slate-200/80 bg-white/90 backdrop-blur-xl md:hidden nav-safe">
        <div className="mx-auto flex max-w-lg justify-around px-1 pt-1">
          {NAV.map((n) => {
            const active = page === n.id && !article && !product;
            return (
              <button key={n.id} type="button" onClick={() => go(n.id)}
                className={`flex flex-1 flex-col items-center gap-0.5 rounded-xl py-2 text-[10px] font-semibold ${active ? 'text-brand-600' : 'text-slate-500'}`}>
                <n.icon className={`h-5 w-5 ${active ? 'stroke-[2.5]' : ''}`} />
                {n.label}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
