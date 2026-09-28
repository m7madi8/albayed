import type { Product } from '../../data/types'
import { categoryOf } from '../../lib/catalog'
import { productCardSpecLine } from '../../lib/productCardPresentation'
import { ORDER_UNIT_LABEL } from '../../lib/orderUnits'
import { useAddToOrderFlow } from '../order/useAddToOrderFlow'
import FavoriteToggle from './FavoriteToggle'
import ProductStage from './ProductStage'

export default function ProductCard({ product }: { product: Product }) {
  const unavailable = product.availability === 'out_of_stock'
  const limited = product.availability === 'limited'
  const category = categoryOf(product)
  const specLine = productCardSpecLine(product)
  const status =
    limited ? 'كمية محدودة' : unavailable ? 'غير متوفر' : undefined

  const { tryOpen, modal, hasClient, inOrder } = useAddToOrderFlow(product.id, product.name)
  const tappable = !unavailable && hasClient
  const inOrderLabel =
    inOrder.length > 0 && hasClient
      ? inOrder.map((l) => `${l.quantity} ${ORDER_UNIT_LABEL[l.unit]}`).join(' · ')
      : null

  const hasPhoto = Boolean(product.image)

  return (
    <article
      className={`catalog-card${hasPhoto ? ' catalog-card--photo' : ''}${unavailable ? ' catalog-card--unavailable' : ''}${limited ? ' catalog-card--limited' : ''}${tappable ? ' catalog-card--tappable' : ''}`}
    >
      <div className="catalog-card__toolbar">
        <FavoriteToggle productId={product.id} />
      </div>

      <button
        type="button"
        className="catalog-card__body"
        onClick={tryOpen}
        disabled={unavailable || !hasClient}
        aria-label={
          unavailable
            ? `${product.name} — غير متوفر`
            : !hasClient
              ? `${product.name} — حدّد الشركة أولًا`
              : `إضافة ${product.name} إلى عرض الزيارة`
        }
      >
        <div className="catalog-card__stage catalog-stage">
          <ProductStage product={product} density="card" />
        </div>

        <div className="catalog-card__meta">
          <p className="catalog-card__category">{category.name}</p>
          <h3 className="catalog-card__name">{product.name}</h3>
          <p className="catalog-card__sku" dir="ltr">{product.id}</p>
          {specLine ? <p className="catalog-card__spec">{specLine}</p> : null}
          {inOrderLabel ? <p className="catalog-card__in-order">{inOrderLabel}</p> : null}
          {status ? <p className="catalog-card__status">{status}</p> : null}
        </div>
      </button>

      {modal}
    </article>
  )
}
