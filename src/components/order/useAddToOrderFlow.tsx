import { useCallback, useState } from 'react'
import { useVisitOrder } from '../../context/VisitOrderContext'
import AddToOrderModal from './AddToOrderModal'
import type { OrderUnit } from '../../lib/orderUnits'

export function useAddToOrderFlow(productId: string, productName: string) {
  const { hasClient, clientPhone, addLine, linesForProduct } = useVisitOrder()
  const [open, setOpen] = useState(false)
  const inOrder = linesForProduct(productId)

  const onConfirm = useCallback(
    (quantity: number, unit: OrderUnit, unitPrice: number) => {
      addLine(productId, quantity, unit, unitPrice)
    },
    [addLine, productId],
  )

  const tryOpen = useCallback(() => {
    if (hasClient) setOpen(true)
  }, [hasClient])

  const modal = (
    <AddToOrderModal
      open={open}
      productId={productId}
      productName={productName}
      clientPhone={clientPhone}
      onClose={() => setOpen(false)}
      onConfirm={onConfirm}
    />
  )

  return { tryOpen, modal, hasClient, inOrder }
}
