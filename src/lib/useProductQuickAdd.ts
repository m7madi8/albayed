import { useCallback } from 'react'
import type { Product } from '../data/types'
import { activateRepMode } from './catalogRepMode'
import { getClientProductPrice } from './customerPricing'
import { orderUnitsForCategory, type OrderUnit } from './orderUnits'
import { useAddToOrderFlow } from '../components/order/useAddToOrderFlow'
import { useVisitOrder } from '../context/VisitOrderContext'

export function useProductQuickAdd(product: Pick<Product, 'id' | 'name' | 'categoryId' | 'availability'>) {
  const unavailable = product.availability === 'out_of_stock'
  const { hasClient, clientPhone, addLine, setLineQuantity, linesForProduct } = useVisitOrder()
  const { tryOpen, modal } = useAddToOrderFlow(product.id, product.name)
  const inOrder = linesForProduct(product.id)
  const totalQty = inOrder.reduce((sum, line) => sum + line.quantity, 0)

  const onQuickAdd = useCallback(
    (e?: { preventDefault: () => void; stopPropagation: () => void }) => {
      e?.preventDefault()
      e?.stopPropagation()
      if (unavailable) return

      activateRepMode()
      if (!hasClient) {
        window.dispatchEvent(new Event('al-bayed-open-client-bar'))
        return
      }

      const units = orderUnitsForCategory(product.categoryId)
      const pieceOnly = units.length === 1 && units[0] === 'piece'

      if (pieceOnly) {
        const piece = inOrder.find((l) => l.unit === 'piece')
        const price = getClientProductPrice(product.id, clientPhone)
        if (!piece) {
          addLine(product.id, 1, 'piece', price)
          return
        }
        setLineQuantity(product.id, 'piece', piece.quantity + 1)
        return
      }

      if (inOrder.length === 0) {
        tryOpen()
        return
      }

      const defaultUnit: OrderUnit = units[0] ?? 'piece'
      const line = inOrder.find((l) => l.unit === defaultUnit) ?? inOrder[0]
      if (line) {
        setLineQuantity(line.productId, line.unit, line.quantity + 1)
        return
      }
      tryOpen()
    },
    [
      unavailable,
      hasClient,
      product.categoryId,
      product.id,
      inOrder,
      clientPhone,
      addLine,
      setLineQuantity,
      tryOpen,
    ],
  )

  return { onQuickAdd, modal, unavailable, totalQty, hasClient, inOrder }
}
