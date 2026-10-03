import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { categories } from '../../../data/categories'
import { categoryLiveCount, formatCatalogNum, totalCatalogCount } from '../../../lib/catalogCounts'
import { HERO_ARTWORK, heroBackgroundForSection } from '../../../lib/brandAssets'
import { publicMediaUrl } from '../../../lib/publicMediaUrl'

const pad = (n: number) => String(n + 1).padStart(2, '0')

const items = categories.map((c) => {
  const bg = heroBackgroundForSection(c.id)
  return { c, bg, art: HERO_ARTWORK[bg] }
})

const previewKeys = Array.from(new Set(items.map((i) => i.bg)))

export default function AisleDirectory({
  buildHref,
  onBrowseAll,
}: {
  buildHref: (slug: string) => string
  onBrowseAll: () => void
}) {
  const [active, setActive] = useState(0)

  return (
    <section className="sh-aisle-index aisle-index" aria-labelledby="catalog-aisle-heading">
      <div className="sh-aisle-index__inner">
        <div className="aisle-index__head">
          <div>
            <p className="aisle-eyebrow">كتالوج البايد</p>
            <h1 id="catalog-aisle-heading" className="aisle-h2 mt-3">
              اختر عائلة المنتجات
            </h1>
            <p className="type-lead-body mt-3 max-w-xl text-foreground-muted">
              {formatCatalogNum(totalCatalogCount())} صنف — من المواسير إلى الأدوات الصحية. ابدأ من القسم أو تصفّح الكل.
            </p>
          </div>
          <button type="button" className="aisle-textlink" onClick={onBrowseAll}>
            تصفح كل الأصناف
            <ArrowLeft size={16} strokeWidth={1.75} aria-hidden />
          </button>
        </div>

        <div className="aisle-index__grid">
          <ul className="aisle-list">
            {items.map(({ c, art }, i) => (
              <li key={c.id} className="aisle-reveal">
                <Link
                  to={buildHref(c.slug)}
                  className="aisle-row"
                  data-active={i === active ? true : undefined}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                >
                  <span className="aisle-num" aria-hidden>{pad(i)}</span>
                  <span className="aisle-row__text">
                    <span className="aisle-label">{c.name}</span>
                    <span className="aisle-row__title">{c.tagline}</span>
                    <span className="sh-aisle-meta">
                      {formatCatalogNum(categoryLiveCount(c.slug))} صنف
                    </span>
                  </span>
                  <img
                    src={publicMediaUrl(art.fallback)}
                    alt=""
                    width={96}
                    height={96}
                    className="aisle-row__thumb"
                    loading="lazy"
                    decoding="async"
                  />
                  <ArrowLeft className="aisle-row__arrow" size={20} strokeWidth={1.5} aria-hidden />
                </Link>
              </li>
            ))}
          </ul>

          <aside className="aisle-preview" aria-hidden>
            <div className="aisle-preview__frame">
              {previewKeys.map((k) => {
                const art = HERO_ARTWORK[k]
                return (
                  <img
                    key={k}
                    src={publicMediaUrl(art.fallback)}
                    srcSet={`${publicMediaUrl(art.src)} ${art.width}w, ${publicMediaUrl(art.fallback)} ${art.fallbackWidth}w`}
                    sizes="(min-width: 1024px) 40vw, 0px"
                    alt=""
                    width={art.width}
                    height={art.height}
                    className={`aisle-preview__img aisle-preview__img--${k}`}
                    data-active={items[active].bg === k ? true : undefined}
                    loading="lazy"
                    decoding="async"
                  />
                )
              })}
            </div>
            <p className="aisle-preview__cap">
              <span className="aisle-num">{pad(active)}</span>
              <span className="aisle-label">{items[active].c.name}</span>
            </p>
          </aside>
        </div>
      </div>
    </section>
  )
}
