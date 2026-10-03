import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { categories } from '../../data/categories'

export default function CatalogCategoryRail({
  currentSlug,
  buildHref,
}: {
  currentSlug: string | null
  buildHref: (slug: string | null) => string
}) {
  const tabs = [
    { slug: null as string | null, label: 'جميع الأصناف', count: categories.reduce((n, c) => n + c.productCount, 0), tone: '#8a8c86' },
    ...categories.map((c) => ({
      slug: c.slug,
      label: c.name,
      count: c.productCount,
      tone: c.tone ?? 'var(--cp-accent)',
    })),
  ]

  return (
    <nav className="cp-cat-rail" aria-label="التصنيفات">
      <div className="cp-cat-rail__track">
        {tabs.map((t) => {
          const active = currentSlug === t.slug
          return (
            <Link
              key={t.slug ?? 'all'}
              to={buildHref(t.slug)}
              className={`cp-cat-card${active ? ' cp-cat-card--active' : ''}`}
              style={{ '--cp-cat-tone': t.tone } as CSSProperties}
              aria-current={active ? 'page' : undefined}
            >
              <span className="cp-cat-card__label">{t.label}</span>
              <span className="cp-cat-card__count">{t.count.toLocaleString('ar-EG')}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
