import { Search } from 'lucide-react'
import { useCatalogSearch } from '../../context/SearchOpenContext'

export default function CatalogIntro({
  title,
  intro,
  count,
  totalPool,
  query,
  onClearQuery,
}: {
  title: string
  intro?: string
  count: number
  totalPool?: number
  query?: string
  onClearQuery?: () => void
}) {
  const { openSearch } = useCatalogSearch()

  return (
    <header className="cp-intro">
      <div className="cp-intro__copy">
        <p className="cp-intro__kicker">فهرس المنتجات</p>
        <h1 className="cp-intro__title">{title}</h1>
        {intro ? <p className="cp-intro__lead">{intro}</p> : null}
        <p className="cp-intro__meta">
          <strong>{count.toLocaleString('en-US')}</strong> صنف معروض
          {totalPool != null && totalPool !== count ? (
            <>
              {' '}
              من <strong>{totalPool.toLocaleString('en-US')}</strong>
            </>
          ) : null}
          {query ? (
            <>
              {' '}
              · بحث: «{query}»{' '}
              {onClearQuery ? (
                <button type="button" onClick={onClearQuery} className="cp-empty__link">
                  إلغاء
                </button>
              ) : null}
            </>
          ) : null}
        </p>
      </div>
      <div className="cp-intro__actions">
        <button type="button" className="cp-search-trigger" onClick={openSearch}>
          <Search size={18} strokeWidth={1.75} aria-hidden />
          <span>بحث بالاسم أو رقم الصنف…</span>
          <span className="cp-search-trigger__hint" aria-hidden>Ctrl K</span>
        </button>
        <span className="cp-stat-pill" aria-hidden>
          {count.toLocaleString('en-US')} نتيجة
        </span>
      </div>
    </header>
  )
}
