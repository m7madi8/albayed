import type { OrderLine } from '../context/VisitOrderContext'
import type { Product } from '../data/types'
import { normalizeClientPhone } from './clientPhone'
import { orderLinesTotal } from './customerPricing'
import type { OrderUnit } from './orderUnits'

export type SubmittedOrderStatus = 'pending' | 'accepted' | 'rejected'

export interface SubmittedOrderLine {
  productId: string
  productName: string
  quantity: number
  unit: OrderUnit
  unitPrice: number
}

export interface SubmittedOrder {
  id: string
  createdAt: string
  clientName: string
  clientPhone: string
  lines: SubmittedOrderLine[]
  orderTotal: number
  status: SubmittedOrderStatus
  reviewedAt?: string
}

const STORAGE_KEY = 'albayed-submitted-orders-v1'

export const SUBMITTED_ORDERS_CHANGE_EVENT = 'albayed-submitted-orders-changed'

function notifyChange() {
  window.dispatchEvent(new Event(SUBMITTED_ORDERS_CHANGE_EVENT))
}

function readRaw(): SubmittedOrder[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as SubmittedOrder[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeAll(orders: SubmittedOrder[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders))
  notifyChange()
}

export function loadSubmittedOrders(): SubmittedOrder[] {
  return readRaw()
}

export function countPendingSubmittedOrders(): number {
  return readRaw().filter((o) => o.status === 'pending').length
}

export function submitSubmittedOrder(
  clientName: string,
  clientPhone: string,
  lines: OrderLine[],
  products: (Product | undefined)[],
): SubmittedOrder {
  const order: SubmittedOrder = {
    id: `ord-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
    clientName: clientName.trim(),
    clientPhone: normalizeClientPhone(clientPhone),
    lines: lines.map((l, i) => ({
      productId: l.productId,
      productName: products[i]?.name ?? l.productId,
      quantity: l.quantity,
      unit: l.unit,
      unitPrice: l.unitPrice,
    })),
    orderTotal: orderLinesTotal(lines),
    status: 'pending',
  }
  writeAll([order, ...readRaw()])
  return order
}

export function setSubmittedOrderStatus(
  id: string,
  status: 'accepted' | 'rejected',
): SubmittedOrder | null {
  const orders = readRaw()
  const i = orders.findIndex((o) => o.id === id)
  if (i === -1) return null
  const next = { ...orders[i], status, reviewedAt: new Date().toISOString() }
  orders[i] = next
  writeAll(orders)
  return next
}

export const SUBMITTED_ORDER_STATUS_LABEL: Record<SubmittedOrderStatus, string> = {
  pending: 'قيد المراجعة',
  accepted: 'مقبولة',
  rejected: 'مرفوضة',
}

export function formatSubmittedOrderWhen(iso: string): string {
  try {
    return new Intl.DateTimeFormat('ar-EG', {
      numberingSystem: 'latn',
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(iso))
  } catch {
    return iso
  }
}
