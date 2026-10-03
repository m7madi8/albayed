import type { Product } from '../data/types'
import { categoryOf } from './catalog'

export type MaterialKey = 'ppr' | 'hdpe' | 'pvc' | 'sewer' | 'brass' | 'ceramic' | 'default'

export const MATERIAL_COLORS: Record<MaterialKey, string> = {
  ppr: '#3d7a52',
  hdpe: '#1a1a1a',
  pvc: '#6f716b',
  sewer: '#c45c26',
  brass: '#a47752',
  ceramic: '#e8e6e0',
  default: '#8a8c86',
}

const CATEGORY_MATERIAL: Record<string, MaterialKey> = {
  pipes: 'pvc',
  fittings: 'ppr',
  brass: 'brass',
  sanitary: 'ceramic',
  projects: 'default',
  tools: 'default',
}

export function materialKeyForCategory(categoryId: string): MaterialKey {
  return CATEGORY_MATERIAL[categoryId] ?? 'default'
}

export function materialKeyForProduct(product: Product): MaterialKey {
  const mat = product.art?.material
  if (mat === 'ppr') return 'ppr'
  if (mat === 'hdpe' || mat === 'black') return 'hdpe'
  if (mat === 'pvc') return 'pvc'
  if (mat === 'brass') return 'brass'
  if (mat === 'ceramic' || mat === 'chrome' || mat === 'white') return 'ceramic'
  const type = product.type.toLowerCase()
  if (type.includes('صرف') || type.includes('sewer')) return 'sewer'
  return materialKeyForCategory(categoryOf(product).id)
}

export function materialCssVar(key: MaterialKey): string {
  return MATERIAL_COLORS[key]
}
