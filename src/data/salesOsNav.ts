import type { LucideIcon } from 'lucide-react'
import {
  ClipboardList,
  LayoutDashboard,
  Package,
  Search,
  Settings,
  Users,
} from 'lucide-react'

export interface SalesOsNavItem {
  id: string
  label: string
  href: string
  icon: LucideIcon
  /** مطابقة تامة للمسار */
  end?: boolean
  /** يظهر في الشريط السفلي للجوال */
  mobile?: boolean
}

/** أقسام منشورة فقط — بدون وحدات غير مكتملة */
export const SALES_OS_NAV: SalesOsNavItem[] = [
  { id: 'overview', label: 'نظرة عامة', href: '/dashboard/overview', icon: LayoutDashboard, end: true, mobile: true },
  { id: 'customers', label: 'العملاء', href: '/dashboard/customers', icon: Users, mobile: true },
  { id: 'order', label: 'طلبية', href: '/dashboard/order', icon: ClipboardList, mobile: true },
  { id: 'products', label: 'المنتجات', href: '/products', icon: Package, mobile: false },
  { id: 'settings', label: 'الإعدادات', href: '/dashboard/settings', icon: Settings, mobile: false },
]

export const SALES_OS_SEARCH: SalesOsNavItem = {
  id: 'search',
  label: 'بحث',
  href: '#search',
  icon: Search,
  mobile: true,
}

export function salesOsLabel(id: string): string | undefined {
  return SALES_OS_NAV.find((i) => i.id === id)?.label
}

export function salesOsNavActive(pathname: string, href: string, end?: boolean): boolean {
  const base = href.split('?')[0]
  if (base === '/dashboard/customers') return pathname === base || pathname.startsWith(`${base}/`)
  if (end) return pathname === base
  return pathname === base || pathname.startsWith(`${base}/`)
}
