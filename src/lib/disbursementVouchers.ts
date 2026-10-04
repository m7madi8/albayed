import { VOUCHER_ATTACHMENT_MAX_BYTES } from './voucherAttachmentLimits'

export type DisbursementExpenseKind = 'fuel' | 'other'

export interface DisbursementVoucher {
  id: string
  createdAt: string
  kind: DisbursementExpenseKind
  /** When kind is `other` */
  expenseLabel?: string
  amount: number
  notes: string
  receiptImageDataUrl: string
  receiptImageName: string
}

const STORAGE_KEY = 'albayed-disbursement-vouchers-v1'

export const DISBURSEMENT_VOUCHERS_CHANGE_EVENT = 'albayed-disbursement-vouchers-changed'

export const DISBURSEMENT_EXPENSE_KIND_LABEL: Record<DisbursementExpenseKind, string> = {
  fuel: 'محروقات',
  other: 'مصروف آخر',
}

export const RECEIPT_IMAGE_MAX_BYTES = VOUCHER_ATTACHMENT_MAX_BYTES

function notifyChange() {
  window.dispatchEvent(new Event(DISBURSEMENT_VOUCHERS_CHANGE_EVENT))
}

function isKind(value: unknown): value is DisbursementExpenseKind {
  return value === 'fuel' || value === 'other'
}

function normalizeItem(item: unknown): DisbursementVoucher | null {
  if (!item || typeof item !== 'object') return null
  const o = item as Record<string, unknown>
  if (typeof o.id !== 'string' || typeof o.createdAt !== 'string') return null
  if (!isKind(o.kind)) return null
  if (typeof o.notes !== 'string') return null
  if (typeof o.receiptImageDataUrl !== 'string') return null
  if (typeof o.amount !== 'number' || !Number.isFinite(o.amount) || o.amount <= 0) return null

  const expenseLabel = typeof o.expenseLabel === 'string' ? o.expenseLabel.trim() : undefined
  if (o.kind === 'other' && !expenseLabel) return null

  return {
    id: o.id,
    createdAt: o.createdAt,
    kind: o.kind,
    expenseLabel: o.kind === 'other' ? expenseLabel : undefined,
    amount: Math.round(o.amount * 100) / 100,
    notes: o.notes,
    receiptImageDataUrl: o.receiptImageDataUrl,
    receiptImageName: typeof o.receiptImageName === 'string' ? o.receiptImageName : 'receipt.jpg',
  }
}

function readRaw(): DisbursementVoucher[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown[]
    if (!Array.isArray(parsed)) return []
    return parsed.map(normalizeItem).filter((v): v is DisbursementVoucher => v !== null)
  } catch {
    return []
  }
}

function writeAll(vouchers: DisbursementVoucher[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(vouchers))
  notifyChange()
}

export function loadDisbursementVouchers(): DisbursementVoucher[] {
  return readRaw().sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

export function saveDisbursementVoucher(input: {
  kind: DisbursementExpenseKind
  expenseLabel?: string
  amount: number
  notes: string
  receiptImageDataUrl: string
  receiptImageName: string
}): DisbursementVoucher {
  const notes = input.notes.trim()
  if (!notes) throw new Error('validation')

  if (!Number.isFinite(input.amount) || input.amount <= 0) throw new Error('validation')
  const amount = Math.round(input.amount * 100) / 100

  let expenseLabel: string | undefined
  if (input.kind === 'other') {
    expenseLabel = (input.expenseLabel ?? '').trim()
    if (!expenseLabel) throw new Error('validation')
  }

  if (!input.receiptImageDataUrl.trim()) throw new Error('validation')

  const voucher: DisbursementVoucher = {
    id: `dis-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
    kind: input.kind,
    expenseLabel,
    amount,
    notes,
    receiptImageDataUrl: input.receiptImageDataUrl,
    receiptImageName: (input.receiptImageName ?? 'receipt.jpg').trim() || 'receipt.jpg',
  }

  writeAll([voucher, ...readRaw()])
  return voucher
}

export function disbursementExpenseTitle(v: DisbursementVoucher): string {
  if (v.kind === 'fuel') return DISBURSEMENT_EXPENSE_KIND_LABEL.fuel
  return v.expenseLabel ?? DISBURSEMENT_EXPENSE_KIND_LABEL.other
}

export function formatDisbursementVoucherWhen(iso: string): string {
  try {
    return new Intl.DateTimeFormat('ar-PS', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(iso))
  } catch {
    return iso
  }
}

export { formatReceiptCashAmount as formatDisbursementAmount } from './chequeReceiptVouchers'
