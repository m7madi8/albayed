import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { Banknote, FileImage, ImagePlus, Layers, X } from 'lucide-react'
import { loadAllClients } from '../../lib/customClients'
import { filterClients } from '../../lib/filterClients'
import {
  CHEQUE_IMAGE_MAX_BYTES,
  saveReceiptVoucher,
  type ReceiptPaymentKind,
} from '../../lib/chequeReceiptVouchers'
import {
  voucherAttachmentHintLine,
  voucherAttachmentTooLargeMessage,
} from '../../lib/voucherAttachmentLimits'
import { btn } from '../../lib/buttonStyles'
import ModalPortal from '../ui/ModalPortal'
import VoucherKindSelector, { type VoucherKindOption } from './VoucherKindSelector'

const PAYMENT_OPTIONS: VoucherKindOption<ReceiptPaymentKind>[] = [
  { id: 'cash', label: 'نقدي', hint: 'مبلغ محصّل', icon: Banknote },
  { id: 'cheque', label: 'شيك', hint: 'صورة الشيك', icon: FileImage },
  { id: 'both', label: 'كلاهما', hint: 'نقد + شيك', icon: Layers },
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

function parseCashInput(raw: string): number | null {
  const normalized = raw.replace(/,/g, '.').trim()
  if (!normalized) return null
  const n = Number.parseFloat(normalized)
  if (!Number.isFinite(n) || n <= 0) return null
  return n
}

export default function NewChequeReceiptModal({
  open,
  onClose,
  onSaved,
}: {
  open: boolean
  onClose: () => void
  onSaved: () => void
}) {
  const listId = useId()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [kind, setKind] = useState<ReceiptPaymentKind>('cheque')
  const [clientName, setClientName] = useState('')
  const [notes, setNotes] = useState('')
  const [cashInput, setCashInput] = useState('')
  const [pickerOpen, setPickerOpen] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageName, setImageName] = useState('')
  const [imageError, setImageError] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const includesCash = kind === 'cash' || kind === 'both'
  const includesCheque = kind === 'cheque' || kind === 'both'

  const clientSuggestions = useMemo(() => {
    if (!pickerOpen) return []
    return filterClients(loadAllClients(), clientName).slice(0, 8)
  }, [clientName, pickerOpen])

  useEffect(() => {
    if (!open) return
    setKind('cheque')
    setClientName('')
    setNotes('')
    setCashInput('')
    setPickerOpen(false)
    setImagePreview(null)
    setImageName('')
    setImageError(null)
    setSubmitError(null)
    setSaving(false)
  }, [open])

  const cashAmount = includesCash ? parseCashInput(cashInput) : null

  const canSubmit =
    clientName.trim().length > 0 &&
    notes.trim().length > 0 &&
    (!includesCash || cashAmount !== null) &&
    (!includesCheque || imagePreview !== null) &&
    !saving

  const onPickImage = async (file: File | undefined) => {
    setImageError(null)
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setImageError('يُقبل ملف صورة فقط (JPG أو PNG).')
      return
    }
    if (file.size > CHEQUE_IMAGE_MAX_BYTES) {
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
    if (!canSubmit) return
    setSubmitError(null)
    setSaving(true)
    try {
      saveReceiptVoucher({
        kind,
        clientName,
        notes,
        cashAmount: cashAmount ?? undefined,
        chequeImageDataUrl: imagePreview ?? undefined,
        chequeImageName: imageName || 'cheque.jpg',
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
    <ModalPortal open={open} onClose={onClose} labelledBy="new-cheque-receipt-title">
      <div className="app-modal-head">
        <div className="min-w-0 flex-1">
          <p id="new-cheque-receipt-title" className="text-[15px] font-medium text-foreground sm:text-[16px]">
            سند قبض جديد
          </p>
          <p className="mt-1 text-[13px] leading-6 text-foreground-muted">
            اختر النقدي أو الشيك أو كليهما. عند الشيك: صورة كاملة للشيك إلزامية.
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
          legend="نوع القبض"
          required
          name="receipt-payment-kind"
          value={kind}
          onChange={setKind}
          options={PAYMENT_OPTIONS}
          columns={3}
        />

        <label className="relative block">
          <span className="type-caption mb-1.5 block font-medium text-foreground-secondary">
            اسم العميل <span className="text-accent-text">*</span>
          </span>
          <input
            type="text"
            value={clientName}
            onChange={(e) => {
              setClientName(e.target.value)
              setPickerOpen(true)
            }}
            onFocus={() => setPickerOpen(true)}
            onBlur={() => window.setTimeout(() => setPickerOpen(false), 150)}
            placeholder="اختر من القائمة أو اكتب الاسم"
            autoComplete="organization"
            className="ds-input h-12"
            aria-autocomplete="list"
            aria-controls={pickerOpen && clientSuggestions.length > 0 ? listId : undefined}
          />
          {pickerOpen && clientSuggestions.length > 0 && (
            <ul
              id={listId}
              role="listbox"
              className="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-[10px] border border-border bg-surface shadow-md"
            >
              {clientSuggestions.map((c) => (
                <li key={c.id} role="option">
                  <button
                    type="button"
                    className="block w-full px-3 py-2.5 text-right text-[14px] text-foreground hover:bg-surface-muted"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      setClientName(c.name)
                      setPickerOpen(false)
                    }}
                  >
                    {c.name}
                    <span className="mt-0.5 block text-[12px] text-foreground-muted">{c.city}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </label>

        {includesCash ? (
          <label className="block">
            <span className="type-caption mb-1.5 block font-medium text-foreground-secondary">
              المبلغ النقدي <span className="text-accent-text">*</span>
            </span>
            <input
              type="text"
              inputMode="decimal"
              value={cashInput}
              onChange={(e) => setCashInput(e.target.value)}
              placeholder="0.00"
              dir="ltr"
              className="ds-input h-12 text-left"
            />
          </label>
        ) : null}

        <label className="block">
          <span className="type-caption mb-1.5 block font-medium text-foreground-secondary">
            ملاحظات <span className="text-accent-text">*</span>
          </span>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="تفاصيل التحصيل، رقم الشيك، موعد الاستحقاق..."
            rows={3}
            className="ds-input min-h-[88px] resize-y py-3"
          />
        </label>

        {includesCheque ? (
          <div>
            <span className="type-caption mb-1.5 block font-medium text-foreground-secondary">
              صورة الشيك كاملة <span className="text-accent-text">*</span>
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
                  alt="معاينة صورة الشيك"
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
                <span className="text-[14px] font-medium text-foreground">التقاط أو اختيار صورة</span>
                <span className="text-[12px] leading-6 text-foreground-muted">
                  يجب أن تظهر الشيكة كاملة في الإطار — {voucherAttachmentHintLine()}
                </span>
              </button>
            )}
            {imageError ? <p className="mt-2 text-[13px] text-error-foreground">{imageError}</p> : null}
          </div>
        ) : null}

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
            {saving ? 'جاري الحفظ…' : 'حفظ سند القبض'}
          </button>
        </div>
      </div>
    </ModalPortal>
  )
}
