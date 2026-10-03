import { Link } from 'react-router-dom'
import { Users } from 'lucide-react'
import SalesWorkspaceHero from '../sales-os/SalesWorkspaceHero'
import { loadAllClients } from '../../lib/customClients'
import { formatSubmittedOrderWhen, loadSubmittedOrders } from '../../lib/submittedOrders'
import { useVisitOrder } from '../../context/VisitOrderContext'
import { btn } from '../../lib/buttonStyles'

export default function OverviewDashboard() {
  const { clientLabel, lineCount, unitCount } = useVisitOrder()
  const clients = loadAllClients()
  const orders = loadSubmittedOrders()
  const pendingOrders = orders.filter((o) => o.status === 'pending')

  return (
    <div className="sales-os-overview">
      <SalesWorkspaceHero />

      <div className="sales-os-overview__body sales-os-section">
        <section className="rep-queue" aria-labelledby="queue-heading">
          <div className="rep-queue__head">
            <h2 id="queue-heading" className="rep-queue__title">قائمة المتابعة</h2>
            <Link to="/dashboard/orders" className="rep-queue__link">كل الطلبيات</Link>
          </div>

          <ul className="ios-list">
            {lineCount > 0 && (
              <li>
                <Link to="/visit-order" className="ios-list-row block">
                  <span className="text-[15px] font-medium text-foreground">طلبية الزيارة الحالية</span>
                  <span className="mt-0.5 block text-[13px] text-foreground-muted">
                    {lineCount} صنف · {unitCount} وحدة
                    {clientLabel ? ` · ${clientLabel}` : ''}
                  </span>
                </Link>
              </li>
            )}
            {pendingOrders.slice(0, 3).map((o) => (
              <li key={o.id}>
                <Link to="/dashboard/orders" className="ios-list-row block">
                  <span className="text-[15px] font-medium text-foreground">طلبية بانتظار الاعتماد</span>
                  <span className="mt-0.5 block text-[13px] text-foreground-muted">
                    {o.clientName} · {formatSubmittedOrderWhen(o.createdAt)}
                  </span>
                </Link>
              </li>
            ))}
            {lineCount === 0 && pendingOrders.length === 0 && (
              <li className="ios-list-row text-[14px] text-foreground-muted">
                لا توجد مهام عاجلة — افتح الكتالوج أو راجع العملاء.
              </li>
            )}
          </ul>
        </section>

        {clients.length > 0 && (
          <section className="mt-10" aria-labelledby="clients-recent">
            <div className="rep-queue__head">
              <h2 id="clients-recent" className="rep-queue__title">عملاء للمتابعة</h2>
              <Link to="/dashboard/customers" className="rep-queue__link">كل العملاء</Link>
            </div>
            <ul className="ios-list">
              {clients.slice(0, 6).map((c) => (
                <li key={c.id}>
                  <Link to={`/dashboard/customers/${c.id}`} className="ios-list-row block">
                    <span className="text-[15px] font-medium text-foreground">{c.name}</span>
                    <span className="mt-0.5 block text-[13px] text-foreground-muted">{c.city}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              to="/dashboard/customers?new=1"
              className={btn('secondary', 'mt-4 h-11 w-full gap-2 sm:w-auto')}
            >
              <Users size={16} aria-hidden />
              عميل جديد
            </Link>
          </section>
        )}
      </div>
    </div>
  )
}
