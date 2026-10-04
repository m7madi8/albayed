import { isCatalogPath } from './catalogPath'

export const PUBLIC_HEADER_NAV = [
  {
    href: '/products',
    label: 'الكتالوج',
    match: (pathname: string) => isCatalogPath(pathname) && pathname !== '/visit-order',
  },
  {
    href: '/dashboard/overview',
    label: 'نظام المبيعات',
    match: (pathname: string) => pathname.startsWith('/dashboard'),
  },
] as const
