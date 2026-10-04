import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ClipboardList, Package, Plus } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { company } from '../../data/company'
import { SITE_HERO_ART } from '../../lib/brandAssets'
import { publicMediaUrl } from '../../lib/publicMediaUrl'
import { loadAllClients } from '../../lib/customClients'
import { loadSubmittedOrders } from '../../lib/submittedOrders'
import { useVisitOrder } from '../../context/VisitOrderContext'
import { activateRepMode } from '../../lib/catalogRepMode'
import { btn } from '../../lib/buttonStyles'
import { EASE_OUT, MOTION_DURATION } from '../../lib/motionPresets'

const heroArt = SITE_HERO_ART
const heroSrcSet = `${publicMediaUrl(heroArt.src)} ${heroArt.width}w, ${publicMediaUrl(heroArt.fallback)} ${heroArt.fallbackWidth}w`

const REP_NAME = 'مندوب المبيعات'

function greetingForHour(h: number) {
  if (h < 12) return 'صباح الخير'
  if (h < 17) return 'نهارك سعيد'
  return 'مساء الخير'
}

function formatToday() {
  return new Intl.DateTimeFormat('ar-EG', {
    numberingSystem: 'latn',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date())
}

const fade = (reduce: boolean, delay = 0) => ({
  hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: MOTION_DURATION.base, ease: EASE_OUT, delay },
  },
})

/** Overview command hero — one brand background, sales-rep workspace (not marketing). */
export default function SalesWorkspaceHero() {
  const reduce = useReducedMotion()
  const { clientLabel, lineCount, unitCount, hasClient } = useVisitOrder()
  const clients = useMemo(() => loadAllClients(), [])
  const pendingOrders = useMemo(
    () => loadSubmittedOrders().filter((o) => o.status === 'pending').length,
    [],
  )

  const greeting = useMemo(() => greetingForHour(new Date().getHours()), [])
  const today = useMemo(() => formatToday(), [])

  const focus = useMemo(() => {
    if (lineCount > 0) {
      return {
        label: 'طلبية الزيارة',
        detail: `${lineCount} صنف · ${unitCount} وحدة${clientLabel ? ` — ${clientLabel}` : ''}`,
        href: '/visit-order',
        cta: 'مراجعة الطلبية',
        urgent: true,
      }
    }
    if (pendingOrders > 0) {
      return {
        label: 'اعتماد الطلبيات',
        detail: `${pendingOrders} طلبية بانتظار المراجعة`,
        href: '/dashboard/orders',
        cta: 'فتح الطلبيات',
        urgent: true,
      }
    }
    if (!hasClient && clients.length === 0) {
      return {
        label: 'البداية',
        detail: 'أضف عميلاً ثم افتح الكتالوج لبناء طلبية الزيارة.',
        href: '/dashboard/customers?new=1',
        cta: 'عميل جديد',
        urgent: false,
      }
    }
    return {
      label: 'جلسة اليوم',
      detail: hasClient ? `العميل الحالي: ${clientLabel}` : 'حدّد العميل من الكتالوج قبل إضافة الأصناف.',
      href: '/products',
      cta: 'فتح الكتالوج',
      urgent: false,
    }
  }, [lineCount, unitCount, clientLabel, pendingOrders, hasClient, clients.length])

  return (
    <section className="rep-hero site-hero" aria-labelledby="rep-hero-title">
      <img
        className="rep-hero__bg site-hero__bg"
        src={publicMediaUrl(heroArt.fallback)}
        srcSet={heroSrcSet}
        sizes="100vw"
        alt=""
        width={heroArt.width}
        height={heroArt.height}
        decoding="async"
        fetchPriority="high"
      />
      <div className="rep-hero__scrim site-hero__scrim" aria-hidden />

      <div className="rep-hero__inner">
        <motion.div
          className="rep-hero__command"
          initial="hidden"
          animate="visible"
          variants={fade(!!reduce)}
        >
          <div className="rep-hero__meta">
            <p className="rep-hero__kicker">{company.latin}</p>
            <p className="rep-hero__date">{today}</p>
          </div>

          <div className="rep-hero__intro">
            <p className="rep-hero__greet">{greeting}</p>
            <h1 id="rep-hero-title" className="rep-hero__name">{REP_NAME}</h1>
            <p className="rep-hero__role">مساحة المندوب · {company.name}</p>
          </div>

          <div className={`rep-hero__focus${focus.urgent ? ' rep-hero__focus--urgent' : ''}`}>
            <p className="rep-hero__focus-label">{focus.label}</p>
            <p className="rep-hero__focus-detail">{focus.detail}</p>
            <Link to={focus.href} className="rep-hero__focus-link">
              <span>{focus.cta}</span>
              <ArrowLeft size={16} strokeWidth={1.75} aria-hidden />
            </Link>
          </div>

          <div className="rep-hero__actions">
            <Link
              to="/products"
              onClick={() => activateRepMode(true)}
              className={btn('primary', 'rep-hero__btn')}
            >
              <Package size={18} strokeWidth={1.75} aria-hidden />
              الكتالوج
            </Link>
            <Link to="/dashboard/customers?new=1" className={btn('secondary', 'rep-hero__btn')}>
              <Plus size={18} strokeWidth={1.75} aria-hidden />
              عميل
            </Link>
            <Link to="/dashboard/orders" className="rep-hero__ghost-btn">
              <ClipboardList size={18} strokeWidth={1.75} aria-hidden />
              الطلبيات
              {pendingOrders > 0 ? (
                <span className="rep-hero__pill" dir="ltr">{pendingOrders}</span>
              ) : null}
            </Link>
          </div>

          <dl className="rep-hero__pulse">
            <div className="rep-hero__pulse-item">
              <dt>طلبية الزيارة</dt>
              <dd dir="ltr">{lineCount > 0 ? `${lineCount} صنف` : '—'}</dd>
            </div>
            <div className="rep-hero__pulse-item">
              <dt>بانتظار الاعتماد</dt>
              <dd dir="ltr">{pendingOrders || '—'}</dd>
            </div>
            <div className="rep-hero__pulse-item">
              <dt>العملاء</dt>
              <dd dir="ltr">{clients.length}</dd>
            </div>
          </dl>
        </motion.div>

        <div className="rep-hero__stage" aria-hidden>
          <p className="rep-hero__stage-cap">
            <span className="rep-hero__stage-num" dir="ltr">{company.latin}</span>
            <span>{company.showroom}</span>
          </p>
        </div>
      </div>
    </section>
  )
}
