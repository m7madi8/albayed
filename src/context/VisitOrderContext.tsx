import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

import { isValidClientPhone, normalizeClientPhone } from '../lib/clientPhone'

import {
  baseUnitPrice,
  formatUnitPrice,
  lineTotal,
  orderLinesTotal,
  rememberClientProductPrice,
} from '../lib/customerPricing'

import type { Product } from '../data/types'

import type { OrderUnit } from '../lib/orderUnits'

import { ORDER_UNIT_LABEL } from '../lib/orderUnits'



export interface OrderLine {

  productId: string

  quantity: number

  unit: OrderUnit

  unitPrice: number

}



interface StoredVisit {

  clientName: string

  clientPhone: string

  lines: OrderLine[]

}



const STORAGE_KEY = 'albayed-visit-order-v6'



function normalizeLine(raw: Partial<OrderLine>): OrderLine | null {

  if (!raw.productId || typeof raw.quantity !== 'number') return null

  const unit = raw.unit === 'carton' ? 'carton' : 'piece'

  const unitPrice =

    typeof raw.unitPrice === 'number' && raw.unitPrice >= 0

      ? Math.round(raw.unitPrice * 100) / 100

      : baseUnitPrice(raw.productId)

  return {

    productId: raw.productId,

    quantity: Math.max(1, Math.floor(raw.quantity)),

    unit,

    unitPrice,

  }

}



function readStored(): StoredVisit {

  try {

    const raw =

      localStorage.getItem(STORAGE_KEY) ??

      localStorage.getItem('albayed-visit-order-v5') ??

      localStorage.getItem('albayed-visit-order-v3') ??

      localStorage.getItem('albayed-visit-order-v2') ??

      localStorage.getItem('albayed-visit-order-v1')

    if (!raw) return { clientName: '', clientPhone: '', lines: [] }

    const parsed = JSON.parse(raw) as {

      clientName?: string

      clientPhone?: string

      clientId?: string | null

      lines?: Partial<OrderLine>[]

    }

    const lines = (Array.isArray(parsed.lines) ? parsed.lines : [])

      .map((l) => normalizeLine(l))

      .filter((l): l is OrderLine => l !== null)

    return {

      clientName: typeof parsed.clientName === 'string' ? parsed.clientName : '',

      clientPhone: typeof parsed.clientPhone === 'string' ? parsed.clientPhone : '',

      lines,

    }

  } catch {

    return { clientName: '', clientPhone: '', lines: [] }

  }

}



interface VisitOrderContextValue {

  clientName: string

  clientPhone: string

  clientLabel: string | null

  hasClient: boolean

  lines: OrderLine[]

  lineCount: number

  unitCount: number

  orderTotal: number

  setClientName: (name: string) => void

  setClientPhone: (phone: string) => void

  setOrderClient: (name: string, phone: string) => void

  addLine: (productId: string, quantity: number, unit: OrderUnit, unitPrice: number) => void

  setLineQuantity: (productId: string, unit: OrderUnit, quantity: number) => void

  removeLine: (productId: string, unit: OrderUnit) => void

  clearOrder: () => void

  linesForProduct: (productId: string) => OrderLine[]

}



const VisitOrderContext = createContext<VisitOrderContextValue | null>(null)



function clientReady(name: string, phone: string): boolean {

  return name.trim().length > 0 && isValidClientPhone(phone)

}



export function VisitOrderProvider({ children }: { children: ReactNode }) {

  const stored = readStored()

  const [clientName, setClientNameState] = useState(stored.clientName)

  const [clientPhone, setClientPhoneState] = useState(stored.clientPhone)

  const [lines, setLines] = useState<OrderLine[]>(stored.lines)



  useEffect(() => {

    localStorage.setItem(STORAGE_KEY, JSON.stringify({ clientName, clientPhone, lines }))

  }, [clientName, clientPhone, lines])



  const setClientName = useCallback((name: string) => setClientNameState(name), [])

  const setClientPhone = useCallback((phone: string) => setClientPhoneState(phone), [])

  const setOrderClient = useCallback((name: string, phone: string) => {

    setClientNameState(name)

    setClientPhoneState(normalizeClientPhone(phone))

  }, [])



  const addLine = useCallback(

    (productId: string, quantity: number, unit: OrderUnit, unitPrice: number) => {

      const q = Math.max(1, Math.floor(quantity))

      const price = Math.max(0, Math.round(unitPrice * 100) / 100)

      rememberClientProductPrice(clientPhone, productId, price)

      setLines((prev) => {

        const i = prev.findIndex((l) => l.productId === productId && l.unit === unit)

        if (i === -1) return [...prev, { productId, quantity: q, unit, unitPrice: price }]

        const next = [...prev]

        next[i] = { ...next[i], quantity: next[i].quantity + q, unitPrice: price }

        return next

      })

    },

    [clientPhone],

  )



  const setLineQuantity = useCallback((productId: string, unit: OrderUnit, quantity: number) => {

    const q = Math.max(1, Math.floor(quantity))

    setLines((prev) => prev.map((l) => (l.productId === productId && l.unit === unit ? { ...l, quantity: q } : l)))

  }, [])



  const removeLine = useCallback((productId: string, unit: OrderUnit) => {

    setLines((prev) => prev.filter((l) => !(l.productId === productId && l.unit === unit)))

  }, [])



  const clearOrder = useCallback(() => setLines([]), [])



  const linesForProduct = useCallback(

    (productId: string) => lines.filter((l) => l.productId === productId),

    [lines],

  )



  const clientLabel = useMemo(() => {

    const name = clientName.trim()

    const phone = normalizeClientPhone(clientPhone)

    if (!clientReady(name, phone)) return null

    return `${name} · ${phone}`

  }, [clientName, clientPhone])



  const hasClient = clientLabel !== null

  const lineCount = lines.length

  const unitCount = lines.reduce((n, l) => n + l.quantity, 0)

  const orderTotal = useMemo(() => orderLinesTotal(lines), [lines])



  const value = useMemo(

    () => ({

      clientName,

      clientPhone,

      clientLabel,

      hasClient,

      lines,

      lineCount,

      unitCount,

      orderTotal,

      setClientName,

      setClientPhone,

      setOrderClient,

      addLine,

      setLineQuantity,

      removeLine,

      clearOrder,

      linesForProduct,

    }),

    [

      clientName,

      clientPhone,

      clientLabel,

      hasClient,

      lines,

      lineCount,

      unitCount,

      orderTotal,

      setClientName,

      setClientPhone,

      setOrderClient,

      addLine,

      setLineQuantity,

      removeLine,

      clearOrder,

      linesForProduct,

    ],

  )



  return <VisitOrderContext.Provider value={value}>{children}</VisitOrderContext.Provider>

}



export function useVisitOrder() {

  const ctx = useContext(VisitOrderContext)

  if (!ctx) throw new Error('useVisitOrder must be used within VisitOrderProvider')

  return ctx

}



export function buildOrderText(

  clientName: string,

  clientPhone: string,

  lines: OrderLine[],

  products: (Product | undefined)[],

) {

  const header = `طلبية شراء — ${clientName.trim()}\nالهاتف: ${normalizeClientPhone(clientPhone)}\n${'—'.repeat(24)}\n`

  const body = lines

    .map((l, i) => {

      const p = products[i]

      const title = p?.name ?? l.productId

      const subtotal = formatUnitPrice(lineTotal(l.unitPrice, l.quantity))

      return `${i + 1}. ${title}\n   ${l.quantity} ${ORDER_UNIT_LABEL[l.unit]} × ${formatUnitPrice(l.unitPrice)} = ${subtotal}`

    })

    .join('\n')

  const total = formatUnitPrice(orderLinesTotal(lines))

  return `${header}${body}\n\nإجمالي البنود: ${lines.length}\nالإجمالي: ${total}`

}


