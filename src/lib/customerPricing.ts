import { normalizeClientPhone } from './clientPhone'

const OVERRIDE_KEY = 'albayed-client-product-prices-v1'

type PriceOverrides = Record<string, Record<string, number>>

function readOverrides(): PriceOverrides {
  try {
    const raw = localStorage.getItem(OVERRIDE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw) as PriceOverrides
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

function writeOverrides(data: PriceOverrides) {
  localStorage.setItem(OVERRIDE_KEY, JSON.stringify(data))
}

/** قائمة أسعار أساسية للعرض حتى يُربط API — ثابتة لكل صنف. */
export function baseUnitPrice(productId: string): number {
  let h = 0
  for (let i = 0; i < productId.length; i++) {
    h = (h * 31 + productId.charCodeAt(i)) | 0
  }
  const n = Math.abs(h) % 49000
  return Math.round((n / 100 + 4.5) * 100) / 100
}

/** سعر الوحدة المعتمد لهذا العميل لهذا الصنف (محفوظ أو أساسي). */
export function getClientProductPrice(productId: string, clientPhone: string): number {
  const phone = normalizeClientPhone(clientPhone)
  if (!phone) return baseUnitPrice(productId)
  const byClient = readOverrides()[phone]
  const stored = byClient?.[productId]
  if (typeof stored === 'number' && stored >= 0) return stored
  return baseUnitPrice(productId)
}

/** يحفظ السعر عند الإضافة/التأكيد لاستخدامه لاحقًا لنفس العميل. */
export function rememberClientProductPrice(clientPhone: string, productId: string, unitPrice: number) {
  const phone = normalizeClientPhone(clientPhone)
  if (!phone || unitPrice < 0) return
  const all = readOverrides()
  const client = { ...(all[phone] ?? {}), [productId]: Math.round(unitPrice * 100) / 100 }
  writeOverrides({ ...all, [phone]: client })
}

export function formatUnitPrice(amount: number): string {
  return `${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₪`
}

export function lineTotal(unitPrice: number, quantity: number): number {
  return Math.round(unitPrice * quantity * 100) / 100
}

export function orderLinesTotal(lines: { unitPrice: number; quantity: number }[]): number {
  return Math.round(lines.reduce((sum, l) => sum + lineTotal(l.unitPrice, l.quantity), 0) * 100) / 100
}
