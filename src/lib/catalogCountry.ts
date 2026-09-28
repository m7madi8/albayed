import type { FilterDef, Product } from '../data/types'

/** فلترة الكتالوج — البلد فقط */
export const CATALOG_COUNTRY_LABELS = [
  'وطني',
  'إسرائيلي',
  'صيني',
  'ألماني',
  'إيطالي',
] as const

export type CatalogCountryLabel = (typeof CATALOG_COUNTRY_LABELS)[number]

export const CATALOG_COUNTRY_FILTER_KEY = 'country'

export function catalogCountryOf(p: Product): CatalogCountryLabel {
  switch (p.originId) {
    case 'il':
      return 'إسرائيلي'
    case 'cn':
      return 'صيني'
    case 'de':
      return 'ألماني'
    case 'it':
      return 'إيطالي'
    default:
      return 'وطني'
  }
}

export const catalogCountryFilterDef: FilterDef = {
  key: CATALOG_COUNTRY_FILTER_KEY,
  label: 'البلد',
  source: 'catalogCountry',
  order: [...CATALOG_COUNTRY_LABELS],
}

/** مسح معاملات الفلترة القديمة من الرابط */
export const LEGACY_CATALOG_FILTER_KEYS = [
  'brand',
  'origin',
  'type',
  'diameter',
  'size',
  'material',
  'availability',
  'salesOrigin',
] as const
