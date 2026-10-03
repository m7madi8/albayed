import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { categories } from '../../data/categories'
import { HERO_ARTWORK, heroBackgroundForSection } from '../../lib/brandAssets'
import { publicMediaUrl } from '../../lib/publicMediaUrl'

const items = categories.slice(0, 5).map((c) => {
  const bg = heroBackgroundForSection(c.id)
  return { c, bg, art: HERO_ARTWORK[bg] }
})
const previewKeys = Array.from(new Set(items.map((i) => i.bg)))
const pad = (n: number) => String(n + 1).padStart(2, '0')

/** The catalog as an index of aisles: one list, one sticky plate that follows the pointer. */
export default function CategoryShowcase() {
  const [active, setActive] = useState(0)

  return (
    <section className="aisle-index" aria-labelledby="home-categories-heading">
      <div className="container-x">
        <div className="aisle-index__head">
          <div>
            <p className="aisle-eyebrow">فهرس الكتالوج</p>
            <h2 id="home-categories-heading" className="aisle-h2 mt-3">
              التصنيفات الرئيسية
            </h2>
          </div>
          <Link to="/products" className="aisle-textlink">
            الكتالوج الكامل
            <ArrowLeft size={16} strokeWidth={1.75} aria-hidden />
          </Link>
        </div>

        <div className="aisle-index__grid">
          <ul className="aisle-list">
            {items.map(({ c, art }, i) => (
              <li key={c.id} className="aisle-reveal">
                <Link
                  to={`/products?category=${c.slug}`}
                  className="aisle-row"
                  data-active={i === active}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                >
                  <span className="aisle-num" aria-hidden>
                    {pad(i)}
                  </span>
                  <span className="aisle-row__text">
                    <span className="aisle-label">{c.name}</span>
                    <span className="aisle-row__title">{c.tagline}</span>
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
                    data-active={items[active].bg === k}
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
