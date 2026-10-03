import { Receipt } from 'lucide-react'
import { btn } from '../../lib/buttonStyles'

export default function ReceiptVouchersDashboard() {
  return (
    <div className="sales-os-section">
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[12px] font-medium tracking-wide text-foreground-muted">المالية</p>
          <h1 className="display mt-1 text-[1.5rem] text-foreground lg:text-[1.75rem]">سندات القبض</h1>
        </div>
        <button type="button" disabled className={btn('primary', 'h-11 rounded-[10px] px-5 text-[14px] opacity-50')}>
          سند قبض جديد
        </button>
      </header>

      <div className="sales-os-empty">
        <span
          className="mx-auto flex size-14 items-center justify-center rounded-[12px] border border-border bg-surface-muted text-foreground-muted"
          aria-hidden
        >
          <Receipt size={28} strokeWidth={1.5} />
        </span>
        <p className="mt-5 text-[16px] font-medium text-foreground">لا توجد سندات قبض</p>
        <p className="mx-auto mt-2 max-w-md text-[14px] leading-7 text-foreground-muted">
          لم يُسجَّل أي سند بعد. استخدم «سند قبض جديد» لتوثيق المبالغ المحصّلة من العملاء.
        </p>
      </div>
    </div>
  )
}
