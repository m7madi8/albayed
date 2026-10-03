import { Link } from 'react-router-dom'

export type Crumb = { label: string; href?: string }

export default function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav className="catalog-breadcrumb type-caption" aria-label="مسار التصفح">
      <ol className="catalog-breadcrumb__list">
        {items.map((item, i) => {
          const last = i === items.length - 1
          return (
            <li key={`${item.label}-${i}`} className="catalog-breadcrumb__item">
              {i > 0 ? (
                <span className="catalog-breadcrumb__sep" aria-hidden>
                  ›
                </span>
              ) : null}
              {item.href && !last ? (
                <Link to={item.href} className="text-link">
                  {item.label}
                </Link>
              ) : (
                <span className={last ? 'text-foreground' : 'text-ink-muted'} aria-current={last ? 'page' : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
