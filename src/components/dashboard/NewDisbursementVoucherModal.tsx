import { useEffect, useRef, useState } from 'react'
import { Fuel, ImagePlus, Tag, X } from 'lucide-react'
import {
  DISBURSEMENT_EXPENSE_KIND_LABEL,
  RECEIPT_IMAGE_MAX_BYTES,
  saveDisbursementVoucher,
  type DisbursementExpenseKind,
} from '../../lib/disbursementVouchers'
import {
  voucherAttachmentHintLine,
  voucherAttachmentTooLargeMessage,
} from '../../lib/voucherAttachmentLimits'
import { btn } from '../../lib/buttonStyles'
import ModalPortal from '../ui/ModalPortal'
import VoucherKindSelector, { type VoucherKindOption } from './VoucherKindSelector'

const EXPENSE_OPTIONS: VoucherKindOption<DisbursementExpenseKind>[] = [
  { id: 'fuel', label: DISBURSEMENT_EXPENSE_KIND_LABEL.fuel, hint: 'وقود وسفر', icon: Fuel },
  { id: 'other', label: DISBURSEMENT_EXPENSE_KIND_LABEL.other, hint: 'وصف مخصّص', icon: Tag },
]

function readImageFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') resolve(reader.result)
      else reject(new Error('invalid_image'))
    }
    reader.onerror = () => reject(reader.error ?? new Error('read_failed'))
    reader.readAsDataURL(file)
  })
}

function parseAmountInput(raw: string): number | null {
  const normalized = raw.replace(/,/g, '.').trim()
  if (!normalized) return null
  const n = Number.parseFloat(normalized)
  if (!Number.isFinite(n) || n <= 0) return null
  return n
}

export default function NewDisbursementVoucherModal({
  open,
  onClose,
  onSaved,
}: {
  open: boolean
  onClose: () => void
  onSaved: () => void
}) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [kind, setKind] = useState<DisbursementExpenseKind>('fuel')
  const [expenseLabel, setExpenseLabel] = useState('')
  const [amountInput, setAmountInput] = useState('')
  const [notes, setNotes] = useState('')
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageName, setImageName] = useState('')
  const [imageError, setImageError] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!open) return
    setKind('fuel')
    setExpenseLabel('')
    setAmountInput('')
    setNotes('')
    setImagePreview(null)
    setImageName('')
    setImageError(null)
    setSubmitError(null)
    setSaving(false)
  }, [open])

  const amount = parseAmountInput(amountInput)

  const canSubmit =
    amount !== null &&
    notes.trim().length > 0 &&
    imagePreview !== null &&
    (kind !== 'other' || expenseLabel.trim().length > 0) &&
    !saving

  const onPickImage = async (file: File | undefined) => {
    setImageError(null)
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setImageError('يُقبل ملف صورة فقط (JPG أو PNG).')
      return
    }
    if (file.size > RECEIPT_IMAGE_MAX_BYTES) {
      setImageError(voucherAttachmentTooLargeMessage())
      return
    }
    try {
      const dataUrl = await readImageFile(file)
      setImagePreview(dataUrl)
      setImageName(file.name)
    } catch {
      setImageError('تعذّر قراءة الصورة. جرّب ملفاً آخر.')
    }
  }

  const submit = () => {
    if (!canSubmit || !imagePreview || amount === null) return
    setSubmitError(null)
    setSaving(true)
    try {
      saveDisbursementVoucher({
        kind,
        expenseLabel: kind === 'other' ? expenseLabel : undefined,
        amount,
        notes,
        receiptImageDataUrl: imagePreview,
        receiptImageName: imageName || 'receipt.jpg',
      })
      onSaved()
      onClose()
    } catch {
      setSubmitError('تعذّر الحفظ. قد تكون مساحة التخزين على الجهاز ممتلئة — جرّب صورة أصغر.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <ModalPortal open={open} onClose={onClose} labelledBy="new-disbursement-title">
      <div className="app-modal-head">
        <div className="min-w-0 flex-1">
          <p id="new-disbursement-title" className="text-[15px] font-medium text-foreground sm:text-[16px]">
            سند صرف جديد
          </p>
          <p className="mt-1 text-[13px] leading-6 text-foreground-muted">
            مثل المحروقات: نوع المصروف، المبلغ، ملاحظات، وصورة الوصل (إلزامي).
          </p>
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
        <VoucherKindSelector
          legend="نوع المصروف"
          required
          name="disbursement-expense-kind"
          value={kind}
          onChange={setKind}
          options={EXPENSE_OPTIONS}
          columns={2}
        />

        {kind === 'other' ? (
          <label className="block">
            <span className="type-caption mb-1.5 block font-medium text-foreground-secondary">
              وصف المصروف <span className="text-accent-text">*</span>
            </span>
            <input
              type="text"
              value={expenseLabel}
              onChange={(e) => setExpenseLabel(e.target.value)}
              placeholder="مثال: صيانة، مواد مكتبية..."
              className="ds-input h-12"
            />
          </label>
        ) : null}

        <label className="block">
          <span className="type-caption mb-1.5 block font-medium text-foreground-secondary">
            المبلغ <span className="text-accent-text">*</span>
          </span>
          <input
            type="text"
            inputMode="decimal"
            value={amountInput}
            onChange={(e) => setAmountInput(e.target.value)}
            placeholder="0.00"
            dir="ltr"
            className="ds-input h-12 text-left"
          />
        </label>

        <label className="block">
          <span className="type-caption mb-1.5 block font-medium text-foreground-secondary">
            ملاحظات <span className="text-accent-text">*</span>
          </span>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="مثال: تعبئة وقود، رقم اللوحة، محطة التعبئة..."
            rows={3}
            className="ds-input min-h-[88px] resize-y py-3"
          />
        </label>

        <div>
          <span className="type-caption mb-1.5 block font-medium text-foreground-secondary">
            صورة الوصل <span className="text-accent-text">*</span>
          </span>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/heic,image/*"
            capture="environment"
            className="sr-only"
            onChange={(e) => {
              void onPickImage(e.target.files?.[0])
              e.target.value = ''
            }}
          />
          {imagePreview ? (
            <div className="ios-tile overflow-hidden p-0">
              <img
                src={imagePreview}
                alt="معاينة صورة الوصل"
                className="max-h-56 w-full object-contain bg-surface-muted"
              />
              <div className="flex items-center justify-between gap-2 border-t border-border px-3 py-2">
                <p className="min-w-0 truncate text-[12px] text-foreground-muted" dir="ltr">
                  {imageName}
                </p>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className={btn('light', 'h-9 shrink-0 rounded-[8px] px-3 text-[13px]')}
                >
                  استبدال
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex w-full flex-col items-center gap-2 rounded-[12px] border border-dashed border-border bg-surface-muted/60 px-4 py-8 text-center transition-colors hover:border-accent/40 hover:bg-surface-muted"
            >
              <ImagePlus size={28} strokeWidth={1.5} className="text-foreground-muted" aria-hidden />
              <span className="text-[14px] font-medium text-foreground">التقاط أو اختيار صورة الوصل</span>
              <span className="text-[12px] leading-6 text-foreground-muted">
                يجب أن يظهر الوصل كاملاً — {voucherAttachmentHintLine()}
              </span>
            </button>
          )}
          {imageError ? <p className="mt-2 text-[13px] text-error-foreground">{imageError}</p> : null}
        </div>

        {submitError ? <p className="text-[13px] text-error-foreground">{submitError}</p> : null}

        <div className="app-modal-foot flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button type="button" onClick={onClose} className={btn('secondary', 'h-11 rounded-[10px] px-5 text-[14px]')}>
            إلغاء
          </button>
          <button
            type="button"
            disabled={!canSubmit}
            onClick={submit}
            className={btn('primary', 'h-11 rounded-[10px] px-5 text-[14px] disabled:opacity-50')}
          >
            {saving ? 'جاري الحفظ…' : 'حفظ سند الصرف'}
          </button>
        </div>
      </div>
    </ModalPortal>
  )
}
