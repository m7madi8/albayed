import { Check, Plus } from 'lucide-react'
import type { Product } from '../../data/types'
import { useProductQuickAdd } from '../../lib/useProductQuickAdd'

type Variant = 'card-overlay' | 'shelf-overlay' | 'inline'

export function ProductQuickAddTrigger({
  variant,
  productName,
  inCart,
  totalQty,
  onQuickAdd,
}: {
  variant: Variant
  productName: string
  inCart: boolean
  totalQty: number
  onQuickAdd: (e?: { preventDefault: () => void; stopPropagation: () => void }) => void
}) {
  const className =
    variant === 'shelf-overlay'
      ? `product-quick-add product-quick-add--shelf${inCart ? ' product-quick-add--active' : ''}`
      : variant === 'inline'
        ? `product-quick-add product-quick-add--inline${inCart ? ' product-quick-add--active' : ''}`
        : `product-quick-add product-quick-add--card${inCart ? ' product-quick-add--active' : ''}`

  return (
    <button
      type="button"
      className={className}
      onClick={(e) => onQuickAdd(e)}
      aria-label={inCart ? `في السلة — ${totalQty} — أضف واحداً` : `أضف ${productName} للسلة`}
    >
      {inCart ? (
        <>
          <span className="product-quick-add__qty" dir="ltr">
            {totalQty > 99 ? '99+' : totalQty}
          </span>
          <Check size={14} className="product-quick-add__check" strokeWidth={2.25} aria-hidden />
        </>
      ) : (
        <Plus size={20} strokeWidth={2} aria-hidden />
      )}
    </button>
  )
}

export default function ProductQuickAddButton({
  product,
  variant = 'card-overlay',
}: {
  product: Product
  variant?: Variant
}) {
  const { onQuickAdd, modal, unavailable, totalQty } = useProductQuickAdd(product)

  if (unavailable) return null

  return (
    <>
      <ProductQuickAddTrigger
        variant={variant}
        productName={product.name}
        inCart={totalQty > 0}
        totalQty={totalQty}
        onQuickAdd={onQuickAdd}
      />
      {modal}
    </>
  )
}
