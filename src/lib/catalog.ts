import { brands, origins } from '../data/brands'
import { categories, categoryById } from '../data/categories'
import { products } from '../data/products'
import type { Availability, Brand, Category, Origin, Product } from '../data/types'

/**
 * Data-access layer. Today it reads the local mock data; a Laravel API can replace
 * these functions (same signatures, returning Promises) without touching the UI.
 */

export const brandMap = new Map<string, Brand>(brands.map((b) => [b.id, b]))
export const originMap = new Map<string, Origin>(origins.map((o) => [o.id, o]))

export const availabilityLabel: Record<Availability, string> = {
  in_stock: 'متوفر',
  limited: 'متوفر بكميات محدودة',
  out_of_stock: 'غير متوفر',
}

export const brandOf = (p: Product) => brandMap.get(p.brandId)!
export const originOf = (p: Product) => originMap.get(p.originId)!
export const categoryOf = (p: Product) => categoryById(p.categoryId)!

export const getProduct = (slug: string) => products.find((p) => p.slug === slug)
export const getProductById = (id: string) => products.find((p) => p.id === id)
export const resolveProduct = (idOrSlug: string) => getProduct(idOrSlug) ?? getProductById(idOrSlug)
export const productsIn = (cat: Category) => products.filter((p) => p.categoryId === cat.id)
export const productsByBrand = (id: string) => products.filter((p) => p.brandId === id)
export const productsByOrigin = (id: string) => products.filter((p) => p.originId === id)

/** Related products: same type > same category > same brand > shared usage. */
export function relatedProducts(p: Product, limit = 6): Product[] {
  const usage = new Set(([] as string[]).concat(p.attributes.usage ?? []))
  return products
    .filter((o) => o.id !== p.id)
    .map((o) => {
      let s = 0
      if (o.categoryId === p.categoryId) s += 4
      if (o.type === p.type) s += 5
      if (o.brandId === p.brandId) s += 2
      if (o.originId === p.originId) s += 1
      for (const u of ([] as string[]).concat(o.attributes.usage ?? [])) if (usage.has(u)) s += 1
      return { o, s }
    })
    .filter((x) => x.s >= 4)
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map((x) => x.o)
}

/** The value shown in the blueprint view of the gallery and as the card's spec line. */
export function headlineSpec(p: Product): string {
  const first = (k: string) => {
    const v = p.attributes[k]
    return Array.isArray(v) ? v : v ? [v] : []
  }
  const sizes = first('diameter').length ? first('diameter') : first('size')
  if (sizes.length) return sizes.length > 1 ? `${sizes[0]} – ${sizes[sizes.length - 1]}` : sizes[0]
  return first('capacity')[0] ?? first('finish')[0] ?? first('installation')[0] ?? first('usage')[0] ?? p.type
}

export { categories, products, brands, origins }
