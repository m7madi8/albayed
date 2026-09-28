import type { FilterDef, Product } from '../data/types'
import { catalogCountryFilterDef, catalogCountryOf, CATALOG_COUNTRY_LABELS } from './catalogCountry'

/** فئات كتالوج المندوب — مواسير بلاستيك وقطع النحاس فقط. */
export const SALES_SECTIONS = [
  { id: 'pipes', label: 'مواسير بلاستيك' },
  { id: 'brass', label: 'قطع النحاس' },
] as const

export type SalesSectionId = (typeof SALES_SECTIONS)[number]['id']

export const SALES_COUNTRY_LABELS = CATALOG_COUNTRY_LABELS
export type SalesCountryLabel = ReturnType<typeof catalogCountryOf>

/** @deprecated استخدم catalogCountryOf */
export function salesCountryOf(p: Product): SalesCountryLabel {
  return catalogCountryOf(p)
}

export const salesOriginFilterDef: FilterDef = catalogCountryFilterDef

export function isSalesSection(id: string): id is SalesSectionId {
  return id === 'pipes' || id === 'brass'
}

export function salesSectionPath(id: SalesSectionId): string {
  return `/category/${id}`
}
