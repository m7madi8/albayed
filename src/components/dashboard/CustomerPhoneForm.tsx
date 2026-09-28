import { useState } from 'react'
import { btn } from '../../lib/buttonStyles'
import { isValidClientPhone } from '../../lib/clientPhone'

export default function CustomerPhoneForm({
  onSave,
}: {
  onSave: (phone: string) => void
}) {
  const [phone, setPhone] = useState('')
  const valid = isValidClientPhone(phone)

  return (
    <div className="ios-tile mt-6 p-4 sm:p-5">
      <p className="text-[15px] font-medium text-foreground">رقم الهاتف مطلوب</p>
      <p className="mt-1 text-[14px] leading-7 text-foreground-muted">
        أدخل رقم هاتف العميل لإكمال ملفه وبدء الطلبية.
      </p>
      <label className="mt-4 block">
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
      <button
        type="button"
        disabled={!valid}
        onClick={() => onSave(phone.trim())}
        className={btn('primary', 'mt-4 h-11 w-full rounded-[12px] text-[14px] sm:w-auto sm:px-6')}
      >
        حفظ رقم الهاتف
      </button>
    </div>
  )
}
