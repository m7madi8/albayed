import { categoryById, categoryBySlug } from '../data/categories'
import type { FilterDef, Product } from '../data/types'
import { products } from './catalog'
import {
  catalogCountryFilterDef,
  CATALOG_COUNTRY_FILTER_KEY,
  LEGACY_CATALOG_FILTER_KEYS,
} from './catalogCountry'

export const FILTER_KEYS = {
  category: 'category',
  country: CATALOG_COUNTRY_FILTER_KEY,
} as const

/** الكتالوج — فلتر البلد فقط (التصنيف عبر التبويبات أعلى الصفحة). */
export function catalogFacetDefs(_scopedCategory?: boolean): FilterDef[] {
  return [catalogCountryFilterDef]
}

export function resolveCategoryScope(sp: URLSearchParams): { slug: string | null; categoryId: string | null } {
  const raw = sp.get('category') ?? sp.get('section')
  if (!raw) return { slug: null, categoryId: null }
  const cat = categoryBySlug(raw) ?? categoryById(raw)
  if (!cat) return { slug: null, categoryId: null }
  return { slug: cat.slug, categoryId: cat.id }
}

export function catalogBasePool(sp: URLSearchParams): Product[] {
  const { categoryId } = resolveCategoryScope(sp)
  if (!categoryId) return products
  return products.filter((p) => p.categoryId === categoryId)
}

export function categoryCatalogPath(slug: string, preserve?: URLSearchParams): string {
  const next = new URLSearchParams(preserve?.toString())
  next.set('category', slug)
  next.delete('section')
  for (const k of LEGACY_CATALOG_FILTER_KEYS) {
    next.delete(k)
  }
  const q = next.toString()
  return q ? `/products?${q}` : `/products?category=${slug}`
}
