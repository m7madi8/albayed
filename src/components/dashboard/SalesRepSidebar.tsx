import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  Banknote,
  Bell,
  ChevronDown,
  ClipboardList,
  FileText,
  Home,
  LayoutDashboard,
  ShoppingBag,
  UserPlus,
  Users,
  Wallet,
  X,
  type LucideIcon,
} from 'lucide-react'
import { APP_NAV, DASHBOARD_NAV, type DashboardNavChild, type DashboardNavItem } from '../../data/dashboardNav'
import { BRAND_LOGO_FULL, BRAND_LOGO_ON_DARK } from '../../lib/brandAssets'
import { EASE_OUT } from '../../lib/motionPresets'
import { useVisitOrder } from '../../context/VisitOrderContext'
import { useTheme } from '../../context/ThemeContext'
import ThemeToggle from '../ui/ThemeToggle'

const ICONS: Record<NonNullable<DashboardNavItem['icon']>, LucideIcon> = {
  home: Home,
  'shopping-bag': ShoppingBag,
  'layout-dashboard': LayoutDashboard,
  users: Users,
  'clipboard-list': ClipboardList,
  'file-text': FileText,
  wallet: Wallet,
  bell: Bell,
}

const CHILD_ICONS: Record<NonNullable<DashboardNavChild['icon']>, LucideIcon> = {
  'user-plus': UserPlus,
  banknote: Banknote,
}

function pathMatches(pathname: string, href: string, end?: boolean) {
  const base = href.split('?')[0]
  if (end) return pathname === base
  if (base === '/dashboard/customers') return pathname === base || pathname.startsWith(`${base}/`)
  return pathname === base || pathname.startsWith(`${base}/`)
}

function itemActive(pathname: string, search: string, item: DashboardNavItem) {
  if (item.children?.length) {
    if (item.children.some((c) => childActive(pathname, search, c))) return true
  }
  return pathMatches(pathname, item.href, item.end)
}

function childActive(pathname: string, search: string, child: DashboardNavChild) {
  const [path, query] = child.href.split('?')
  if (query) {
    return pathname === path && search.includes(query)
  }
  return pathMatches(pathname, child.href)
}

function NavRow({
  to,
  label,
  icon: Icon,
  active,
  isChild,
  badge,
  onNavigate,
}: {
  to: string
  label: string
  icon: LucideIcon
  active: boolean
  isChild?: boolean
  badge?: number
  onNavigate: () => void
}) {
  return (
    <Link
      to={to}
      onClick={onNavigate}
      className={`rep-nav-row focus-ring${active ? ' rep-nav-row--active' : ''}${isChild ? ' rep-nav-row--child' : ''}`}
      aria-current={active ? 'page' : undefined}
    >
      {active && !isChild && <span className="rep-nav-indicator" aria-hidden />}
      <Icon size={isChild ? 22 : 26} strokeWidth={1.75} className="rep-nav-icon" aria-hidden />
      <span className="rep-nav-label">{label}</span>
      {badge != null && badge > 0 ? (
        <span className="rep-nav-badge" data-active={active || undefined}>
          {badge > 99 ? '99+' : badge}
        </span>
      ) : null}
    </Link>
  )
}

function NavBlock({
  items,
  pathname,
  search,
  ordersBadge,
  onNavigate,
}: {
  items: DashboardNavItem[]
  pathname: string
  search: string
  ordersBadge: number
  onNavigate: () => void
}) {
  return (
    <>
      {items.map((item) => {
        const Icon = item.icon ? ICONS[item.icon] : LayoutDashboard
        const active = itemActive(pathname, search, item)
        const showChildren = item.children && item.children.length > 0 && active
        const badge = (item.id === 'order' || item.id === 'orders') && ordersBadge > 0 ? ordersBadge : undefined

        return (
          <div key={item.id} className="rep-nav-group">
            <NavRow
              to={item.href}
              label={item.label}
              icon={Icon}
              active={active}
              badge={badge}
              onNavigate={onNavigate}
            />
            {showChildren && (
              <div className="rep-nav-children">
                {item.children!.map((child) => {
                  const ChildIcon = child.icon ? CHILD_ICONS[child.icon] : UserPlus
                  return (
                    <NavRow
                      key={child.id}
                      to={child.href}
                      label={child.label}
                      icon={ChildIcon}
                      active={childActive(pathname, search, child)}
                      isChild
                      onNavigate={onNavigate}
                    />
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </>
  )
}

function SidebarUserMenu() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  return (
    <div ref={ref} className="rep-sidebar-user">
      <button
        type="button"
        className="rep-sidebar-user-trigger focus-ring"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span className="rep-sidebar-user-avatar" aria-hidden>م</span>
        <span className="rep-sidebar-user-meta">
          <span className="rep-sidebar-user-name">مندوب المبيعات</span>
          <span className="rep-sidebar-user-role">بوابة البايض</span>
        </span>
        <ChevronDown size={20} className="rep-sidebar-user-chevron" aria-hidden />
      </button>
      {open && (
        <div className="rep-sidebar-user-menu" role="menu">
          <ThemeToggle variant="menu" />
        </div>
      )}
    </div>
  )
}

export default function SalesRepSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const reduce = useReducedMotion()
  const { pathname, search } = useLocation()
  const { lineCount } = useVisitOrder()
  const { theme } = useTheme()
  const logoSrc = theme === 'dark' ? BRAND_LOGO_ON_DARK : BRAND_LOGO_FULL

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  const panelMotion = reduce
    ? {}
    : {
        initial: { x: 28, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: 24, opacity: 0 },
        transition: { duration: 0.34, ease: EASE_OUT },
      }

  const onNavigate = () => onClose()

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="rep-sidebar-root"
          role="presentation"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
        >
          <button type="button" className="rep-sidebar-backdrop" aria-label="إغلاق القائمة" onClick={onClose} />
          <motion.aside className="rep-sidebar" aria-label="القائمة الجانبية" {...panelMotion}>
            <div className="rep-sidebar-head">
              <div className="rep-sidebar-brand">
                <img src={logoSrc} alt="" className="rep-sidebar-logo" width={220} height={52} decoding="async" />
                <p className="rep-sidebar-tagline">بوابة المبيعات</p>
              </div>
              <button type="button" onClick={onClose} className="rep-sidebar-close focus-ring" aria-label="إغلاق">
                <X size={28} strokeWidth={1.75} />
              </button>
            </div>

            <nav className="rep-sidebar-nav" aria-label="التنقل الرئيسي">
              <div className="rep-sidebar-nav-fill">
                <section className="rep-sidebar-nav-section">
                  <p className="rep-sidebar-section-label">التطبيق</p>
                  <div className="rep-nav-stack">
                    <NavBlock
                      items={APP_NAV}
                      pathname={pathname}
                      search={search}
                      ordersBadge={lineCount}
                      onNavigate={onNavigate}
                    />
                  </div>
                </section>

                <section className="rep-sidebar-nav-section">
                  <p className="rep-sidebar-section-label">لوحة المندوب</p>
                  <div className="rep-nav-stack">
                    <NavBlock
                      items={DASHBOARD_NAV}
                      pathname={pathname}
                      search={search}
                      ordersBadge={lineCount}
                      onNavigate={onNavigate}
                    />
                  </div>
                </section>
              </div>
            </nav>

            <div className="rep-sidebar-foot">
              <SidebarUserMenu />
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
