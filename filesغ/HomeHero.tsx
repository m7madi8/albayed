import { useEffect, useRef, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Search } from 'lucide-react'
import { company } from '../../data/company'
import { HERO_ARTWORK } from '../../lib/brandAssets'
import { publicMediaUrl } from '../../lib/publicMediaUrl'
import { useCatalogSearch } from '../../context/SearchOpenContext'
import { btn } from '../../lib/buttonStyles'

const warehouse = HERO_ARTWORK.pipes // the aisle: real warehouse photography
const showroom = HERO_ARTWORK.default // the destination: finished project

const srcSetOf = (art: typeof warehouse) =>
  `${publicMediaUrl(art.src)} ${art.width}w, ${publicMediaUrl(art.fallback)} ${art.fallbackWidth}w`

const lineIndex = (i: number) => ({ ['--i' as string]: i }) as CSSProperties

/**
 * Home-only hero. BrandHero stays untouched for category pages.
 * Concept: "من المستودع إلى موقع المشروع" is literal — the warehouse aisle fills the plate,
 * the finished showroom is mounted across the seam between image and text.
 */
export default function HomeHero() {
  const { openSearch } = useCatalogSearch()
  const parallaxRef = useRef<HTMLDivElement>(null)

  // Direct style write (no React state): small, rAF-throttled, off under reduced motion.
  useEffect(() => {
    const el = parallaxRef.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const update = () => {
      raf = 0
      el.style.setProperty('--shift', `${Math.min(window.scrollY * 0.08, 40)}px`)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section className="aisle-hero" aria-labelledby="home-hero-title">
      <div className="aisle-hero__panel">
        <p className="aisle-hero__eyebrow">{company.legalName}</p>

        <div>
          <h1 id="home-hero-title" className="aisle-hero__title">
            <span className="aisle-hero__line aisle-hero__line--from" style={lineIndex(0)}>
              <span>من المستودع</span>
            </span>
            <span className="aisle-hero__line" style={lineIndex(1)}>
              <span>إلى موقع المشروع.</span>
            </span>
          </h1>
          <p className="aisle-hero__lead">{company.description}</p>

          <div className="aisle-hero__actions">
            <Link to="/products" className={btn('primary', 'aisle-hero__cta')}>
              تصفّح الكتالوج
            </Link>
            <Link to="/visit-order" className={btn('secondary', 'aisle-hero__cta')}>
              اطلب زيارة
            </Link>
            <button type="button" onClick={openSearch} className="aisle-hero__search">
              <Search size={18} strokeWidth={1.75} aria-hidden />
              بحث
            </button>
          </div>
        </div>
      </div>

      <div className="aisle-hero__plate">
        <div className="aisle-hero__parallax" ref={parallaxRef} aria-hidden>
          <img
            src={publicMediaUrl(warehouse.src)}
            srcSet={srcSetOf(warehouse)}
            sizes="(min-width: 1024px) 46vw, 100vw"
            alt=""
            width={warehouse.width}
            height={warehouse.height}
            className="aisle-hero__img"
            decoding="async"
            fetchPriority="high"
          />
        </div>
        <p className="aisle-tag" aria-hidden>
          <span className="aisle-num">01</span>
          <span className="aisle-label">المستودع</span>
          <span className="aisle-tag__next">
            <ArrowLeft size={14} strokeWidth={1.75} />
            <span className="aisle-num">02</span>
            <span className="aisle-label">موقع المشروع</span>
          </span>
        </p>
      </div>

      <div className="aisle-hero__inset" aria-hidden>
        <img
          src={publicMediaUrl(showroom.fallback)}
          srcSet={srcSetOf(showroom)}
          sizes="17rem"
          alt=""
          width={showroom.width}
          height={showroom.height}
          loading="lazy"
          decoding="async"
        />
        <p className="aisle-tag">
          <span className="aisle-num">02</span>
          <span className="aisle-label">موقع المشروع</span>
        </p>
      </div>
    </section>
  )
}
