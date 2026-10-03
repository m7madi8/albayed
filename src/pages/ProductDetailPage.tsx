import { Link, Navigate, useParams } from 'react-router-dom'
import { Copy, Check, FileDown } from 'lucide-react'
import { useCallback, useState } from 'react'
import {
  availabilityLabel,
  brandOf,
  categoryOf,
  getProduct,
  originOf,
  relatedProducts,
} from '../lib/catalog'
import { keySpecificationRows, groupedSpecificationRows, productPrimaryImage } from '../lib/productDetail'
import ProductStage from '../components/catalog/ProductStage'
import ProductGallery from '../components/catalog/ProductGallery'
import SpecTable from '../components/catalog/SpecTable'
import FavoriteToggle from '../components/catalog/FavoriteToggle'
import AppStickyDock from '../components/layout/AppStickyDock'
import { useAddToOrderFlow } from '../components/order/useAddToOrderFlow'
import { useVisitOrder } from '../context/VisitOrderContext'
import { activateRepMode, readRepModeActive } from '../lib/catalogRepMode'
import { btn } from '../lib/buttonStyles'
import ProductGrid from '../components/catalog/ProductGrid'
import type { Product } from '../data/types'

function availabilityTone(av: Product['availability']) {
  if (av === 'in_stock') return 'ok'
  if (av === 'limited') return 'warn'
  return 'off'
}

function ProductDetailView({ product }: { product: Product }) {
  const { lineCount } = useVisitOrder()
  const [copied, setCopied] = useState(false)
  const category = categoryOf(product)
  const brand = brandOf(product)
  const origin = originOf(product)
  const keyRows = keySpecificationRows(product, category)
  const specGroups = groupedSpecificationRows(product, category)
  const related = relatedProducts(product)
  const { tryOpen, modal, hasClient } = useAddToOrderFlow(product.id, product.name)
  const showRep = readRepModeActive() || lineCount > 0
  const avLabel = availabilityLabel[product.availability]
  const avTone = availabilityTone(product.availability)
  const hasPhoto = Boolean(productPrimaryImage(product))

  const requestClient = () => {
    activateRepMode()
    window.dispatchEvent(new Event('al-bayed-open-client-bar'))
  }

  const primaryOrderAction = () => {
    if (product.availability === 'out_of_stock') return
    if (hasClient) tryOpen()
    else requestClient()
  }

  const orderLabel =
    product.availability === 'out_of_stock'
      ? 'غير متوفر'
      : hasClient
        ? 'أضف إلى عرض الزيارة'
        : 'أضف إلى الطلب — حدّد العميل'

  const copySku = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(product.id)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      /* ignore */
    }
  }, [product.id])

  return (
    <div
      className={`catalog-pro pdp-pro product-detail-page pdp catalog-shell${lineCount > 0 ? ' product-detail-page--order-bar' : ''}`}
    >
      <div className="pdp-crumb-wrap container-x product-detail-crumb">
        <Link to="/products" className="text-link text-[14px]">
          الكتالوج
        </Link>
        <span className="mx-2 text-foreground-muted">/</span>
        <span className="text-[14px] text-foreground-muted">{product.name}</span>
      </div>

      <div className="container-x pdp-hero pdp-hero-enter">
        <div className="pdp-visual">
          <div className="pdp-gallery-stage">
            {hasPhoto ? (
              <div className="catalog-stage catalog-stage--ratio">
                <ProductStage product={product} density="hero" />
              </div>
            ) : (
              <ProductGallery art={product.art} name={product.name} />
            )}
          </div>
        </div>

        <div className="pdp-summary">
          <div className="pdp-title-row flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="type-meta">
                {brand.name} · {origin.name}
              </p>
              <h1 className="pdp-title display">{product.name}</h1>
              <p className="pdp-type">{product.type}</p>
            </div>
            <div className="pdp-fav shrink-0">
              <FavoriteToggle productId={product.id} />
            </div>
          </div>

          <div className="pdp-meta-grid mt-4">
            <div className="pdp-avail">
              <span className={`pdp-avail-dot pdp-avail-dot--${avTone}`} aria-hidden />
              <span className="type-label">{avLabel}</span>
            </div>
            <button
              type="button"
              onClick={copySku}
              className="flex items-center gap-2 text-start focus-ring rounded-md"
              aria-label="نسخ رقم الصنف"
            >
              <span className="type-sku" dir="ltr">
                {product.id}
              </span>
              {copied ? (
                <Check size={16} className="text-success" aria-hidden />
              ) : (
                <Copy size={16} className="text-foreground-muted" aria-hidden />
              )}
            </button>
          </div>

          {keyRows.length > 0 && (
            <dl className="pdp-headline-spec">
              {keyRows.slice(0, 3).map((r) => (
                <div key={r.label} className="flex justify-between gap-4">
                  <dt className="text-foreground-muted">{r.label}</dt>
                  <dd className="type-data text-foreground">{r.value}</dd>
                </div>
              ))}
            </dl>
          )}

          <p className="pdp-summary-text">{product.summary}</p>

          <div className="pdp-order-panel mt-6 hidden flex-wrap items-center gap-3 sm:flex">
            {product.datasheetUrl ? (
              <a
                href={product.datasheetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={btn('secondary', 'h-12 gap-2 px-5')}
              >
                <FileDown size={18} aria-hidden />
                ورقة البيانات
              </a>
            ) : null}
            {(showRep || !hasClient) && (
              <button
                type="button"
                onClick={primaryOrderAction}
                disabled={product.availability === 'out_of_stock'}
                className={btn('primary', 'h-12 min-w-[12rem] flex-1 max-w-md')}
              >
                {orderLabel}
              </button>
            )}
          </div>
        </div>
      </div>

      <section className="container-x pdp-section">
        <h2 className="pdp-section-title type-heading">المواصفات التفصيلية</h2>
        <SpecTable groups={specGroups} />
      </section>

      {related.length > 0 && (
        <section className="container-x pdp-section">
          <h2 className="pdp-section-title type-heading">منتجات ذات صلة</h2>
          <ProductGrid products={related} resultsKey={`related-${product.id}`} className="cp-grid--related" />
        </section>
      )}

      <div className="sm:hidden">
        <AppStickyDock>
          <p className="type-caption truncate">{product.name}</p>
          <button
            type="button"
            onClick={primaryOrderAction}
            disabled={product.availability === 'out_of_stock'}
            className={btn('primary', 'h-11 min-w-[10rem]')}
          >
            {product.availability === 'out_of_stock' ? 'غير متوفر' : hasClient ? 'أضف للطلب' : 'أضف — حدّد العميل'}
          </button>
        </AppStickyDock>
      </div>

      {modal}
    </div>
  )
}

export default function ProductDetailPage() {
  const { slug } = useParams()
  const product = slug ? getProduct(slug) : undefined
  if (!product) return <Navigate to="/products" replace />
  return <ProductDetailView product={product} />
}
