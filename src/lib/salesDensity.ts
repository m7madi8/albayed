export type SalesDensity = 'dense' | 'default' | 'relaxed'

const STORAGE_KEY = 'al-bayed-sales-density'

export function readSalesDensity(): SalesDensity {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    if (v === 'dense' || v === 'relaxed') return v
  } catch {
    /* ignore */
  }
  return 'default'
}

export function writeSalesDensity(value: SalesDensity) {
  try {
    localStorage.setItem(STORAGE_KEY, value)
  } catch {
    /* ignore */
  }
}

export function densityClass(d: SalesDensity): string {
  if (d === 'dense') return 'sales-os-density-dense rhythm-dense'
  if (d === 'relaxed') return 'sales-os-density-relaxed rhythm-editorial'
  return 'sales-os-density-default rhythm-comfortable'
}
