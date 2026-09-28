import { brassProductImage } from './brassProductPhotos'
import { fittingsProductImage } from './fittingsProductPhotos'
import { sanitaryProductImage } from './sanitaryProductPhotos'

export function catalogProductImage(slug: string): string | undefined {
  return brassProductImage(slug) ?? fittingsProductImage(slug) ?? sanitaryProductImage(slug)
}
