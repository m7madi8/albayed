import { loadAllClients } from './customClients'
import { filterClients } from './filterClients'
import { search as searchProducts } from './search'
import type { SalesClient } from '../data/clients'
import type { Product } from '../data/types'

export interface UniversalSearchResult {
  products: Product[]
  productTotal: number
  customers: SalesClient[]
  /** طلبية زيارة نشطة تطابق البحث (عميل أو هاتف) */
  orderMatch: boolean
}

export function universalSearch(query: string, limit = 6): UniversalSearchResult {
  const q = query.trim()
  if (!q) {
    return { products: [], productTotal: 0, customers: [], orderMatch: false }
  }
  const productRes = searchProducts(q, limit)
  const customers = filterClients(loadAllClients(), q).slice(0, limit)
  const digits = q.replace(/\D/g, '')
  const orderMatch =
    digits.length >= 4 &&
    (() => {
      try {
        const raw = localStorage.getItem('albayed-visit-order-v5')
        if (!raw) return false
        const parsed = JSON.parse(raw) as { clientName?: string; clientPhone?: string; lines?: unknown[] }
        const phone = (parsed.clientPhone ?? '').replace(/\D/g, '')
        const name = (parsed.clientName ?? '').toLowerCase()
        const hasLines = Array.isArray(parsed.lines) && parsed.lines.length > 0
        if (!hasLines) return false
        if (phone.includes(digits)) return true
        if (name.includes(q.toLowerCase())) return true
        return false
      } catch {
        return false
      }
    })()

  return {
    products: productRes.products,
    productTotal: productRes.total,
    customers,
    orderMatch,
  }
}
