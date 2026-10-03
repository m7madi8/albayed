import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import { company } from '../../data/company'
import { SITE_HERO_ART } from '../../lib/brandAssets'
import { publicMediaUrl } from '../../lib/publicMediaUrl'
import { useCatalogSearch } from '../../context/SearchOpenContext'
import { btn } from '../../lib/buttonStyles'
import Logo from '../ui/Logo'
import HeroLedger from './HeroLedger'

const heroArt = SITE_HERO_ART
const heroSrcSet = `${publicMediaUrl(heroArt.src)} ${heroArt.width}w, ${publicMediaUrl(heroArt.fallback)} ${heroArt.fallbackWidth}w`

/** Home hero — one viewport, logo, actions, ledger strip at bottom. */
export default function HomeHero() {
  const { openSearch } = useCatalogSearch()

  return (
    <section className="hero-vault site-hero" aria-label={company.legalName}>
      <div className="site-hero__bg-layer">
        <img
          className="site-hero__bg"
          src={publicMediaUrl(heroArt.fallback)}
          srcSet={heroSrcSet}
          sizes="100vw"
          alt=""
          width={heroArt.width}
          height={heroArt.height}
          decoding="async"
          fetchPriority="high"
        />
      </div>
      <div className="site-hero__scrim" aria-hidden />

      <div className="hero-vault__canvas">
        <div className="hero-vault__stack">
          <h1 className="sr-only">{company.legalName}</h1>
          <div className="hero-vault__brand">
            <Logo variant="default" onDark />
          </div>

          <div className="hero-vault__action-bar">
            <Link to="/products" className={btn('primary', 'hero-vault__cta')}>
              تصفّح الكتالوج
            </Link>
            <button type="button" onClick={openSearch} className="hero-vault__search" aria-label="بحث المنتجات">
              <Search size={18} strokeWidth={1.75} aria-hidden />
              <span>بحث</span>
            </button>
          </div>
        </div>

        <HeroLedger />
      </div>
    </section>
  )
}
