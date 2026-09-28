import { useMemo, useRef, useState } from 'react'
import { Plus } from 'lucide-react'
import { useVisitOrder } from '../../context/VisitOrderContext'
import { loadAllClients, saveCustomClient } from '../../lib/customClients'
import type { SalesClient } from '../../data/clients'
import { btn } from '../../lib/buttonStyles'
import NewClientModal from '../dashboard/NewClientModal'

export default function CatalogClientBar() {
  const { clientName, setClientName, setOrderClient } = useVisitOrder()
  const [clients, setClients] = useState(() => loadAllClients())
  const [modalOpen, setModalOpen] = useState(false)
  const [listOpen, setListOpen] = useState(false)
  const blurTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const query = clientName.trim()
  const suggestions = useMemo(() => {
    if (!query) return clients.slice(0, 12)
    return clients.filter((c) => c.name.includes(query)).slice(0, 12)
  }, [clients, query])

  const pickClient = (client: SalesClient) => {
    setOrderClient(client.name, client.phone)
    setListOpen(false)
  }

  const commitTypedName = () => {
    const name = clientName.trim()
    if (!name) return
    const exact = clients.filter((c) => c.name === name)
    if (exact.length === 1) pickClient(exact[0])
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

  const onFocus = () => {
    if (blurTimer.current) clearTimeout(blurTimer.current)
    setListOpen(true)
  }

  const onBlur = () => {
    blurTimer.current = setTimeout(() => {
      setListOpen(false)
      commitTypedName()
    }, 120)
  }

  return (
    <div className="catalog-client-bar">
      <label className="catalog-client-bar__field catalog-client-bar__combobox">
        <span className="catalog-client-bar__label">الشركة</span>
        <input
          type="text"
          className="ds-input catalog-client-bar__input h-11"
          value={clientName}
          onChange={(e) => {
            setClientName(e.target.value)
            setListOpen(true)
          }}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder="اكتب اسم الشركة"
          autoComplete="organization"
          aria-label="اسم الشركة"
          aria-expanded={listOpen && suggestions.length > 0}
          aria-autocomplete="list"
          role="combobox"
        />
        {listOpen && suggestions.length > 0 && (
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
        )}
      </label>
      <button
        type="button"
        onClick={() => setModalOpen(true)}
        className={btn('primary', 'catalog-client-bar__add h-11 gap-2 rounded-[12px] px-4 text-[14px]')}
      >
        <Plus size={18} strokeWidth={2} aria-hidden />
        عميل جديد
      </button>
      <NewClientModal open={modalOpen} onClose={() => setModalOpen(false)} onCreate={onCreate} />
    </div>
  )
}
