import { useEffect, useState } from 'react'

export function parseQuantity(text: string, fallback = 1): number {
  const n = parseInt(text.trim(), 10)
  if (!Number.isFinite(n) || n < 1) return fallback
  return n
}

export default function QuantityInput({
  value,
  onChange,
  className = '',
  'aria-label': ariaLabel = 'الكمية',
}: {
  value: number
  onChange: (quantity: number) => void
  className?: string
  'aria-label'?: string
}) {
  const [text, setText] = useState(String(value))

  useEffect(() => {
    setText(String(value))
  }, [value])

  const commit = (raw: string) => {
    const next = parseQuantity(raw, value)
    setText(String(next))
    onChange(next)
  }

  return (
    <input
      type="number"
      inputMode="numeric"
      min={1}
      step={1}
      aria-label={ariaLabel}
      value={text}
      onChange={(e) => {
        const v = e.target.value
        setText(v)
        const n = parseInt(v, 10)
        if (Number.isFinite(n) && n >= 1) onChange(n)
      }}
      onBlur={() => commit(text)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault()
          commit(text)
        }
      }}
      className={`ds-input text-center font-medium tabular-nums outline-none ${className}`}
    />
  )
}
