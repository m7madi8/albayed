/**
 * Domain model for the Al-Bayed public catalog.
 * Shapes mirror what a Laravel API resource would return, so the mock
 * data in this folder can be swapped for fetch() calls without touching UI.
 */

export type Availability = 'in_stock' | 'limited' | 'out_of_stock'

export type Material =
  | 'pvc' | 'ppr' | 'hdpe' | 'gi' | 'pex' | 'brass' | 'chrome'
  | 'ceramic' | 'black' | 'steel' | 'foam' | 'iron' | 'white' | 'blackchrome'

export type ArtKind =
  | 'pipe' | 'coil' | 'elbow' | 'elbow45' | 'tee' | 'coupling' | 'reducer' | 'cap'
  | 'ballValve' | 'gateValve' | 'checkValve' | 'strainer' | 'manifold' | 'nipple'
  | 'mixer' | 'shower' | 'basin' | 'toilet' | 'pump' | 'tank' | 'cover'
  | 'wrench' | 'tape' | 'can' | 'clip'

/** Local, vector product imagery. Replaced by `image` / `images` once real photography exists. */
export interface ArtSpec {
  kind: ArtKind
  material: Material
  variant?: number
  /** small printed marking on the product, e.g. "PN16 Ø63" */
  mark?: string
}

export type FilterSource =
  | 'type'
  | 'attr'
  | 'brand'
  | 'origin'
  | 'category'
  | 'categorySlug'
  | 'availability'
  | 'salesOrigin'
  | 'catalogCountry'

export interface FilterDef {
  key: string
  label: string
  source: FilterSource
  /** optional explicit ordering of option values */
  order?: string[]
}

export interface Category {
  id: string
  name: string
  slug: string
  tagline: string
  description: string
  /** Declared catalog size — a placeholder until the real count comes from the API. */
  productCount: number
  subtypes: string[]
  filters: FilterDef[]
  tone: string
  hero: ArtSpec[]
}

export interface Brand {
  id: string
  name: string
  latin: string
  /** placeholder brands for the demo */
  originId: string
}

export interface Origin {
  id: string
  name: string
  latin: string
}

export interface SpecRow {
  label: string
  value: string
}

export interface Product {
  id: string
  name: string
  slug: string
  categoryId: string
  /** Sub-type inside the category, e.g. PVC, كوع, محبس كروي */
  type: string
  brandId: string
  originId: string
  availability: Availability
  art: ArtSpec
  image?: string
  images?: string[]
  summary: string
  /** filterable attributes. Arrays = a product family available in several values (e.g. sizes) */
  attributes: Record<string, string | string[]>
  /** extra descriptive rows shown in the specification table */
  details: SpecRow[]
  keywords?: string[]
  relatedProductIds?: string[]
}

export interface SiteStat {
  value: string
  label: string
  /** true = demo-safe placeholder that must be replaced with a real figure */
  placeholder?: boolean
}
