export interface DashboardNavChild {
  id: string
  label: string
  href: string
  icon?: 'user-plus' | 'banknote'
}

export interface DashboardNavItem {
  id: string
  label: string
  href: string
  icon?:
    | 'home'
    | 'shopping-bag'
    | 'layout-dashboard'
    | 'users'
    | 'clipboard-list'
    | 'file-text'
    | 'wallet'
    | 'bell'
    | 'receipt'
  children?: DashboardNavChild[]
  /** مطابقة تامة للمسار فقط (مثل الرئيسية) */
  end?: boolean
}

/** روابط التطبيق الأساسية */
export const APP_NAV: DashboardNavItem[] = [
  { id: 'home', label: 'الرئيسية', href: '/', icon: 'home', end: true },
  { id: 'sales-os', label: 'نظام المبيعات', href: '/dashboard/overview', icon: 'layout-dashboard' },
]

/** أقسام لوحة المندوب — متزامنة مع salesOsNav */
export const DASHBOARD_NAV: DashboardNavItem[] = [
  { id: 'overview', label: 'نظرة عامة', href: '/dashboard/overview', icon: 'layout-dashboard', end: true },
  {
    id: 'customers',
    label: 'العملاء',
    href: '/dashboard/customers',
    icon: 'users',
    children: [{ id: 'customers-new', label: 'إنشاء عميل جديد', href: '/dashboard/customers?new=1', icon: 'user-plus' }],
  },
  { id: 'receipts', label: 'سندات القبض', href: '/dashboard/receipts', icon: 'receipt' },
  { id: 'orders', label: 'الطلبيات', href: '/dashboard/orders', icon: 'clipboard-list' },
]

export function dashboardItemLabel(id: string): string | undefined {
  const flat = [...APP_NAV, ...DASHBOARD_NAV]
  const top = flat.find((i) => i.id === id)
  if (top) return top.label
  for (const item of DASHBOARD_NAV) {
    const child = item.children?.find((c) => c.id === id)
    if (child) return child.label
  }
  return undefined
}
