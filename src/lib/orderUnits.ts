export type OrderUnit = 'piece' | 'carton'

export const ORDER_UNIT_LABEL: Record<OrderUnit, string> = {
  piece: 'حبة',
  carton: 'كرتونة',
}

/** وحدات الطلب المتاحة حسب قسم المنتج */
export function orderUnitsForCategory(categoryId: string | undefined): OrderUnit[] {
  if (categoryId === 'sanitary') return ['piece']
  return ['piece', 'carton']
}

export function lineKey(productId: string, unit: OrderUnit) {
  return `${productId}:${unit}`
}
