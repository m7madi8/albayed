import { useEffect, useMemo, useRef, useState } from 'react'
import { ChevronDown, Plus } from 'lucide-react'
import { useVisitOrder } from '../../context/VisitOrderContext'
import { loadAllClients, saveCustomClient } from '../../lib/customClients'
import type { SalesClient } from '../../data/clients'
import { btn } from '../../lib/buttonStyles'
import { activateRepMode } from '../../lib/catalogRepMode'
import NewClientModal from '../dashboard/NewClientModal'

export default function CatalogClientBar() {
  const { clientName, setClientName, setOrderClient, hasClient, clientLabel } = useVisitOrder()
  const [clients, setClients] = useState(() => loadAllClients())
  const [modalOpen, setModalOpen] = useState(false)
  const [listOpen, setListOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  const query = clientName.trim()
  const suggestions = useMemo(() => {
    if (!query) return clients.slice(0, 12)
    return clients.filter((c) => c.name.includes(query)).slice(0, 12)
  }, [clients, query])

  useEffect(() => {
    const open = () => {
      activateRepMode()
      setListOpen(true)
      rootRef.current?.querySelector<HTMLButtonElement>('.catalog-client-bar__trigger')?.focus()
    }
    window.addEventListener('al-bayed-open-client-bar', open)
    return () => window.removeEventListener('al-bayed-open-client-bar', open)
  }, [])

  const pickClient = (client: SalesClient) => {
    setOrderClient(client.name, client.phone)
    setListOpen(false)
  }

  const onCreate = (data: { name: string; city: string; phone: string; contact: string }) => {
    const client = saveCustomClient({
      name: data.name,
      city: data.city,
      phone: data.phone,
      contact: data.contact,
    })
    setClients(loadAllClients())
    setOrderClient(client.name, client.phone)
  }

  return (
    <div ref={rootRef} className="catalog-client-bar catalog-client-bar--compact">
      <div className="catalog-client-bar__combobox">
        <button
          type="button"
          className="catalog-client-bar__trigger"
          onClick={() => setListOpen((o) => !o)}
          aria-expanded={listOpen}
          aria-haspopup="listbox"
        >
          <span className="catalog-client-bar__trigger-label">
            {hasClient ? (clientLabel ?? clientName) : 'حدّد العميل'}
          </span>
          <ChevronDown size={16} strokeWidth={1.75} aria-hidden />
        </button>
        {listOpen && (
          <div className="catalog-client-bar__popover">
            <input
              type="text"
              className="ds-input catalog-client-bar__input h-10"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="ابحث عن شركة"
              aria-label="بحث عن عميل"
              autoComplete="organization"
            />
            <ul className="catalog-client-bar__suggestions" role="listbox">
              {suggestions.map((c) => (
                <li key={c.id} role="option">
                  <button
                    type="button"
                    className="catalog-client-bar__suggestion"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => pickClient(c)}
                  >
                    <span className="catalog-client-bar__suggestion-name">{c.name}</span>
                    {c.city ? (
                      <span className="catalog-client-bar__suggestion-meta">{c.city}</span>
                    ) : null}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <button
        type="button"
        onClick={() => setModalOpen(true)}
        className={btn('ghost', 'catalog-client-bar__add h-10 gap-1.5 px-3 text-[13px]')}
      >
        <Plus size={16} strokeWidth={2} aria-hidden />
        عميل جديد
      </button>
      <NewClientModal open={modalOpen} onClose={() => setModalOpen(false)} onCreate={onCreate} />
    </div>
  )
}
