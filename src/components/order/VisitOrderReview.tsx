import { Link } from 'react-router-dom'
import { Trash2 } from 'lucide-react'
import { useVisitOrder, buildOrderText } from '../../context/VisitOrderContext'
import { getProductById } from '../../lib/catalog'
import { formatUnitPrice, lineTotal } from '../../lib/customerPricing'
import { ORDER_UNIT_LABEL, lineKey } from '../../lib/orderUnits'
import CatalogClientBar from './CatalogClientBar'
import ProductStage from '../catalog/ProductStage'
import QuantityInput from './QuantityInput'
import { btn } from '../../lib/buttonStyles'
export default function VisitOrderReview({
  variant = 'catalog',
  showToast,
}: {
  variant?: 'catalog' | 'dashboard'
  showToast?: (msg: string) => void
}) {
  const {
    hasClient,
    clientName,
    clientPhone,
    lines,
    lineCount,
    unitCount,
    orderTotal,
    setLineQuantity,
    removeLine,
  } = useVisitOrder()

  const resolved = lines
    .map((l) => ({ line: l, product: getProductById(l.productId) }))
    .filter((x) => x.product)

  const confirm = async () => {
    if (!hasClient || lines.length === 0) return
    const text = buildOrderText(clientName, clientPhone, lines, resolved.map((r) => r.product))
    try {
      await navigator.clipboard.writeText(text)
      showToast?.('تم نسخ ملخص العرض')
    } catch {
      window.alert(text)
    }
  }

  const catalogBack = variant === 'catalog'

  return (
    <div className="presentation-order">
      <header className="presentation-order__head">
        <div>
          <p className="presentation-order__kicker">عرض الزيارة</p>
          <h1 className="presentation-order__title display">قائمة المنتجات المختارة</h1>
          <p className="presentation-order__lead">
            {hasClient
              ? `${clientName} · ${clientPhone}`
              : 'حدّد العميل أولاً، ثم أضِف الأصناف من الكتالوج.'}
          </p>
        </div>
        <Link
          to="/products"
          className={btn('secondary', 'presentation-order__catalog-link h-11 shrink-0 rounded-[12px] px-5 text-[14px]')}
        >
          {catalogBack ? 'متابعة الكتالوج' : 'فتح الكتالوج'}
        </Link>
      </header>

      <div className="presentation-order__client">
        <CatalogClientBar />
      </div>

      <div className="presentation-order__panel ios-tile">
        <div className="order-panel-head">
          <h2 className="text-[13px] font-medium text-foreground-muted">الملخص</h2>
          <p className="mt-1 text-[15px] font-semibold text-foreground">
            {lineCount > 0
              ? `${lineCount} صنف · ${unitCount} وحدة · ${formatUnitPrice(orderTotal)}`
              : 'لا توجد أصناف بعد'}
          </p>
        </div>

        {lineCount > 0 ? (
          <ul className="order-panel-lines">
            {resolved.map(({ line, product }) => (
              <li key={lineKey(line.productId, line.unit)} className="order-line">
                <div className="order-line-thumb catalog-stage">
                  <ProductStage product={product!} density="thumb" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 text-[15px] font-medium text-foreground">{product!.name}</p>
                  <p className="text-[12px] text-foreground-muted" dir="ltr">{product!.id}</p>
                  <p className="mt-0.5 text-[13px] text-foreground-muted">
                    {formatUnitPrice(line.unitPrice)} · {ORDER_UNIT_LABEL[line.unit]}
                  </p>
                  <p className="text-[13px] font-semibold text-foreground">
                    {formatUnitPrice(lineTotal(line.unitPrice, line.quantity))}
                  </p>
                </div>
                <QuantityInput
                  value={line.quantity}
                  onChange={(n) => setLineQuantity(line.productId, line.unit, n)}
                  className="h-11 w-[4.75rem] text-[16px]"
                  aria-label="الكمية"
                />
                <button
                  type="button"
                  onClick={() => removeLine(line.productId, line.unit)}
                  className="order-line-remove focus-ring"
                  aria-label="حذف الصنف"
                >
                  <Trash2 size={18} />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="order-panel-empty">
            أضِف المنتجات من{' '}
            <Link to="/products" className="text-accent-dark underline-offset-2 hover:underline">
              الكتالوج
            </Link>
            .
          </p>
        )}

        <div className="order-panel-actions">
          <button
            type="button"
            disabled={!hasClient || lineCount === 0}
            onClick={confirm}
            className={btn('primary', 'h-12 w-full rounded-[12px] text-[15px]')}
          >
            تأكيد ونسخ ملخص العرض
          </button>
          {variant === 'dashboard' && (
            <p className="mt-3 text-center text-[12px] text-foreground-muted">
              أو استخدم{' '}
              <Link to="/visit-order" className="text-accent-dark underline-offset-2 hover:underline">
                عرض الزيارة
              </Link>{' '}
              أثناء الاجتماع مع العميل.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
