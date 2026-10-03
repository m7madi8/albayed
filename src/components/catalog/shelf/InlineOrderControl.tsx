import type { MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Minus } from 'lucide-react'
import { activateRepMode, readRepModeActive } from '../../../lib/catalogRepMode'
import { getClientProductPrice } from '../../../lib/customerPricing'
import { useVisitOrder } from '../../../context/VisitOrderContext'
import { useAddToOrderFlow } from '../../order/useAddToOrderFlow'

export default function InlineOrderControl({
  productId,
  productSlug,
  productName,
  unavailable,
}: {
  productId: string
  productSlug: string
  productName: string
  unavailable: boolean
}) {
  const { lineCount, hasClient, clientPhone, addLine, setLineQuantity, removeLine, linesForProduct } =
    useVisitOrder()
  const showRep = readRepModeActive() || lineCount > 0 || hasClient
  const { tryOpen, modal } = useAddToOrderFlow(productId, productName)
  const lines = linesForProduct(productId)
  const piece = lines.find((l) => l.unit === 'piece')
  const qty = piece?.quantity ?? 0

  if (unavailable) return null
  if (!showRep) {
    return (
      <Link to={`/products/${productSlug}`} className="sh-order-btn sh-order-btn--ghost sh-order-btn--compact">
        عرض
      </Link>
    )
  }

  const requestClient = (e: MouseEvent) => {
    e.preventDefault()
    activateRepMode()
    window.dispatchEvent(new Event('al-bayed-open-client-bar'))
  }

  const bump = (delta: number) => {
    if (!hasClient) return
    if (qty === 0 && delta > 0) {
      addLine(productId, 1, 'piece', getClientProductPrice(productId, clientPhone))
      return
    }
    const next = qty + delta
    if (next <= 0) {
      if (piece) removeLine(productId, 'piece')
      return
    }
    setLineQuantity(productId, 'piece', next)
  }

  if (!hasClient) {
    return (
      <button type="button" className="sh-order-btn sh-order-btn--ghost" onClick={requestClient}>
        حدّد العميل
      </button>
    )
  }

  if (qty === 0) {
    return (
      <>
        <button type="button" className="sh-order-btn" onClick={() => tryOpen()} aria-label="أضف للطلب">
          <Plus size={20} aria-hidden />
        </button>
        {modal}
      </>
    )
  }

  return (
    <div className="sh-order-qty">
      <button type="button" onClick={() => bump(-1)} aria-label="تقليل الكمية">
        <Minus size={16} aria-hidden />
      </button>
      <span dir="ltr">{qty}</span>
      <button type="button" onClick={() => bump(1)} aria-label="زيادة الكمية">
        <Plus size={16} aria-hidden />
      </button>
      {modal}
    </div>
  )
}
