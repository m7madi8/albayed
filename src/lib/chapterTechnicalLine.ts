import type { Category } from '../data/types'
import type { Product } from '../data/types'
import { originOf, headlineSpec } from './catalog'

export function chapterTechnicalLine(category: Category, pool: Product[]): string {
  const parts: string[] = []
  if (category.subtypes.length) {
    parts.push(category.subtypes.slice(0, 4).join(' · '))
  }
  const origins = new Set(pool.slice(0, 40).map((p) => originOf(p).name))
  if (origins.size) parts.push([...origins].slice(0, 3).join(' · '))
  const sample = pool[0]
  if (sample) {
    const spec = headlineSpec(sample)
    if (spec && !parts.some((p) => p.includes(spec))) parts.push(spec)
  }
  return parts.filter(Boolean).join(' · ')
}
