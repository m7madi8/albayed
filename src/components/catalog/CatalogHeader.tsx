import { Link } from 'react-router-dom'
import { categoryById, categories } from '../../data/categories'

export default function CatalogHeader({
  title,
  intro,
  count,
  query,
  onClearQuery,
}: {
  title: string
  intro?: string
  count: number
  query?: string
  onClearQuery?: () => void
}) {
  return (
    <header className="catalog-page-head">
      <div className="min-w-0 flex-1">
        <p className="type-eyebrow">كتالوج المنتجات</p>
        <h1 className="display mt-1 text-[1.35rem] text-foreground sm:text-[1.5rem] lg:text-[1.65rem]">{title}</h1>
        {intro && <p className="type-lead-body mt-2 max-w-2xl">{intro}</p>}
        <p className="mt-3 text-[14px] text-foreground-muted">
          <span className="font-medium text-foreground">{count}</span> صنف
          {query ? (
            <>
              {' '}
              · نتائج «{query}»{' '}
              {onClearQuery && (
                <button type="button" onClick={onClearQuery} className="text-link font-medium">
                  إلغاء البحث
                </button>
              )}
            </>
          ) : null}
        </p>
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
    { slug: null as string | null, label: 'الكل', count: categories.reduce((n, c) => n + c.productCount, 0) },
    ...categories.map((c) => ({ slug: c.slug, label: c.name, count: c.productCount })),
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
            <span className="catalog-section-tab__count">{t.count.toLocaleString('ar-EG')}</span>
          </Link>
        )
      })}
    </nav>
  )
}
