import { Link } from 'react-router-dom'
import { Search, Star } from 'lucide-react'
import { useCatalogEngagement } from '../../context/CatalogEngagementContext'
import { categoryById } from '../../data/categories'
import { btn } from '../../lib/buttonStyles'

export default function CatalogHeader({
  title,
  intro,
  count,
  query,
  onClearQuery,
  onOpenSearch,
}: {
  title: string
  intro?: string
  count: number
  query?: string
  onClearQuery?: () => void
  onOpenSearch: () => void
}) {
  const { favoriteIds } = useCatalogEngagement()
  const favCount = favoriteIds.length

  return (
    <header className="catalog-page-head">
      <div className="min-w-0 flex-1">
        <p className="text-[12px] font-medium tracking-wide text-foreground-muted">كتالوج المنتجات</p>
        <h1 className="display mt-1 text-[1.35rem] text-foreground sm:text-[1.5rem] lg:text-[1.65rem]">{title}</h1>
        {intro && <p className="mt-2 max-w-2xl text-[14px] leading-7 text-foreground-muted">{intro}</p>}
        <p className="mt-3 text-[14px] text-foreground-muted">
          <span className="font-medium text-foreground">{count}</span> صنف
          {query ? (
            <>
              {' '}
              · نتائج «{query}»{' '}
              {onClearQuery && (
                <button type="button" onClick={onClearQuery} className="font-medium text-accent underline-offset-4 hover:underline">
                  إلغاء البحث
                </button>
              )}
            </>
          ) : null}
        </p>
      </div>

      <div className="catalog-page-head-actions">
        <Link
          to="/products/favorites"
          className={btn('ghost', 'catalog-head-btn relative h-11 gap-2 rounded-[12px] px-3 text-[14px] sm:px-4')}
          aria-label={favCount > 0 ? `المفضلة — ${favCount} صنف` : 'المفضلة'}
        >
          <Star size={18} strokeWidth={1.75} aria-hidden />
          <span className="hidden sm:inline">المفضلة</span>
          {favCount > 0 && <span className="catalog-head-badge">{favCount > 99 ? '99+' : favCount}</span>}
        </Link>
        <button
          type="button"
          onClick={onOpenSearch}
          className={btn('secondary', 'catalog-head-btn gap-2 rounded-[12px] px-4 text-[14px]')}
          aria-label="بحث (Ctrl+K)"
        >
          <Search size={18} strokeWidth={1.75} aria-hidden />
          <span className="hidden sm:inline">بحث</span>
          <kbd className="catalog-kbd hidden lg:inline">⌘K</kbd>
        </button>
      </div>
    </header>
  )
}

export function catalogTitleForCategoryId(categoryId: string | null): { title: string; intro?: string } {
  if (!categoryId) {
    return { title: 'جميع الأصناف' }
  }
  const cat = categoryById(categoryId)
  if (!cat) return { title: 'الكتالوج' }
  return { title: cat.name, intro: cat.tagline }
}

export function CatalogCategoryTabs({
  currentSlug,
  buildHref,
}: {
  currentSlug: string | null
  buildHref: (slug: string | null) => string
}) {
  const tabs = [
    { slug: null as string | null, label: 'الكل' },
    { slug: 'pipes', label: 'مواسير بلاستيك' },
    { slug: 'brass', label: 'قطع النحاس' },
    { slug: 'fittings', label: 'الوصلات' },
    { slug: 'sanitary', label: 'الأدوات الصحية' },
  ]
  return (
    <nav className="catalog-section-tabs scroll-x" aria-label="أقسام سريعة">
      {tabs.map((t) => {
        const active = currentSlug === t.slug
        return (
          <Link
            key={t.slug ?? 'all'}
            to={buildHref(t.slug)}
            className={`catalog-section-tab${active ? ' catalog-section-tab--active' : ''}`}
            aria-current={active ? 'page' : undefined}
          >
            {t.label}
          </Link>
        )
      })}
    </nav>
  )
}
