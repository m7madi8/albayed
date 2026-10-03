import { Link } from 'react-router-dom'
import { categories } from '../../../data/categories'
import { categoryLiveCount, formatCatalogNum } from '../../../lib/catalogCounts'

export default function FamilyBar({
  currentSlug,
  buildHref,
  showAllLink,
}: {
  currentSlug: string | null
  buildHref: (slug: string | null) => string
  showAllLink?: boolean
}) {
  const tabs = [
    ...(showAllLink ? [{ slug: null as string | null, label: 'الكل' }] : []),
    ...categories.map((c) => ({ slug: c.slug, label: c.name })),
  ]

  return (
    <nav className="sh-family-bar" aria-label="عائلات المنتجات">
      <div className="sh-family-bar__scroll">
        {tabs.map((t) => {
          const active = currentSlug === t.slug
          const count = t.slug ? categoryLiveCount(t.slug) : undefined
          return (
            <Link
              key={t.slug ?? 'all'}
              to={buildHref(t.slug)}
              className={`sh-family-bar__tab${active ? ' sh-family-bar__tab--active' : ''}`}
              aria-current={active ? 'page' : undefined}
            >
              {t.label}
              {count !== undefined ? (
                <span className="sh-family-bar__tab-count">{formatCatalogNum(count)}</span>
              ) : null}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
