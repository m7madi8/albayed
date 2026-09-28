import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { btn } from '../../lib/buttonStyles'
import { isValidClientPhone } from '../../lib/clientPhone'
import ModalPortal from '../ui/ModalPortal'

export default function NewClientModal({
  open,
  onClose,
  onCreate,
}: {
  open: boolean
  onClose: () => void
  onCreate: (data: { name: string; city: string; phone: string; contact: string }) => void
}) {
  const [name, setName] = useState('')
  const [city, setCity] = useState('')
  const [phone, setPhone] = useState('')
  const [contact, setContact] = useState('')

  useEffect(() => {
    if (open) {
      setName('')
      setCity('')
      setPhone('')
      setContact('')
    }
  }, [open])

  const canSubmit = name.trim().length > 0 && city.trim().length > 0 && isValidClientPhone(phone)

  const submit = () => {
    if (!canSubmit) return
    onCreate({
      name: name.trim(),
      city: city.trim(),
      phone: phone.trim(),
      contact: contact.trim(),
    })
    onClose()
  }

  return (
    <ModalPortal open={open} onClose={onClose} labelledBy="new-client-title">
      <div className="app-modal-head">
        <div className="min-w-0 flex-1">
          <p id="new-client-title" className="text-[15px] font-medium text-foreground sm:text-[16px]">إنشاء عميل جديد</p>
          <p className="mt-1 text-[13px] leading-6 text-foreground-muted">يُحفظ على الجهاز حتى ربط نظام المبيعات.</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="إغلاق"
          className="ui-icon-btn inline-flex size-10 shrink-0 items-center justify-center rounded-full text-foreground-muted"
        >
          <X size={20} strokeWidth={1.75} />
        </button>
      </div>

      <div className="app-modal-body flex flex-col gap-4">
        <label className="block">
          <span className="type-caption mb-1.5 block font-medium text-foreground-secondary">اسم الشركة</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="اسم الشركة التجاري"
            autoComplete="organization"
            className="ds-input h-12"
          />
        </label>
        <label className="block">
          <span className="type-caption mb-1.5 block font-medium text-foreground-secondary">رقم الهاتف</span>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="05xxxxxxxx"
            autoComplete="tel"
            dir="ltr"
            className="ds-input h-12 text-left"
          />
        </label>
        <label className="block">
          <span className="type-caption mb-1.5 block font-medium text-foreground-secondary">المدينة</span>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="مثال: رام الله"
            autoComplete="address-level2"
            className="ds-input h-12"
          />
        </label>
        <label className="block">
          <span className="type-caption mb-1.5 block font-medium text-foreground-secondary">جهة الاتصال (اختياري)</span>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="مثال: أ. محمود"
            className="ds-input h-12"
          />
        </label>
      </div>

      <div className="app-modal-foot flex flex-col gap-2.5 sm:flex-row">
        <button type="button" onClick={onClose} className={btn('ghost', 'h-11 flex-1 rounded-[12px] text-[14px]')}>
          إلغاء
        </button>
        <button
          type="button"
          disabled={!canSubmit}
          onClick={submit}
          className={btn('primary', 'h-11 flex-1 rounded-[12px] text-[14px]')}
        >
          حفظ العميل
        </button>
      </div>
    </ModalPortal>
  )
}
