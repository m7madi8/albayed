import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ClipboardList } from 'lucide-react'
import { findClientById, updateClientPhone } from '../lib/customClients'
import { getClientStatement, formatStatementAmount } from '../data/clientStatements'
import { isValidClientPhone } from '../lib/clientPhone'
import { useVisitOrder } from '../context/VisitOrderContext'
import { btn } from '../lib/buttonStyles'
import CustomerPhoneForm from '../components/dashboard/CustomerPhoneForm'
import NotFound from './NotFound'

export default function CustomerProfilePage() {
  const { clientId } = useParams<'clientId'>()
  const navigate = useNavigate()
  const { setOrderClient } = useVisitOrder()
  const [client, setClient] = useState(() => (clientId ? findClientById(clientId) : undefined))

  if (!clientId || !client) return <NotFound />

  const hasPhone = isValidClientPhone(client.phone)
  const statement = getClientStatement(clientId)
  const currentBalance =
    statement?.entries.length
      ? statement.entries[statement.entries.length - 1].balance
      : statement?.openingBalance ?? null

  const startOrder = () => {
    if (!hasPhone) return
    setOrderClient(client.name, client.phone)
    navigate('/products')
  }

  const savePhone = (phone: string) => {
    const updated = updateClientPhone(client.id, phone)
    if (updated) setClient(updated)
  }

  return (
    <div className="sales-os-section customer-profile-stack">
      <header className="customer-profile-head">
        <p className="text-[12px] font-medium tracking-wide text-foreground-muted">العميل</p>
        <h1 className="display mt-1 text-[1.5rem] text-foreground lg:text-[1.75rem]">{client.name}</h1>
      </header>

      <section className="sales-os-panel mt-6" aria-labelledby="contact-heading">
        <h2 id="contact-heading" className="text-[13px] font-medium text-foreground-muted">جهة الاتصال</h2>
        <p className="mt-3 text-[15px] text-foreground">
          {client.city}
          {client.contact ? ` · ${client.contact}` : ''}
        </p>
        {hasPhone ? (
          <p className="mt-2 text-[16px] font-medium text-foreground" dir="ltr">{client.phone}</p>
        ) : (
          <div className="mt-4">
            <CustomerPhoneForm onSave={savePhone} />
          </div>
        )}
      </section>

      {hasPhone && (
        <>
          <section className="mt-8" aria-labelledby="orders-heading">
            <h2 id="orders-heading" className="text-[13px] font-medium text-foreground-muted">الطلبيات</h2>
            <p className="mt-2 text-[14px] text-foreground-muted">
              يفتح الكتالوج لاختيار الأصناف — يُربط العميل تلقائيًا باسم الشركة والهاتف.
            </p>
            <button
              type="button"
              onClick={startOrder}
              disabled={!hasPhone}
              className={btn('primary', 'mt-4 h-11 gap-2 rounded-[10px] px-5 text-[14px]')}
            >
              <ClipboardList size={18} aria-hidden />
              بدء طلبية لهذا العميل
            </button>
          </section>

          {statement ? (
            <div className="ios-tile mt-8 overflow-hidden">
              <div className="flex flex-wrap items-end justify-between gap-3 border-b border-border px-4 py-4 sm:px-5">
                <div>
                  <p className="text-[13px] font-medium text-foreground-muted">كشف حساب</p>
                  <p className="mt-1 text-[12px] text-foreground-muted">آخر تحديث: {statement.updatedAt}</p>
                </div>
                {currentBalance !== null && (
                  <div className="text-left sm:text-right">
                    <p className="text-[12px] text-foreground-muted">الرصيد الحالي</p>
                    <p className="display text-[1.35rem] text-foreground">{formatStatementAmount(currentBalance)}</p>
                  </div>
                )}
              </div>

              <div className="table-scroll">
                <table className="w-full min-w-[min(100%,520px)] text-right text-[12px] sm:min-w-[520px] sm:text-[13px]">
                  <thead>
                    <tr className="border-b border-border text-foreground-muted">
                      <th className="px-4 py-3 font-medium sm:px-5">التاريخ</th>
                      <th className="px-4 py-3 font-medium sm:px-5">البيان</th>
                      <th className="px-4 py-3 font-medium sm:px-5">مدين</th>
                      <th className="px-4 py-3 font-medium sm:px-5">دائن</th>
                      <th className="px-4 py-3 font-medium sm:px-5">الرصيد</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/80 bg-surface-muted/40 text-foreground-secondary">
                      <td className="px-4 py-3 sm:px-5">—</td>
                      <td className="px-4 py-3 sm:px-5">رصيد افتتاحي</td>
                      <td className="px-4 py-3 sm:px-5">—</td>
                      <td className="px-4 py-3 sm:px-5">—</td>
                      <td className="px-4 py-3 font-medium text-foreground sm:px-5">
                        {formatStatementAmount(statement.openingBalance)}
                      </td>
                    </tr>
                    {statement.entries.map((row) => (
                      <tr key={row.id} className="border-b border-border/60 last:border-0">
                        <td className="px-4 py-3 text-foreground-muted sm:px-5">{row.date}</td>
                        <td className="px-4 py-3 text-foreground sm:px-5">{row.description}</td>
                        <td className="px-4 py-3 text-foreground sm:px-5">
                          {row.debit > 0 ? formatStatementAmount(row.debit) : '—'}
                        </td>
                        <td className="px-4 py-3 text-foreground sm:px-5">
                          {row.credit > 0 ? formatStatementAmount(row.credit) : '—'}
                        </td>
                        <td className="px-4 py-3 font-medium text-foreground sm:px-5">{formatStatementAmount(row.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="ios-tile mt-8 px-5 py-10 text-center">
              <p className="text-[16px] font-medium text-foreground">لا يوجد كشف حساب</p>
              <p className="mt-2 text-[14px] leading-7 text-foreground-muted">
                لم يُسجَّل كشف لهذا العميل في النظام بعد. يمكنك متابعة بناء الطلبية مباشرة.
              </p>
            </div>
          )}
        </>
      )}

      <div className="mt-10 pb-4 lg:hidden">
        <button
          type="button"
          onClick={() => navigate('/dashboard/customers')}
          className={btn('ghost', 'h-11 w-full rounded-[10px] text-[14px]')}
        >
          العودة للقائمة
        </button>
      </div>
    </div>
  )
}
