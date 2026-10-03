import { Link } from 'react-router-dom'
import { brands, originMap } from '../../lib/catalog'

// Static data → group once at module load, largest source first.
const groups = (() => {
  const m = new Map<string, typeof brands>()
  for (const b of brands) m.set(b.originId, [...(m.get(b.originId) ?? []), b])
  return [...m.entries()]
    .map(([id, list]) => ({ id, name: originMap.get(id)?.name ?? '', list }))
    .sort((a, b) => b.list.length - a.list.length || a.name.localeCompare(b.name, 'ar'))
})()

/** Brands by country of origin — the real shape of a multi-source distributor. */
export default function BrandShowcase() {
  return (
    <section className="aisle-sources" aria-labelledby="home-brands-heading">
      <div className="container-x aisle-sources__grid">
        <div className="aisle-sources__head">
          <p className="aisle-eyebrow">حسب بلد المنشأ</p>
          <h2 id="home-brands-heading" className="aisle-h2 mt-3">
            العلامات التجارية
          </h2>
          <p className="aisle-small aisle-sources__intro">
            نوفّر منتجات من علامات متعددة المصادر، لتناسب مستويات الجودة والميزانية المختلفة.
          </p>
        </div>

        <ul className="aisle-origins">
          {groups.map((g) => (
            <li key={g.id} className="aisle-origin aisle-reveal">
              <div className="aisle-origin__name">
                <h3 className="aisle-origin__title">{g.name}</h3>
                <span className="aisle-num" dir="ltr">
                  {String(g.list.length).padStart(2, '0')}
                </span>
              </div>
              <ul className="aisle-brands">
                {g.list.map((b) => (
                  <li key={b.id}>
                    <Link to={`/products?brand=${encodeURIComponent(b.name)}`} className="aisle-brand">
                      <span className="aisle-brand__latin">{b.latin}</span>
                      <span className="aisle-brand__ar">{b.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
