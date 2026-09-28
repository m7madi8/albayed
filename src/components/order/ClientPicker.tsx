import { useVisitOrder } from '../../context/VisitOrderContext'

export default function ClientPicker({ compact = false }: { compact?: boolean }) {
  const { clientName, clientPhone, setClientName, setClientPhone } = useVisitOrder()
  const fieldClass = `ds-input outline-none ${compact ? 'h-11' : 'min-h-[52px]'}`

  return (
    <div className={compact ? 'flex flex-col gap-2' : 'flex flex-col gap-3'}>
      <label className="block">
        <span className="type-caption mb-1.5 block font-medium text-foreground-secondary">اسم شركة العميل</span>
        <input
          type="text"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          placeholder="اسم الشركة"
          autoComplete="organization"
          className={fieldClass}
        />
      </label>
      <label className="block">
        <span className="type-caption mb-1.5 block font-medium text-foreground-secondary">رقم الهاتف</span>
        <input
          type="tel"
          value={clientPhone}
          onChange={(e) => setClientPhone(e.target.value)}
          placeholder="05xxxxxxxx"
          autoComplete="tel"
          dir="ltr"
          className={`${fieldClass} text-left`}
        />
      </label>
    </div>
  )
}
