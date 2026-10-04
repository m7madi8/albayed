import type { Product } from '../../data/types'
import { Link } from 'react-router-dom'
import { Copy, Check } from 'lucide-react'
import { useCallback, useState } from 'react'
import { availabilityLabel, brandOf, originOf } from '../../lib/catalog'
import { productCardSpecLine } from '../../lib/productCardPresentation'
import { ORDER_UNIT_LABEL } from '../../lib/orderUnits'
import { useVisitOrder } from '../../context/VisitOrderContext'
import { readRepModeActive } from '../../lib/catalogRepMode'
import { useProductQuickAdd } from '../../lib/useProductQuickAdd'
import { CATALOG_FAVORITES_ENABLED } from '../../lib/catalogFeatures'
import FavoriteToggle from './FavoriteToggle'
import ProductStage from './ProductStage'
import { ProductQuickAddTrigger } from './ProductQuickAddButton'

function specRows(product: Product): { label: string; value: string }[] {
  const rows: { label: string; value: string }[] = []
  const d = product.attributes.diameter
  const m = product.attributes.material
  if (d) rows.push({ label: 'المقاس', value: Array.isArray(d) ? d.join(' – ') : d })
  if (m) rows.push({ label: 'المادة', value: Array.isArray(m) ? m.join(' – ') : m })
  return rows.slice(0, 2)
}

export default function ProductCard({ product }: { product: Product }) {
  const unavailable = product.availability === 'out_of_stock'
  const limited = product.availability === 'limited'
  const brand = brandOf(product)
  const origin = originOf(product)
  const specLine = productCardSpecLine(product)
  const rows = specRows(product)
  const [copied, setCopied] = useState(false)
  const { lineCount } = useVisitOrder()
  const quick = useProductQuickAdd(product)

  const showRep = readRepModeActive() || lineCount > 0
  const inOrderLabel =
    quick.inOrder.length > 0 && quick.hasClient
      ? quick.inOrder.map((l) => `${l.quantity} ${ORDER_UNIT_LABEL[l.unit]}`).join(' · ')
      : null

  const showAvailPill = limited || unavailable

  const copySku = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(product.id)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      /* ignore */
    }
  }, [product.id])

  return (
    <article className={`cp-card${unavailable ? ' cp-card--unavailable' : ''}`}>
      <div className="cp-card__media-wrap">
        <Link to={`/products/${product.slug}`} className="cp-card__media" aria-label={`تفاصيل ${product.name}`}>
          {showAvailPill ? (
            <span className={`cp-card__badge${limited ? ' cp-card__badge--warn' : ''}`}>
              {availabilityLabel[product.availability]}
            </span>
          ) : null}
          <div className="catalog-stage cp-card__stage">
            <ProductStage product={product} density="card" />
          </div>
        </Link>
        {CATALOG_FAVORITES_ENABLED ? (
          <div className="cp-card__media-tools">
            <FavoriteToggle productId={product.id} className="cp-card__fav" />
          </div>
        ) : null}
        {!unavailable ? (
          <ProductQuickAddTrigger
            variant="card-overlay"
            productName={product.name}
            inCart={quick.totalQty > 0}
            totalQty={quick.totalQty}
            onQuickAdd={quick.onQuickAdd}
          />
        ) : null}
      </div>

      <div className="cp-card__body">
        <div className="cp-card__sku-row">
          <p className="cp-card__sku" dir="ltr">
            {product.id}
          </p>
          <button
            type="button"
            className="cp-card__sku-copy focus-ring"
            onClick={copySku}
            aria-label="نسخ رقم الصنف"
          >
            {copied ? <Check size={14} aria-hidden /> : <Copy size={14} aria-hidden />}
          </button>
        </div>
        <p className="cp-card__source">
          {brand.name} · {origin.name}
        </p>
        <Link to={`/products/${product.slug}`} className="cp-card__title">
          {product.name}
        </Link>
        {rows.length > 0 ? (
          <dl className="cp-card__spec-list">
            {rows.map((r) => (
              <div key={r.label} className="cp-card__spec-row">
                <dt>{r.label}</dt>
                <dd>{r.value}</dd>
              </div>
            ))}
          </dl>
        ) : specLine ? (
          <p className="cp-card__spec">{specLine}</p>
        ) : null}
        {inOrderLabel ? <p className="cp-card__in-order">{inOrderLabel}</p> : null}
        <footer className="cp-card__foot">
          {product.availability === 'in_stock' && !showAvailPill ? (
            <span className="cp-card__avail">
              <span className="cp-card__avail-dot" aria-hidden />
              متوفر
            </span>
          ) : (
            <span />
          )}
          {showRep && !unavailable ? (
            <ProductQuickAddTrigger
              variant="inline"
              productName={product.name}
              inCart={quick.totalQty > 0}
              totalQty={quick.totalQty}
              onQuickAdd={quick.onQuickAdd}
            />
          ) : (
            <Link to={`/products/${product.slug}`} className="cp-card__link-quiet">
              التفاصيل
            </Link>
          )}
        </footer>
      </div>

      {quick.modal}
    </article>
  )
}
