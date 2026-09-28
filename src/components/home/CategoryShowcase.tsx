import { Link } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { categories } from '../../data/categories'
import { HERO_ARTWORK, heroBackgroundForSection } from '../../lib/brandAssets'
import { publicMediaUrl } from '../../lib/publicMediaUrl'
import { ButtonLink } from '../ui/Button'

const SALES_CATEGORIES = categories.filter((c) => c.id === 'pipes' || c.id === 'brass')

export default function CategoryShowcase() {
  return (
    <section className="container-x home-catalog-section" aria-labelledby="home-categories-heading">
      <div className="home-catalog-header">
        <div>
          <p className="type-meta">التصنيفات</p>
          <h2 id="home-categories-heading" className="type-heading mt-2">
            خطوط المنتجات
          </h2>
        </div>
        <ButtonLink
          to="/products"
          variant="ghost"
          className="type-button hidden h-11 shrink-0 px-4 sm:inline-flex"
        >
          الكتالوج الكامل
          <ChevronLeft size={16} className="rotate-180" aria-hidden />
        </ButtonLink>
      </div>

      <div className="home-category-grid">
        {SALES_CATEGORIES.map((c) => {
          const bg = heroBackgroundForSection(c.id)
          const art = HERO_ARTWORK[bg]
          return (
            <Link key={c.id} to={`/products?category=${c.slug}`} className="home-category-card group">
              <div className={`home-category-cover home-category-cover--${bg}`}>
                <img
                  src={publicMediaUrl(art.fallback)}
                  srcSet={`${publicMediaUrl(art.src)} ${art.width}w, ${publicMediaUrl(art.fallback)} ${art.fallbackWidth}w`}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  alt=""
                  className="home-category-cover-img"
                  width={art.width}
                  height={art.height}
                  loading="lazy"
                  decoding="async"
                />
                <div className="home-category-cover-scrim" aria-hidden />
              </div>
              <div className="home-category-body">
                <div className="min-w-0 flex-1">
                  <p className="type-caption">
                    {c.productCount.toLocaleString('ar-EG')}+ صنف
                  </p>
                  <h3 className="type-heading mt-1">
                    {c.name}
                  </h3>
                </div>
                <span className="home-category-arrow" aria-hidden>
                  <ChevronLeft size={18} strokeWidth={2} />
                </span>
              </div>
            </Link>
          )
        })}
      </div>

      <div className="mt-8 sm:hidden">
        <ButtonLink to="/products" variant="light" className="type-button h-12 w-full">
          الكتالوج الكامل
        </ButtonLink>
      </div>
    </section>
  )
}
