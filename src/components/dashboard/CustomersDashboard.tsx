import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { ChevronLeft, Plus, Search, X } from 'lucide-react'
import type { SalesClient } from '../../data/clients'
import { loadAllClients, saveCustomClient } from '../../lib/customClients'
import { filterClients } from '../../lib/filterClients'
import { btn } from '../../lib/buttonStyles'
import { useVisitOrder } from '../../context/VisitOrderContext'
import NewClientModal from './NewClientModal'

export default function CustomersDashboard() {
  const [clients, setClients] = useState<SalesClient[]>(() => loadAllClients())
  const [modalOpen, setModalOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { setOrderClient } = useVisitOrder()

  const refresh = useCallback(() => setClients(loadAllClients()), [])

  useEffect(() => {
    if (searchParams.get('new') !== '1') return
    setModalOpen(true)
    const next = new URLSearchParams(searchParams)
    next.delete('new')
    setSearchParams(next, { replace: true })
  }, [searchParams, setSearchParams])

  const filtered = useMemo(() => filterClients(clients, query), [clients, query])

  const onCreate = (data: { name: string; city: string; phone: string; contact: string }) => {
    const client = saveCustomClient(data)
    refresh()
    setOrderClient(client.name, client.phone)
    navigate(`/dashboard/customers/${client.id}`)
  }

  const openSearch = () => {
    setSearchOpen(true)
    requestAnimationFrame(() => searchRef.current?.focus())
  }

  const closeSearch = () => {
    setSearchOpen(false)
    setQuery('')
  }

  return (
    <div className="sales-os-section">
      <header className="mb-6">
        <p className="text-[12px] font-medium tracking-wide text-foreground-muted">العملاء</p>
        <h1 className="display mt-1 text-[1.5rem] text-foreground lg:text-[1.75rem]">قائمة الشركات</h1>
      </header>
      <div className="section-actions">
        <p className="max-w-xl text-[14px] leading-7 text-foreground-muted sm:text-[15px]">
          اضغط على عميل لعرض ملفه وكشف الحساب إن وُجد، أو أضف شركة جديدة.
        </p>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={searchOpen ? closeSearch : openSearch}
            className={btn(
              searchOpen ? 'primary' : 'secondary',
              'h-11 w-full gap-2 rounded-[12px] px-5 text-[14px] sm:w-auto',
            )}
            aria-expanded={searchOpen}
            aria-controls="customers-search-panel"
          >
            <Search size={18} strokeWidth={2} aria-hidden />
            بحث العملاء
          </button>
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className={btn('primary', 'h-11 w-full gap-2 rounded-[12px] px-5 text-[14px] sm:w-auto')}
          >
            <Plus size={18} strokeWidth={2} aria-hidden />
            إنشاء عميل جديد
          </button>
        </div>
      </div>

      {searchOpen && (
        <div id="customers-search-panel" className="ios-tile mt-4 flex items-center gap-2 px-3 py-2 sm:mt-5 sm:px-4">
          <Search size={18} strokeWidth={1.75} className="shrink-0 text-foreground-muted" aria-hidden />
          <input
            ref={searchRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="الاسم، المدينة، الهاتف، أو جهة الاتصال..."
            className="min-w-0 flex-1 bg-transparent py-2.5 text-[15px] text-foreground placeholder:text-foreground-muted outline-none"
            autoComplete="off"
          />
          {query.length > 0 && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="مسح البحث"
              className="ui-icon-btn inline-flex size-9 shrink-0 items-center justify-center rounded-full text-foreground-muted"
            >
              <X size={18} strokeWidth={1.75} />
            </button>
          )}
        </div>
      )}

      {clients.length === 0 ? (
        <div className="ios-tile mt-8 px-5 py-12 text-center">
          <p className="text-[16px] font-medium text-foreground">لا يوجد عملاء بعد</p>
          <p className="mt-2 text-[14px] leading-7 text-foreground-muted">ابدأ بإنشاء عميل جديد ليظهر في القائمة.</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="ios-tile mt-8 px-5 py-12 text-center">
          <p className="text-[16px] font-medium text-foreground">لا توجد نتائج</p>
          <p className="mt-2 text-[14px] leading-7 text-foreground-muted">
            لم نجد عميلاً يطابق «{query}». جرّب كتابة مختلفة أو امسح البحث.
          </p>
          <button type="button" onClick={() => setQuery('')} className={btn('light', 'mt-5 h-11 rounded-[12px] px-5 text-[14px]')}>
            مسح البحث
          </button>
        </div>
      ) : (
        <div className="ios-list mt-8">
          {searchOpen && query.trim() && (
            <p className="border-b border-border px-4 py-3 text-[13px] text-foreground-muted">
              {filtered.length} نتيجة
            </p>
          )}
          {filtered.map((client) => (
            <Link
              key={client.id}
              to={`/dashboard/customers/${client.id}`}
              className="ios-list-row flex w-full items-center justify-between gap-3 text-right"
            >
              <span className="min-w-0">
                <span className="block text-[15px] font-medium text-foreground">{client.name}</span>
                <span className="mt-0.5 block text-[13px] text-foreground-muted">
                  {client.city}
                  {client.contact ? ` · ${client.contact}` : ''}
                </span>
                <span className="mt-0.5 block text-[12px] text-foreground-secondary" dir="ltr">
                  {client.phone}
                </span>
              </span>
              <ChevronLeft size={18} className="shrink-0 text-foreground-muted" aria-hidden />
            </Link>
          ))}
        </div>
      )}

      <NewClientModal open={modalOpen} onClose={() => setModalOpen(false)} onCreate={onCreate} />
    </div>
  )
}
