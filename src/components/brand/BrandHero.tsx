import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import { company, stats } from '../../data/company'
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
  const verifiedStat = stats[0]
  const [parallax, setParallax] = useState(0)

  useEffect(() => {
    if (section) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const onScroll = () => setParallax(Math.min(window.scrollY * 0.12, 24))
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [section])

  return (
    <section
      className={`brand-hero ${section ? 'brand-hero--section' : 'brand-hero--full'}${background === 'pipes' ? ' brand-hero--pipes' : ''}${background === 'brass' ? ' brand-hero--brass' : ''}`}
      aria-label="معرض المنتجات"
    >
      <div className="brand-hero-backdrop" aria-hidden style={{ ['--hero-parallax' as string]: `${parallax}px` }}>
        <svg className="brand-hero-blueprint" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
          <circle cx="200" cy="200" r="120" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.35" />
          <path d="M80 200 H320 M200 80 V320" stroke="currentColor" strokeWidth="0.5" opacity="0.25" />
          <rect x="140" y="140" width="120" height="120" fill="none" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
        </svg>
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
          <p className="brand-hero-eyebrow type-meta">{company.legalName}</p>
          <h1 className="brand-hero-title brand-hero-title--xl">
            من المستودع إلى موقع المشروع.
          </h1>
          <p className="brand-hero-lead type-lead mt-4 max-w-xl">{company.description}</p>
          <div className="brand-hero-actions mt-6">
            <Link to="/products" className={btn('primary', 'brand-hero-cta')}>
              تصفّح الكتالوج
            </Link>
            <Link to="/visit-order" className={btn('secondary', 'brand-hero-cta')}>
              اطلب زيارة
            </Link>
            <button
              type="button"
              onClick={openSearch}
              className={btn('ghost', 'brand-hero-cta gap-2')}
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

      {verifiedStat && !section ? (
        <div className="brand-hero-stat-bar container-x" aria-label="حقائق">
          <ul className="brand-hero-stat-list">
            <li className="type-data">
              <span className="brand-hero-stat-value" dir="ltr">
                {verifiedStat.value}
              </span>{' '}
              {verifiedStat.label}
            </li>
            <li className="type-caption text-ink-muted">علامات من مصادر متعددة</li>
            <li className="type-caption text-ink-muted">تغطية توزيع في الضفة</li>
          </ul>
        </div>
      ) : null}
    </section>
  )
}
