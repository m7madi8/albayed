import type { Product } from '../../data/types'
import { Link } from 'react-router-dom'
import { Copy, Check, Plus } from 'lucide-react'
import { useCallback, useState } from 'react'
import { availabilityLabel, brandOf, originOf } from '../../lib/catalog'
import { productCardSpecLine } from '../../lib/productCardPresentation'
import { ORDER_UNIT_LABEL } from '../../lib/orderUnits'
import { useAddToOrderFlow } from '../order/useAddToOrderFlow'
import { useVisitOrder } from '../../context/VisitOrderContext'
import { activateRepMode, readRepModeActive } from '../../lib/catalogRepMode'
import FavoriteToggle from './FavoriteToggle'
import ProductStage from './ProductStage'

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

  const showRep = readRepModeActive() || lineCount > 0
  const { tryOpen, modal, hasClient, inOrder } = useAddToOrderFlow(product.id, product.name)
  const inOrderLabel =
    inOrder.length > 0 && hasClient
      ? inOrder.map((l) => `${l.quantity} ${ORDER_UNIT_LABEL[l.unit]}`).join(' · ')
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

  const requestClient = (e: React.MouseEvent) => {
    e.preventDefault()
    activateRepMode()
    window.dispatchEvent(new Event('al-bayed-open-client-bar'))
  }

  return (
    <article className={`cp-card${unavailable ? ' cp-card--unavailable' : ''}`}>
      <div className="cp-card__top">
        <div className="cp-card__sku-row">
          <p className="cp-card__sku" dir="ltr">{product.id}</p>
          <button
            type="button"
            className="cp-card__sku-copy focus-ring"
            onClick={copySku}
            aria-label="نسخ رقم الصنف"
          >
            {copied ? <Check size={14} aria-hidden /> : <Copy size={14} aria-hidden />}
          </button>
        </div>
        <FavoriteToggle productId={product.id} />
      </div>

      <Link to={`/products/${product.slug}`} className="cp-card__media" aria-label={`تفاصيل ${product.name}`}>
        {showAvailPill ? (
          <span className={`cp-card__badge${limited ? ' cp-card__badge--warn' : ''}`}>
            {availabilityLabel[product.availability]}
          </span>
        ) : null}
        <div className="catalog-stage catalog-stage--ratio">
          <ProductStage product={product} density="card" />
        </div>
      </Link>

      <div className="cp-card__body">
        <p className="cp-card__source">
          {brand.name} · {origin.name}
        </p>
        <Link to={`/products/${product.slug}`} className="cp-card__title">
          {product.name}
        </Link>
        {rows.length > 0 ? (
          <dl>
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
          {showRep ? (
            hasClient && !unavailable ? (
              <button type="button" onClick={tryOpen} className="cp-card__action">
                <Plus size={16} aria-hidden />
                أضف
              </button>
            ) : !unavailable ? (
              <button type="button" onClick={requestClient} className="cp-card__action cp-card__action--ghost">
                حدّد العميل
              </button>
            ) : null
          ) : (
            <Link to={`/products/${product.slug}`} className="cp-card__link-quiet">
              التفاصيل
            </Link>
          )}
        </footer>
      </div>

      {modal}
    </article>
  )
}
