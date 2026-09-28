import { Link } from 'react-router-dom'
import { useVisitOrder, buildOrderText } from '../../context/VisitOrderContext'
import { getProductById } from '../../lib/catalog'
import { formatUnitPrice, lineTotal } from '../../lib/customerPricing'
import { ORDER_UNIT_LABEL } from '../../lib/orderUnits'
import { btn } from '../../lib/buttonStyles'
import ProductArt from '../art/ProductArt'

export default function OrdersDashboard() {
  const { lines, clientLabel, lineCount, unitCount, orderTotal, hasClient, clientName, clientPhone } =
    useVisitOrder()
  const resolved = lines.map((l) => ({ line: l, product: getProductById(l.productId) })).filter((x) => x.product)

  const copyOrder = async () => {
    if (!hasClient || lineCount === 0) return
    const text = buildOrderText(clientName, clientPhone, lines, resolved.map((r) => r.product))
    try {
      await navigator.clipboard.writeText(text)
      window.alert('تم نسخ ملخص الطلبية.')
    } catch {
      window.alert(text)
    }
  }

  if (lineCount === 0) {
    return (
      <div className="sales-os-empty">
        <p className="text-[16px] font-medium text-foreground">لا توجد طلبيات مفتوحة</p>
        <p className="mt-2 max-w-md text-[14px] leading-7 text-foreground-muted">
          طلبيات الزيارة تُحفظ محليًا حتى تُنسخ للمكتب. ابدأ طلبية جديدة أمام العميل.
        </p>
        <Link to="/dashboard/order" className={btn('primary', 'mt-6 h-11 rounded-[10px] px-6 text-[14px]')}>
          بدء طلبية زيارة
        </Link>
      </div>
    )
  }

  return (
    <div className="sales-os-section">
      <p className="text-[12px] font-medium tracking-wide text-foreground-muted">طلبيات الزيارة</p>
      <h1 className="display mt-1 text-[1.5rem] text-foreground">طلبية نشطة</h1>
      <p className="mt-2 text-[14px] text-foreground-muted">
        {clientLabel ?? 'عميل غير مكتمل'} · {lineCount} صنف · {unitCount} وحدة · {formatUnitPrice(orderTotal)}
      </p>

      <ul className="ios-list mt-6">
        {resolved.map(({ line, product }) => (
          <li key={`${line.productId}-${line.unit}`} className="ios-list-row flex items-center gap-3">
            <span className="catalog-stage flex size-12 shrink-0 items-center justify-center rounded-[8px]">
              <ProductArt spec={product!.art} shadow={false} className="size-9" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[15px] font-medium text-foreground">{product!.name}</span>
              <span className="text-[13px] text-foreground-muted">
                {line.quantity} {ORDER_UNIT_LABEL[line.unit]} · {formatUnitPrice(lineTotal(line.unitPrice, line.quantity))}
              </span>
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link to="/dashboard/order" className={btn('primary', 'h-11 rounded-[10px] px-5 text-[14px]')}>
          تعديل في مساحة الطلب
        </Link>
        <button
          type="button"
          disabled={!hasClient}
          onClick={copyOrder}
          className={btn('secondary', 'h-11 rounded-[10px] px-5 text-[14px]')}
        >
          نسخ للمكتب
        </button>
      </div>
      {!hasClient && (
        <p className="mt-4 text-[13px] text-foreground-muted">أكمل اسم الشركة والهاتف قبل إرسال الطلبية.</p>
      )}
    </div>
  )
}
