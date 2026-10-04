import { VOUCHER_ATTACHMENT_MAX_BYTES } from './voucherAttachmentLimits'

export type ReceiptPaymentKind = 'cash' | 'cheque' | 'both'

export interface ReceiptVoucher {
  id: string
  createdAt: string
  clientName: string
  notes: string
  kind: ReceiptPaymentKind
  cashAmount?: number
  chequeImageDataUrl?: string
  chequeImageName?: string
}

/** @deprecated use ReceiptVoucher */
export type ChequeReceiptVoucher = ReceiptVoucher

const LEGACY_STORAGE_KEY = 'albayed-cheque-receipt-vouchers-v1'
const STORAGE_KEY = 'albayed-receipt-vouchers-v2'

export const RECEIPT_VOUCHERS_CHANGE_EVENT = 'albayed-cheque-receipt-vouchers-changed'

/** @deprecated use RECEIPT_VOUCHERS_CHANGE_EVENT */
export const CHEQUE_RECEIPT_VOUCHERS_CHANGE_EVENT = RECEIPT_VOUCHERS_CHANGE_EVENT

export const RECEIPT_PAYMENT_KIND_LABEL: Record<ReceiptPaymentKind, string> = {
  cash: 'نقدي',
  cheque: 'شيك',
  both: 'نقدي + شيك',
}

export const CHEQUE_IMAGE_MAX_BYTES = VOUCHER_ATTACHMENT_MAX_BYTES

function notifyChange() {
  window.dispatchEvent(new Event(RECEIPT_VOUCHERS_CHANGE_EVENT))
}

function isKind(value: unknown): value is ReceiptPaymentKind {
  return value === 'cash' || value === 'cheque' || value === 'both'
}

function normalizeLegacy(item: Record<string, unknown>): ReceiptVoucher | null {
  if (typeof item.id !== 'string' || typeof item.createdAt !== 'string') return null
  if (typeof item.clientName !== 'string' || typeof item.notes !== 'string') return null
  if (typeof item.chequeImageDataUrl !== 'string') return null
  return {
    id: item.id,
    createdAt: item.createdAt,
    clientName: item.clientName,
    notes: item.notes,
    kind: 'cheque',
    chequeImageDataUrl: item.chequeImageDataUrl,
    chequeImageName: typeof item.chequeImageName === 'string' ? item.chequeImageName : 'cheque.jpg',
  }
}

function normalizeItem(item: unknown): ReceiptVoucher | null {
  if (!item || typeof item !== 'object') return null
  const o = item as Record<string, unknown>
  if (typeof o.id !== 'string' || typeof o.createdAt !== 'string') return null
  if (typeof o.clientName !== 'string' || typeof o.notes !== 'string') return null

  if (!isKind(o.kind)) return normalizeLegacy(o)

  const voucher: ReceiptVoucher = {
    id: o.id,
    createdAt: o.createdAt,
    clientName: o.clientName,
    notes: o.notes,
    kind: o.kind,
  }

  if (typeof o.cashAmount === 'number' && Number.isFinite(o.cashAmount) && o.cashAmount > 0) {
    voucher.cashAmount = Math.round(o.cashAmount * 100) / 100
  }
  if (typeof o.chequeImageDataUrl === 'string') {
    voucher.chequeImageDataUrl = o.chequeImageDataUrl
    voucher.chequeImageName = typeof o.chequeImageName === 'string' ? o.chequeImageName : 'cheque.jpg'
  }

  if (voucher.kind === 'cash' && !voucher.cashAmount) return null
  if (voucher.kind === 'cheque' && !voucher.chequeImageDataUrl) return null
  if (voucher.kind === 'both' && (!voucher.cashAmount || !voucher.chequeImageDataUrl)) return null

  return voucher
}

function readKey(key: string): ReceiptVoucher[] {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown[]
    if (!Array.isArray(parsed)) return []
    return parsed.map(normalizeItem).filter((v): v is ReceiptVoucher => v !== null)
  } catch {
    return []
  }
}

function readRaw(): ReceiptVoucher[] {
  const current = readKey(STORAGE_KEY)
  if (current.length > 0) return current

  const legacy = readKey(LEGACY_STORAGE_KEY)
  if (legacy.length === 0) return []

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(legacy))
  } catch {
    return legacy
  }
  return legacy
}

function writeAll(vouchers: ReceiptVoucher[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(vouchers))
  notifyChange()
}

export function loadReceiptVouchers(): ReceiptVoucher[] {
  return readRaw().sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

/** @deprecated use loadReceiptVouchers */
export function loadChequeReceiptVouchers(): ReceiptVoucher[] {
  return loadReceiptVouchers()
}

export function saveReceiptVoucher(input: {
  kind: ReceiptPaymentKind
  clientName: string
  notes: string
  cashAmount?: number
  chequeImageDataUrl?: string
  chequeImageName?: string
}): ReceiptVoucher {
  const clientName = input.clientName.trim()
  const notes = input.notes.trim()
  if (!clientName || !notes) throw new Error('validation')

  const needsCash = input.kind === 'cash' || input.kind === 'both'
  const needsCheque = input.kind === 'cheque' || input.kind === 'both'

  let cashAmount: number | undefined
  if (needsCash) {
    const amount = input.cashAmount ?? 0
    if (!Number.isFinite(amount) || amount <= 0) throw new Error('validation')
    cashAmount = Math.round(amount * 100) / 100
  }

  let chequeImageDataUrl: string | undefined
  let chequeImageName: string | undefined
  if (needsCheque) {
    if (!input.chequeImageDataUrl?.trim()) throw new Error('validation')
    chequeImageDataUrl = input.chequeImageDataUrl
    chequeImageName = (input.chequeImageName ?? 'cheque.jpg').trim() || 'cheque.jpg'
  }

  const voucher: ReceiptVoucher = {
    id: `rcv-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
    clientName,
    notes,
    kind: input.kind,
    cashAmount,
    chequeImageDataUrl,
    chequeImageName,
  }

  writeAll([voucher, ...readRaw()])
  return voucher
}

/** @deprecated use saveReceiptVoucher */
export function saveChequeReceiptVoucher(input: {
  clientName: string
  notes: string
  chequeImageDataUrl: string
  chequeImageName: string
}): ReceiptVoucher {
  return saveReceiptVoucher({ kind: 'cheque', ...input })
}

export function formatReceiptVoucherWhen(iso: string): string {
  try {
    return new Intl.DateTimeFormat('ar-PS', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(iso))
  } catch {
    return iso
  }
}

/** @deprecated use formatReceiptVoucherWhen */
export function formatChequeReceiptWhen(iso: string): string {
  return formatReceiptVoucherWhen(iso)
}

export function formatReceiptCashAmount(amount: number): string {
  try {
    return new Intl.NumberFormat('ar-PS', {
      style: 'currency',
      currency: 'ILS',
      maximumFractionDigits: 2,
    }).format(amount)
  } catch {
    return `${amount} ₪`
  }
}
