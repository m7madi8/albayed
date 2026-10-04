import type { LucideIcon } from 'lucide-react'

export interface VoucherKindOption<T extends string> {
  id: T
  label: string
  hint?: string
  icon: LucideIcon
}

export default function VoucherKindSelector<T extends string>({
  legend,
  required,
  name,
  value,
  onChange,
  options,
  columns = options.length >= 3 ? 3 : 2,
}: {
  legend: string
  required?: boolean
  name: string
  value: T
  onChange: (id: T) => void
  options: VoucherKindOption<T>[]
  columns?: 2 | 3
}) {
  const colsClass = columns === 3 ? 'voucher-kind--cols-3' : 'voucher-kind--cols-2'

  return (
    <fieldset className="voucher-kind-field block border-0 p-0">
      <legend className="type-caption mb-2.5 block font-medium text-foreground-secondary">
        {legend}
        {required ? <span className="text-accent-text"> *</span> : null}
      </legend>
      <div className={`voucher-kind ${colsClass}`} role="radiogroup" aria-label={legend}>
        {options.map((opt) => {
          const selected = value === opt.id
          const Icon = opt.icon
          return (
            <button
              key={opt.id}
              type="button"
              name={name}
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(opt.id)}
              className={`voucher-kind__option ui-press${selected ? ' voucher-kind__option--selected' : ''}`}
            >
              <span className="voucher-kind__icon-wrap" aria-hidden>
                <Icon size={20} strokeWidth={1.65} className="voucher-kind__icon" />
              </span>
              <span className="voucher-kind__label">{opt.label}</span>
              {opt.hint ? <span className="voucher-kind__hint">{opt.hint}</span> : null}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}
