import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Search, X } from 'lucide-react'
import { search, popularSearches } from '../../lib/search'
import { categoryOf, headlineSpec } from '../../lib/catalog'
import { EASE_CALM, MOTION_DURATION, searchOverlayMotion } from '../../lib/motionPresets'
import ProductStage from '../catalog/ProductStage'

export default function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
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
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const result = search(q, 7)
  const hasQuery = q.trim().length > 0

  const goTo = (path: string) => {
    onClose()
    navigate(path)
  }

  const openProduct = (productId: string) => goTo(`/products?q=${encodeURIComponent(productId)}`)

  const submitFull = () => {
    if (!hasQuery) return
    goTo(`/products?q=${encodeURIComponent(q.trim())}`)
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
          className="fixed inset-0 z-[60] flex flex-col bg-background"
          role="dialog"
          aria-modal="true"
          aria-label="بحث المنتجات"
          {...panelMotion}
        >
          <div className="hairline-b">
            <div className="container-x mx-auto flex w-full max-w-[var(--content-max)] items-center gap-2 py-4 sm:gap-4 sm:py-5">
              <Search size={20} strokeWidth={1.7} className="shrink-0 text-foreground-muted" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && submitFull()}
                placeholder="ابحث عن منتج، نوع، أو علامة تجارية..."
                className="display min-w-0 flex-1 bg-transparent text-[18px] text-foreground placeholder:text-foreground-muted sm:text-[22px] md:text-[26px]"
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="إغلاق البحث"
                className="ui-icon-btn inline-flex size-11 shrink-0 items-center justify-center rounded-full text-foreground"
              >
                <X size={20} strokeWidth={1.7} />
              </button>
            </div>
          </div>

          <motion.div
            className="container-x mx-auto w-full max-w-[var(--content-max)] flex-1 overflow-y-auto py-8"
            key={hasQuery ? 'results' : 'popular'}
            {...bodyMotion}
          >
            {!hasQuery && (
              <div>
                <p className="mb-4 text-[13px] font-medium text-foreground-muted">عمليات بحث شائعة</p>
                <div className="flex flex-wrap gap-2.5">
                  {popularSearches.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setQ(s)}
                      className="ui-press filter-chip rounded-full px-4 py-2 text-[14px]"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {hasQuery && result.total === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="display text-[24px] text-foreground">لم نجد ما تبحث عنه.</p>
                <p className="mt-2 text-[15px] text-foreground-muted">جرّب اسم منتج مختلف أو تصفح التصنيفات.</p>
              </div>
            )}

            {hasQuery && result.total > 0 && (
              <div className="flex flex-col gap-9">
                {(result.categories.length > 0 || result.brands.length > 0) && (
                  <div className="flex flex-wrap gap-2.5">
                    {result.categories.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => goTo(`/products?category=${c.slug}`)}
                        className="ui-press filter-chip rounded-full px-4 py-2 text-[13.5px] font-medium"
                      >
                        تصنيف: {c.name}
                      </button>
                    ))}
                    {result.brands.map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => goTo(`/products?brand=${encodeURIComponent(b.name)}`)}
                        className="ui-press filter-chip rounded-full px-4 py-2 text-[13.5px] font-medium"
                      >
                        علامة: {b.name}
                      </button>
                    ))}
                  </div>
                )}

                <ul className="flex flex-col">
                  {result.products.map((p) => (
                    <li key={p.id} className="hairline-b">
                      <button
                        type="button"
                        onClick={() => openProduct(p.id)}
                        className="catalog-search-hit ui-press"
                      >
                        <span className="catalog-search-hit__thumb catalog-stage">
                          <ProductStage product={p} density="thumb" />
                        </span>
                        <span className="catalog-search-hit__body">
                          <span className="catalog-search-hit__name">{p.name}</span>
                          <span className="catalog-search-hit__meta">
                            <span dir="ltr">{p.id}</span>
                            <span aria-hidden> · </span>
                            {categoryOf(p).name}
                            <span aria-hidden> · </span>
                            {headlineSpec(p)}
                          </span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>

                {result.total > result.products.length && (
                  <button
                    type="button"
                    onClick={submitFull}
                    className="motion-link ui-press self-start text-[14.5px] text-link font-medium underline-offset-4 hover:underline"
                  >
                    عرض كل النتائج ({result.total})
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
