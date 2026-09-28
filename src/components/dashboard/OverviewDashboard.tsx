import { Link } from 'react-router-dom'
import { ClipboardList, Plus, Search, Users } from 'lucide-react'
import { loadAllClients } from '../../lib/customClients'
import { useVisitOrder } from '../../context/VisitOrderContext'
import { btn } from '../../lib/buttonStyles'
import { useCatalogSearch } from '../../context/SearchOpenContext'

export default function OverviewDashboard() {
  const { clientLabel, lineCount, unitCount, hasClient } = useVisitOrder()
  const clients = loadAllClients()
  const { openSearch } = useCatalogSearch()

  return (
    <div className="sales-os-section">
      <header className="sales-os-page-head">
        <div>
          <p className="text-[12px] font-medium tracking-wide text-foreground-muted">نظرة عامة</p>
          <h1 className="display mt-1 text-[1.5rem] text-foreground lg:text-[1.75rem]">مساحة العمل</h1>
          <p className="mt-2 max-w-xl text-[14px] leading-7 text-foreground-muted">
            ما يحتاج انتباهك الآن — بدون أرقام وهمية.
          </p>
        </div>
        <div className="sales-os-quick-actions">
          <Link to="/dashboard/order" className={btn('primary', 'sales-os-action-btn gap-2')}>
            <ClipboardList size={18} aria-hidden />
            طلبية جديدة
          </Link>
          <Link to="/dashboard/customers?new=1" className={btn('secondary', 'sales-os-action-btn gap-2')}>
            <Plus size={18} aria-hidden />
            عميل جديد
          </Link>
          <button type="button" onClick={openSearch} className={btn('secondary', 'sales-os-action-btn gap-2')}>
            <Search size={18} aria-hidden />
            بحث
          </button>
        </div>
      </header>

      <section className="sales-os-focus mt-8" aria-labelledby="focus-heading">
        <h2 id="focus-heading" className="text-[13px] font-medium text-foreground-muted">الآن</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div className="sales-os-panel">
            <p className="text-[12px] font-medium text-foreground-muted">طلبية الزيارة</p>
            {lineCount > 0 ? (
              <>
                <p className="mt-2 text-[16px] font-medium text-foreground">
                  {lineCount} صنف · {unitCount} وحدة
                </p>
                <p className="mt-1 truncate text-[14px] text-foreground-muted">{clientLabel ?? 'حدّد العميل في الطلبية'}</p>
                <Link to="/dashboard/order" className={btn('primary', 'mt-4 h-11 w-full rounded-[10px] text-[14px]')}>
                  متابعة الطلبية
                </Link>
              </>
            ) : (
              <>
                <p className="mt-2 text-[15px] text-foreground">لا توجد طلبية مفتوحة</p>
                <p className="mt-1 text-[14px] text-foreground-muted">ابدأ باختيار العميل ثم أضف الأصناف.</p>
                <Link to="/dashboard/order" className={btn('secondary', 'mt-4 h-11 w-full rounded-[10px] text-[14px]')}>
                  بدء طلبية
                </Link>
              </>
            )}
          </div>

          <div className="sales-os-panel">
            <p className="text-[12px] font-medium text-foreground-muted">العملاء</p>
            <p className="mt-2 text-[16px] font-medium text-foreground">{clients.length} عميل مسجّل</p>
            <p className="mt-1 text-[14px] text-foreground-muted">
              {hasClient ? `الجلسة الحالية: ${clientLabel}` : 'لم يُحدَّد عميل للطلبية بعد.'}
            </p>
            <Link
              to="/dashboard/customers"
              className={btn('secondary', 'mt-4 h-11 w-full rounded-[10px] text-[14px]')}
            >
              <Users size={16} className="me-1" aria-hidden />
              فتح قائمة العملاء
            </Link>
          </div>
        </div>
      </section>

      {clients.length > 0 && (
        <section className="mt-10" aria-labelledby="clients-recent">
          <div className="flex items-end justify-between gap-3">
            <h2 id="clients-recent" className="text-[13px] font-medium text-foreground-muted">عملاء للمتابعة</h2>
            <Link to="/dashboard/customers" className="text-[13px] font-medium text-accent">كل العملاء</Link>
          </div>
          <ul className="ios-list mt-3">
            {clients.slice(0, 5).map((c) => (
              <li key={c.id}>
                <Link to={`/dashboard/customers/${c.id}`} className="ios-list-row block">
                  <span className="text-[15px] font-medium text-foreground">{c.name}</span>
                  <span className="mt-0.5 block text-[13px] text-foreground-muted">{c.city}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
