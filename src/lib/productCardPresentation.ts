import type { ArtKind, Product } from '../data/types'
import { headlineSpec } from './catalog'

export type ProductExhibitLayout = 'horizon' | 'specimen' | 'monolith'

/** Editorial composition variant — systematic, not random. */
export function productExhibitLayout(kind: ArtKind): ProductExhibitLayout {
  switch (kind) {
    case 'pipe':
    case 'coil':
    case 'nipple':
    case 'wrench':
      return 'horizon'
    case 'tank':
    case 'toilet':
    case 'basin':
    case 'shower':
    case 'pump':
      return 'monolith'
    default:
      return 'specimen'
  }
}

/** Aggressive optical zoom for SVG viewBox whitespace (--exhibit-art-zoom). */
export function productExhibitArtZoom(kind: ArtKind): number {
  switch (productExhibitLayout(kind)) {
    case 'horizon':
      return 1.32
    case 'monolith':
      return 1.2
    default:
      return 1.44
  }
}

/** Primary spec line on catalog cards (no country). */
export function productCardSpecLine(product: Product): string {
  return productExhibitNote(product)
}

/** @deprecated use productCardSpecLine */
export function productExhibitNote(product: Product): string {
  const spec = headlineSpec(product)
  const mat = product.attributes.material
  const material =
    typeof mat === 'string' ? mat : Array.isArray(mat) && mat.length ? mat[0] : undefined

  if (spec && spec !== product.type && !product.name.includes(spec)) {
    return spec
  }
  if (material && !product.name.toLowerCase().includes(String(material).toLowerCase())) {
    return material
  }
  if (product.type && !product.name.includes(product.type)) {
    return product.type
  }
  return ''
}
