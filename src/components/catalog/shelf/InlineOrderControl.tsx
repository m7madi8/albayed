import type { MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { Minus, Plus } from 'lucide-react'
import { readRepModeActive } from '../../../lib/catalogRepMode'
import { useVisitOrder } from '../../../context/VisitOrderContext'
import type { useProductQuickAdd } from '../../../lib/useProductQuickAdd'
import type { Product } from '../../../data/types'
import { ProductQuickAddTrigger } from '../ProductQuickAddButton'

type QuickAdd = ReturnType<typeof useProductQuickAdd>

export default function InlineOrderControl({
  product,
  quick,
}: {
  product: Pick<Product, 'id' | 'name' | 'slug' | 'categoryId' | 'availability'>
  quick: QuickAdd
}) {
  const unavailable = product.availability === 'out_of_stock'
  const { lineCount, hasClient, setLineQuantity, removeLine } = useVisitOrder()
  const showRep = readRepModeActive() || lineCount > 0 || hasClient
  const piece = quick.inOrder.find((l) => l.unit === 'piece')
  const qty = piece?.quantity ?? 0

  if (unavailable) return null
  if (!showRep) {
    return (
      <Link to={`/products/${product.slug}`} className="sh-order-btn sh-order-btn--ghost sh-order-btn--compact">
        عرض
      </Link>
    )
  }

  const bump = (delta: number, e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!hasClient || !piece) return
    const next = piece.quantity + delta
    if (next <= 0) {
      removeLine(product.id, piece.unit)
      return
    }
    setLineQuantity(product.id, piece.unit, next)
  }

  if (qty > 0 && piece) {
    return (
      <div className="sh-order-qty">
        <button type="button" onClick={(e) => bump(-1, e)} aria-label="تقليل الكمية">
          <Minus size={16} aria-hidden />
        </button>
        <span dir="ltr">{qty}</span>
        <button
          type="button"
          className="product-quick-add product-quick-add--inline product-quick-add--compact"
          onClick={(e) => quick.onQuickAdd(e)}
          aria-label="زيادة الكمية"
        >
          <Plus size={18} strokeWidth={2} aria-hidden />
        </button>
      </div>
    )
  }

  return (
    <ProductQuickAddTrigger
      variant="inline"
      productName={product.name}
      inCart={false}
      totalQty={0}
      onQuickAdd={quick.onQuickAdd}
    />
  )
}
