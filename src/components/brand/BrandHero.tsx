import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import { company } from '../../data/company'
import { BRAND_LOGO_HERO, HERO_ARTWORK, type HeroBackground } from '../../lib/brandAssets'
import { publicMediaUrl } from '../../lib/publicMediaUrl'
import { useCatalogSearch } from '../../context/SearchOpenContext'
import { btn } from '../../lib/buttonStyles'

export default function BrandHero({
  size = 'full',
  background = 'default',
}: {
  size?: 'full' | 'section'
  background?: HeroBackground
}) {
  const section = size === 'section'
  const art = HERO_ARTWORK[background]
  const { openSearch } = useCatalogSearch()

  return (
    <section
      className={`brand-hero ${section ? 'brand-hero--section' : 'brand-hero--full'}${background === 'pipes' ? ' brand-hero--pipes' : ''}${background === 'brass' ? ' brand-hero--brass' : ''}`}
      aria-label="معرض المنتجات"
    >
      <div className="brand-hero-backdrop" aria-hidden>
        <img
          src={publicMediaUrl(art.src)}
          srcSet={`${publicMediaUrl(art.src)} ${art.width}w, ${publicMediaUrl(art.fallback)} ${art.fallbackWidth}w`}
          sizes="100vw"
          alt=""
          className="brand-hero-image brand-hero-image--layer"
          width={art.width}
          height={art.height}
          decoding="async"
          fetchPriority={section ? 'auto' : 'high'}
        />
        <div className="brand-hero-scrim" />
      </div>

      <div className="brand-hero-content container-x">
        <div className="brand-hero-copy">
          <h1 className="brand-hero-title display">{company.showroom}</h1>
          <div className="brand-hero-actions">
            <Link to="/products" className={btn('primary', 'brand-hero-cta')}>
              تصفح المنتجات
            </Link>
            <button
              type="button"
              onClick={openSearch}
              className={btn('secondary', 'brand-hero-cta brand-hero-cta--ghost gap-2')}
            >
              <Search size={18} strokeWidth={1.75} aria-hidden />
              بحث
            </button>
          </div>
        </div>

        <Link to="/" className="brand-hero-logo-link" aria-label={`${company.legalName} — الرئيسية`}>
          <img
            src={BRAND_LOGO_HERO}
            alt=""
            width={360}
            height={335}
            className="brand-hero-logo"
            decoding="async"
          />
        </Link>
      </div>
    </section>
  )
}
