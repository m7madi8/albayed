import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { BRAND_LOGO_HERO, HERO_ARTWORK } from '../../lib/brandAssets'
import { publicMediaUrl } from '../../lib/publicMediaUrl'
import { btn } from '../../lib/buttonStyles'

const macro = HERO_ARTWORK.brass

export default function ContactCTA() {
  return (
    <section className="aisle-close" aria-labelledby="home-close-heading">
      <div className="aisle-close__bg" aria-hidden>
        <img
          src={publicMediaUrl(macro.fallback)}
          alt=""
          width={macro.fallbackWidth}
          height={Math.round((macro.fallbackWidth * macro.height) / macro.width)}
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="container-x aisle-close__inner">
        <div>
          <h2 id="home-close-heading" className="aisle-close__title">
            خطوتك التالية
          </h2>
          <p className="aisle-close__text">
            فريقنا جاهز لمساعدتك في إيجاد المنتج المناسب من بين آلاف الأصناف.
          </p>
          <div className="aisle-close__actions">
            <Link to="/contact" className={btn('primary', 'shrink-0')}>
              تواصل معنا
            </Link>
            <Link to="/visit-order" className="aisle-textlink aisle-textlink--on-dark">
              اطلب زيارة
              <ArrowLeft size={16} strokeWidth={1.75} aria-hidden />
            </Link>
          </div>
        </div>

        <img
          src={BRAND_LOGO_HERO}
          alt=""
          width={360}
          height={335}
          className="aisle-close__logo"
          decoding="async"
          loading="lazy"
        />
      </div>
    </section>
  )
}
