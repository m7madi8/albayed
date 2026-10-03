import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Building2, ClipboardList, Search, X } from 'lucide-react'
import { universalSearch } from '../../lib/universalSearch'
import { brandOf, categoryOf, headlineSpec } from '../../lib/catalog'
import { MOTION_DURATION, EASE_CALM, searchOverlayMotion } from '../../lib/motionPresets'
import ProductArt from '../art/ProductArt'
import { popularSearches } from '../../lib/search'

export default function UniversalSearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const reduce = useReducedMotion()

  useEffect(() => {
    if (open) {
      setQ('')
      const t = setTimeout(() => inputRef.current?.focus(), 80)
      document.body.style.overflow = 'hidden'
      return () => {
        clearTimeout(t)
        document.body.style.overflow = ''
      }
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const result = universalSearch(q, 6)
  const hasQuery = q.trim().length > 0
  const [activeIndex, setActiveIndex] = useState(0)
  const listRef = useRef<HTMLDivElement>(null)

  const navigablePaths = useMemo(() => {
    if (!hasQuery) return [] as string[]
    const paths: string[] = []
    if (result.orderMatch) paths.push('/visit-order')
    for (const c of result.customers) paths.push(`/dashboard/customers/${c.id}`)
    for (const p of result.products) paths.push(`/products?q=${encodeURIComponent(p.id)}`)
    if (result.productTotal > result.products.length) {
      paths.push(`/products?q=${encodeURIComponent(q.trim())}`)
    }
    return paths
  }, [hasQuery, q, result.customers, result.orderMatch, result.productTotal, result.products])

  useEffect(() => {
    setActiveIndex(0)
  }, [q, navigablePaths.length])

  useEffect(() => {
    if (!open) return
    listRef.current
      ?.querySelector<HTMLElement>(`[data-search-index="${activeIndex}"]`)
      ?.scrollIntoView({ block: 'nearest' })
  }, [activeIndex, open])

  const hasAny =
    hasQuery &&
    (result.products.length > 0 || result.customers.length > 0 || result.orderMatch || result.productTotal > 0)

  const go = (path: string) => {
    onClose()
    navigate(path)
  }

  const rowActive = (path: string) => {
    const i = navigablePaths.indexOf(path)
    return i >= 0 && i === activeIndex ? ' search-result-row--active' : ''
  }

  const panelMotion = reduce ? {} : searchOverlayMotion

  const bodyMotion = reduce
    ? {}
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: MOTION_DURATION.fast, ease: EASE_CALM },
      }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex flex-col bg-background"
          role="dialog"
          aria-modal="true"
          aria-label="بحث النظام"
          {...panelMotion}
        >
          <div className="hairline-b">
            <div className="container-x mx-auto flex max-w-3xl items-center gap-3 py-4">
              <Search size={20} className="shrink-0 text-foreground-muted" aria-hidden />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowDown' && navigablePaths.length > 0) {
                    e.preventDefault()
                    setActiveIndex((i) => Math.min(i + 1, navigablePaths.length - 1))
                  } else if (e.key === 'ArrowUp' && navigablePaths.length > 0) {
                    e.preventDefault()
                    setActiveIndex((i) => Math.max(i - 1, 0))
                  } else if (e.key === 'Enter' && hasQuery) {
                    if (navigablePaths[activeIndex]) go(navigablePaths[activeIndex])
                    else if (result.products[0]) go(`/products?q=${encodeURIComponent(result.products[0].id)}`)
                    else if (result.customers[0]) go(`/dashboard/customers/${result.customers[0].id}`)
                    else go(`/products?q=${encodeURIComponent(q.trim())}`)
                  }
                }}
                placeholder="منتج، SKU، عميل، هاتف، شركة…"
                className="min-w-0 flex-1 bg-transparent text-[17px] text-foreground placeholder:text-foreground-muted outline-none sm:text-[18px]"
              />
              <button type="button" onClick={onClose} aria-label="إغلاق" className="sales-os-icon-btn focus-ring">
                <X size={20} />
              </button>
            </div>
          </div>

          <motion.div
            ref={listRef}
            className="container-x mx-auto w-full max-w-3xl flex-1 overflow-y-auto py-6"
            key={hasQuery ? 'results' : 'popular'}
            {...bodyMotion}
          >
            {!hasQuery && (
              <div>
                <p className="mb-3 text-[13px] font-medium text-foreground-muted">بحث سريع</p>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.slice(0, 4).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setQ(s)}
                      className="filter-chip rounded-full px-4 py-2 text-[14px]"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {hasQuery && !hasAny && (
              <p className="py-16 text-center text-[15px] text-foreground-muted">لا توجد نتائج مطابقة.</p>
            )}

            {hasQuery && result.orderMatch && (
              <section className="mb-8">
                <h2 className="mb-3 text-[12px] font-medium tracking-wide text-foreground-muted">طلبية نشطة</h2>
                <button
                  type="button"
                  data-search-index={navigablePaths.indexOf('/visit-order')}
                  onClick={() => go('/visit-order')}
                  className={`ios-tile flex w-full items-center gap-3 px-4 py-4 text-right${rowActive('/visit-order')}`}
                >
                  <ClipboardList size={20} className="text-link" aria-hidden />
                  <span className="text-[15px] font-medium text-foreground">متابعة طلبية الزيارة الحالية</span>
                </button>
              </section>
            )}

            {hasQuery && result.customers.length > 0 && (
              <section className="mb-8">
                <h2 className="mb-3 text-[12px] font-medium tracking-wide text-foreground-muted">عملاء</h2>
                <ul className="ios-list">
                  {result.customers.map((c) => {
                    const path = `/dashboard/customers/${c.id}`
                    return (
                    <li key={c.id}>
                      <button
                        type="button"
                        data-search-index={navigablePaths.indexOf(path)}
                        onClick={() => go(path)}
                        className={`ios-list-row flex w-full items-center gap-3 text-right${rowActive(path)}`}
                      >
                        <Building2 size={18} className="shrink-0 text-foreground-muted" aria-hidden />
                        <span className="min-w-0 flex-1">
                          <span className="block text-[15px] font-medium text-foreground">{c.name}</span>
                          <span className="mt-0.5 block text-[13px] text-foreground-muted">
                            {c.city}
                            {c.contact ? ` · ${c.contact}` : ''}
                          </span>
                        </span>
                        <span className="text-[13px] text-foreground-muted" dir="ltr">{c.phone}</span>
                      </button>
                    </li>
                    )
                  })}
                </ul>
              </section>
            )}

            {hasQuery && result.products.length > 0 && (
              <section>
                <h2 className="mb-3 text-[12px] font-medium tracking-wide text-foreground-muted">منتجات</h2>
                <ul className="ios-list">
                  {result.products.map((p) => {
                    const path = `/products?q=${encodeURIComponent(p.id)}`
                    return (
                    <li key={p.id}>
                      <button
                        type="button"
                        data-search-index={navigablePaths.indexOf(path)}
                        onClick={() => go(path)}
                        className={`ios-list-row flex w-full items-center gap-3 text-right${rowActive(path)}`}
                      >
                        <span className="catalog-stage flex size-14 shrink-0 items-center justify-center rounded-[8px]">
                          <ProductArt spec={p.art} shadow={false} className="size-10" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[15px] font-medium text-foreground">{p.name}</span>
                          <span className="mt-1 block text-[13px] text-foreground-muted">
                            {categoryOf(p).name} · {brandOf(p).name} · {headlineSpec(p)}
                          </span>
                        </span>
                        <span className="text-[12px] text-foreground-muted" dir="ltr">{p.id}</span>
                      </button>
                    </li>
                    )
                  })}
                </ul>
                {result.productTotal > result.products.length && (
                  <button
                    type="button"
                    data-search-index={navigablePaths.indexOf(`/products?q=${encodeURIComponent(q.trim())}`)}
                    onClick={() => go(`/products?q=${encodeURIComponent(q.trim())}`)}
                    className={`mt-4 text-[14px] font-medium text-link${rowActive(`/products?q=${encodeURIComponent(q.trim())}`)}`}
                  >
                    عرض كل المنتجات ({result.productTotal})
                  </button>
                )}
              </section>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
