import type { CSSProperties, MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { Copy, Check } from 'lucide-react'
import { useCallback, useState } from 'react'
import type { Product } from '../../../data/types'
import { availabilityLabel, brandOf, originOf } from '../../../lib/catalog'
import { productCardSpecLine } from '../../../lib/productCardPresentation'
import { materialCssVar, materialKeyForProduct } from '../../../lib/shelfMaterials'
import ProductStage from '../ProductStage'
import FavoriteToggle from '../FavoriteToggle'
import InlineOrderControl from './InlineOrderControl'

export default function SpecimenTag({ product }: { product: Product }) {
  const unavailable = product.availability === 'out_of_stock'
  const limited = product.availability === 'limited'
  const brand = brandOf(product)
  const origin = originOf(product)
  const spec = productCardSpecLine(product)
  const matKey = materialKeyForProduct(product)
  const matColor = materialCssVar(matKey)
  const [copied, setCopied] = useState(false)

  const copySku = useCallback(async (e: MouseEvent) => {
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

  const showBadge = unavailable || limited

  return (
    <article
      className={`sh-tag${unavailable ? ' sh-tag--dim' : ''}`}
      style={{ '--sh-tag-material': matColor, minHeight: '100%' } as CSSProperties}
    >
      <div className="sh-tag__plate">
        <span className="sh-tag__tick" aria-hidden />
        <Link to={`/products/${product.slug}`} className="block h-full w-full" aria-label={product.name}>
          <ProductStage product={product} density="card" />
        </Link>
        <div className="sh-tag__overflow">
          <FavoriteToggle productId={product.id} />
          <button type="button" className="catalog-fav-btn" onClick={copySku} aria-label="نسخ رقم الصنف">
            {copied ? <Check size={14} aria-hidden /> : <Copy size={14} aria-hidden />}
          </button>
        </div>
      </div>
      <div className="sh-tag__body">
        <p className="sh-tag__sku" dir="ltr">{product.id}</p>
        <Link to={`/products/${product.slug}`} className="sh-tag__name">
          {product.name}
        </Link>
        {spec ? <p className="sh-tag__spec">{spec}</p> : null}
        <p className="sh-tag__source">{brand.name} · {origin.name}</p>
        <footer className="sh-tag__foot">
          <div className="sh-tag__foot-start">
            {showBadge ? (
              <span className="sh-tag__badge">{availabilityLabel[product.availability]}</span>
            ) : null}
            <Link to={`/products/${product.slug}`} className="sh-tag__detail">
              التفاصيل
            </Link>
          </div>
          <InlineOrderControl
            productId={product.id}
            productSlug={product.slug}
            productName={product.name}
            unavailable={unavailable}
          />
        </footer>
      </div>
    </article>
  )
}
