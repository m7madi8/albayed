import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, ChevronLeft, X } from 'lucide-react'
import { useSubmittedOrders } from '../../hooks/useSubmittedOrders'
import {
  SUBMITTED_ORDER_STATUS_LABEL,
  formatSubmittedOrderWhen,
  type SubmittedOrder,
  type SubmittedOrderStatus,
} from '../../lib/submittedOrders'
import { formatUnitPrice, lineTotal } from '../../lib/customerPricing'
import { ORDER_UNIT_LABEL } from '../../lib/orderUnits'
import { btn } from '../../lib/buttonStyles'

type Filter = 'all' | SubmittedOrderStatus

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'pending', label: 'قيد المراجعة' },
  { id: 'accepted', label: 'مقبولة' },
  { id: 'rejected', label: 'مرفوضة' },
  { id: 'all', label: 'الكل' },
]

function statusClass(status: SubmittedOrderStatus): string {
  if (status === 'accepted') return 'order-status order-status--accepted'
  if (status === 'rejected') return 'order-status order-status--rejected'
  return 'order-status order-status--pending'
}

function OrderDetail({
  order,
  onAccept,
  onReject,
  onBack,
}: {
  order: SubmittedOrder
  onAccept: () => void
  onReject: () => void
  onBack: () => void
}) {
  const unitCount = order.lines.reduce((n, l) => n + l.quantity, 0)

  return (
    <div className="sales-os-section">
      <button type="button" onClick={onBack} className={btn('ghost', 'mb-4 h-10 gap-1 px-2 text-[14px]')}>
        <ChevronLeft size={18} className="rotate-180" aria-hidden />
        العودة للقائمة
      </button>

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[12px] font-medium tracking-wide text-foreground-muted">طلبية</p>
          <h1 className="display mt-1 text-[1.5rem] text-foreground">{order.clientName}</h1>
          <p className="mt-2 text-[14px] text-foreground-muted" dir="ltr">{order.clientPhone}</p>
          <p className="mt-1 text-[13px] text-foreground-muted">{formatSubmittedOrderWhen(order.createdAt)}</p>
        </div>
        <span className={statusClass(order.status)}>{SUBMITTED_ORDER_STATUS_LABEL[order.status]}</span>
      </div>

      <p className="mt-4 text-[14px] text-foreground-secondary">
        {order.lines.length} صنف · {unitCount} وحدة · {formatUnitPrice(order.orderTotal)}
      </p>

      <ul className="ios-list mt-6">
        {order.lines.map((line) => (
          <li key={`${line.productId}-${line.unit}`} className="ios-list-row">
            <span className="block text-[15px] font-medium text-foreground">{line.productName}</span>
            <span className="mt-0.5 block text-[12px] text-foreground-muted" dir="ltr">{line.productId}</span>
            <span className="mt-1 block text-[13px] text-foreground-muted">
              {line.quantity} {ORDER_UNIT_LABEL[line.unit]} · {formatUnitPrice(line.unitPrice)} ={' '}
              {formatUnitPrice(lineTotal(line.unitPrice, line.quantity))}
            </span>
          </li>
        ))}
      </ul>

      {order.status === 'pending' ? (
        <div className="mt-8 flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={onAccept}
            className={btn('primary', 'flex h-11 flex-1 items-center justify-center gap-2 rounded-[10px] text-[14px]')}
          >
            <Check size={18} aria-hidden />
            قبول الطلبية
          </button>
          <button
            type="button"
            onClick={onReject}
            className={btn('secondary', 'flex h-11 flex-1 items-center justify-center gap-2 rounded-[10px] text-[14px]')}
          >
            <X size={18} aria-hidden />
            رفض
          </button>
        </div>
      ) : order.reviewedAt ? (
        <p className="mt-6 text-[13px] text-foreground-muted">
          تمت المراجعة: {formatSubmittedOrderWhen(order.reviewedAt)}
        </p>
      ) : null}
    </div>
  )
}

export default function OrdersDashboard() {
  const { orders, pendingCount, acceptOrder, rejectOrder } = useSubmittedOrders()
  const [filter, setFilter] = useState<Filter>('pending')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const filtered = useMemo(() => {
    if (filter === 'all') return orders
    return orders.filter((o) => o.status === filter)
  }, [orders, filter])

  const selected = selectedId ? orders.find((o) => o.id === selectedId) : undefined

  if (selected) {
    return (
      <OrderDetail
        order={selected}
        onBack={() => setSelectedId(null)}
        onAccept={() => {
          acceptOrder(selected.id)
          setSelectedId(null)
        }}
        onReject={() => {
          rejectOrder(selected.id)
          setSelectedId(null)
        }}
      />
    )
  }

  return (
    <div className="sales-os-section">
      <header className="mb-6">
        <p className="text-[12px] font-medium tracking-wide text-foreground-muted">الإدارة</p>
        <h1 className="display mt-1 text-[1.5rem] text-foreground lg:text-[1.75rem]">الطلبيات</h1>
        <p className="mt-2 max-w-xl text-[14px] leading-7 text-foreground-muted">
          طلبيات المندوبين بعد الإرسال من الكتالوج — راجعها واقبلها أو ارفضها.
          {pendingCount > 0 ? ` (${pendingCount} بانتظار المراجعة)` : ''}
        </p>
      </header>

      <div className="flex flex-wrap gap-2" role="tablist" aria-label="تصفية الطلبيات">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            role="tab"
            aria-selected={filter === f.id}
            onClick={() => setFilter(f.id)}
            className={btn(
              filter === f.id ? 'primary' : 'secondary',
              'h-10 rounded-[10px] px-4 text-[13px]',
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="sales-os-empty mt-10">
          <p className="text-[16px] font-medium text-foreground">لا توجد طلبيات</p>
          <p className="mt-2 max-w-md text-[14px] leading-7 text-foreground-muted">
            {filter === 'pending'
              ? 'عند إرسال طلبية من صفحة مراجعة الطلب في الكتالوج ستظهر هنا.'
              : 'لا توجد طلبيات في هذا التصنيف.'}
          </p>
          <Link to="/products" className={btn('primary', 'mt-6 h-11 rounded-[10px] px-6 text-[14px]')}>
            فتح الكتالوج
          </Link>
        </div>
      ) : (
        <ul className="ios-list mt-6">
          {filtered.map((order) => {
            const units = order.lines.reduce((n, l) => n + l.quantity, 0)
            return (
              <li key={order.id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(order.id)}
                  className="ios-list-row w-full text-right"
                >
                  <span className="flex items-start justify-between gap-3">
                    <span className="min-w-0 flex-1">
                      <span className="block text-[15px] font-medium text-foreground">{order.clientName}</span>
                      <span className="mt-0.5 block text-[13px] text-foreground-muted">
                        {order.lines.length} صنف · {units} وحدة · {formatUnitPrice(order.orderTotal)}
                      </span>
                      <span className="mt-0.5 block text-[12px] text-foreground-muted">
                        {formatSubmittedOrderWhen(order.createdAt)}
                      </span>
                    </span>
                    <span className={statusClass(order.status)}>{SUBMITTED_ORDER_STATUS_LABEL[order.status]}</span>
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
