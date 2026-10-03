import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Minus, Plus } from 'lucide-react'
import { products, brandOf, headlineSpec } from '../../lib/catalog'
import { availabilityLabel } from '../../lib/catalog'
import type { Product } from '../../data/types'
import ProductArt from '../art/ProductArt'
import { useVisitOrder } from '../../context/VisitOrderContext'
import { getClientProductPrice } from '../../lib/customerPricing'

function PickerRow({
  product,
  disabled,
  onAdded,
}: {
  product: Product
  disabled: boolean
  onAdded?: () => void
}) {
  const { clientPhone, linesForProduct, addLine, setLineQuantity, removeLine } = useVisitOrder()
  const lines = linesForProduct(product.id)
  const piece = lines.find((l) => l.unit === 'piece')
  const qty = piece?.quantity ?? 0
  const unavailable = product.availability === 'out_of_stock'
  const brand = brandOf(product)

  const bump = (delta: number) => {
    if (disabled || unavailable) return
    if (qty === 0 && delta > 0) {
      addLine(product.id, 1, 'piece', getClientProductPrice(product.id, clientPhone))
      onAdded?.()
      return
    }
    if (qty + delta <= 0) {
      if (piece) removeLine(product.id, 'piece')
      return
    }
    setLineQuantity(product.id, 'piece', qty + delta)
    onAdded?.()
  }

  return (
    <div className={`picker-row${unavailable ? ' picker-row--off' : ''}`}>
      <div className="picker-row-art catalog-stage shrink-0" aria-hidden>
        <ProductArt spec={product.art} shadow={false} className="size-11 sm:size-12" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="picker-row-title">{product.name}</p>
        <p className="picker-row-meta">
          {brand.name} · {headlineSpec(product)}
        </p>
        <p className="picker-row-avail">{availabilityLabel[product.availability]}</p>
      </div>
      <div className="picker-row-qty">
        <button
          type="button"
          disabled={disabled || unavailable || qty === 0}
          onClick={() => bump(-1)}
          className="picker-qty-btn focus-ring"
          aria-label="تقليل الكمية"
        >
          <Minus size={16} />
        </button>
        <span className="picker-qty-value" aria-live="polite">{qty || '—'}</span>
        <button
          type="button"
          disabled={disabled || unavailable}
          onClick={() => bump(1)}
          className="picker-qty-btn picker-qty-btn--add focus-ring"
          aria-label="زيادة الكمية"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  )
}

export default function ProductPickerList({ onAdded }: { onAdded?: () => void }) {
  const [q, setQ] = useState('')
  const { hasClient } = useVisitOrder()

  const list = useMemo(() => {
    const term = q.trim().toLowerCase()
    if (!term) return products.slice(0, 80)
    return products.filter((p) => {
      const hay = `${p.name} ${p.id} ${p.type} ${brandOf(p).name}`.toLowerCase()
      return hay.includes(term)
    })
  }, [q])

  return (
    <div className="picker-panel">
      <label className="block">
        <span className="sr-only">بحث في المنتجات</span>
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="ابحث بالاسم أو SKU…"
          className="picker-search focus-ring"
          autoComplete="off"
        />
      </label>
      {!hasClient && (
        <p className="picker-hint">حدّد العميل في اللوحة اليمنى قبل الإضافة.</p>
      )}
      <ul className="picker-list mt-3">
        {list.map((p) => (
          <li key={p.id}>
            <PickerRow product={p} disabled={!hasClient} onAdded={onAdded} />
          </li>
        ))}
      </ul>
      {list.length === 0 && <p className="py-10 text-center text-[14px] text-foreground-muted">لا توجد نتائج.</p>}
      <Link to="/products" className="mt-4 block text-center text-[14px] font-medium text-accent-text">
        الكتالوج الكامل والفلاتر
      </Link>
    </div>
  )
}
