import { useState } from 'react'
import { ChevronLeft, Plus, Wallet } from 'lucide-react'
import { useDisbursementVouchers } from '../../hooks/useDisbursementVouchers'
import {
  disbursementExpenseTitle,
  formatDisbursementAmount,
  formatDisbursementVoucherWhen,
  type DisbursementVoucher,
} from '../../lib/disbursementVouchers'
import { btn } from '../../lib/buttonStyles'
import NewDisbursementVoucherModal from './NewDisbursementVoucherModal'

function VoucherDetail({ voucher, onBack }: { voucher: DisbursementVoucher; onBack: () => void }) {
  const title = disbursementExpenseTitle(voucher)

  return (
    <div className="sales-os-section">
      <button type="button" onClick={onBack} className={btn('ghost', 'mb-4 h-10 gap-1 px-2 text-[14px]')}>
        <ChevronLeft size={18} className="rotate-180" aria-hidden />
        العودة للقائمة
      </button>

      <div>
        <p className="text-[12px] font-medium tracking-wide text-foreground-muted">سند صرف · {title}</p>
        <h1 className="display mt-1 text-[1.5rem] text-foreground">{formatDisbursementAmount(voucher.amount)}</h1>
        <p className="mt-2 text-[13px] text-foreground-muted">{formatDisbursementVoucherWhen(voucher.createdAt)}</p>
      </div>

      <div className="ios-tile mt-6 px-4 py-4">
        <p className="type-caption font-medium text-foreground-secondary">ملاحظات</p>
        <p className="mt-2 whitespace-pre-wrap text-[15px] leading-7 text-foreground">{voucher.notes}</p>
      </div>

      <div className="ios-tile mt-4 overflow-hidden p-0">
        <p className="border-b border-border px-4 py-3 text-[13px] font-medium text-foreground-secondary">صورة الوصل</p>
        <img
          src={voucher.receiptImageDataUrl}
          alt={`صورة وصل — ${title}`}
          className="max-h-[min(70vh,520px)] w-full object-contain bg-surface-muted"
        />
      </div>
    </div>
  )
}

export default function DisbursementVouchersDashboard() {
  const { vouchers, refresh } = useDisbursementVouchers()
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const selected = selectedId ? vouchers.find((v) => v.id === selectedId) : undefined

  if (selected) {
    return <VoucherDetail voucher={selected} onBack={() => setSelectedId(null)} />
  }

  return (
    <div className="sales-os-section">
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[12px] font-medium tracking-wide text-foreground-muted">المالية</p>
          <h1 className="display mt-1 text-[1.5rem] text-foreground lg:text-[1.75rem]">سندات الصرف</h1>
          <p className="mt-2 max-w-lg text-[14px] leading-7 text-foreground-muted">
            مصروفات المندوب مثل المحروقات — مع المبلغ والملاحظات وصورة الوصل.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className={btn('primary', 'h-11 gap-2 rounded-[10px] px-5 text-[14px]')}
        >
          <Plus size={18} strokeWidth={2} aria-hidden />
          سند صرف جديد
        </button>
      </header>

      {vouchers.length === 0 ? (
        <div className="sales-os-empty">
          <span
            className="mx-auto flex size-14 items-center justify-center rounded-[12px] border border-border bg-surface-muted text-foreground-muted"
            aria-hidden
          >
            <Wallet size={28} strokeWidth={1.5} />
          </span>
          <p className="mt-5 text-[16px] font-medium text-foreground">لا توجد سندات صرف</p>
          <p className="mx-auto mt-2 max-w-md text-[14px] leading-7 text-foreground-muted">
            سجّل محروقات أو مصروفاً آخر وأرفق صورة الوصل.
          </p>
        </div>
      ) : (
        <div className="ios-list">
          {vouchers.map((v) => {
            const title = disbursementExpenseTitle(v)
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => setSelectedId(v.id)}
                className="ios-list-row flex w-full items-center justify-between gap-3 text-right"
              >
                <span className="min-w-0">
                  <span className="block text-[15px] font-medium text-foreground">{title}</span>
                  <span className="mt-0.5 line-clamp-2 text-[13px] text-foreground-muted">{v.notes}</span>
                  <span className="mt-1 block text-[12px] text-foreground-secondary">
                    {formatDisbursementVoucherWhen(v.createdAt)} · {formatDisbursementAmount(v.amount)}
                  </span>
                </span>
                <ChevronLeft size={18} className="shrink-0 text-foreground-muted" aria-hidden />
              </button>
            )
          })}
        </div>
      )}

      <NewDisbursementVoucherModal open={modalOpen} onClose={() => setModalOpen(false)} onSaved={refresh} />
    </div>
  )
}
