import { useEffect, useState } from 'react'

import { X } from 'lucide-react'

import { useMemo } from 'react'

import type { OrderUnit } from '../../lib/orderUnits'

import { ORDER_UNIT_LABEL, orderUnitsForCategory } from '../../lib/orderUnits'

import { getProductById } from '../../lib/catalog'

import { getClientProductPrice } from '../../lib/customerPricing'

import { btn } from '../../lib/buttonStyles'

import ModalPortal from '../ui/ModalPortal'

import QuantityInput from './QuantityInput'



function parsePriceInput(raw: string): number | null {

  const n = Number.parseFloat(raw.replace(/,/g, '').trim())

  if (!Number.isFinite(n) || n < 0) return null

  return Math.round(n * 100) / 100

}



export default function AddToOrderModal({

  open,

  productId,

  productName,

  clientPhone,

  onClose,

  onConfirm,

}: {

  open: boolean

  productId: string

  productName: string

  clientPhone: string

  onClose: () => void

  onConfirm: (quantity: number, unit: OrderUnit, unitPrice: number) => void

}) {

  const [qty, setQty] = useState(1)

  const [unit, setUnit] = useState<OrderUnit>('piece')

  const [priceInput, setPriceInput] = useState('')

  const unitOptions = useMemo(() => {
    const product = getProductById(productId)
    return orderUnitsForCategory(product?.categoryId)
  }, [productId])

  const pieceOnly = unitOptions.length === 1 && unitOptions[0] === 'piece'



  useEffect(() => {

    if (open) {

      setQty(1)

      setUnit(unitOptions[0] ?? 'piece')

      const p = getClientProductPrice(productId, clientPhone)

      setPriceInput(p.toFixed(2))

    }

  }, [open, productId, clientPhone, unitOptions])



  const confirm = () => {

    const unitPrice = parsePriceInput(priceInput)

    if (unitPrice === null) return

    onConfirm(qty, unit, unitPrice)

    onClose()

  }



  const priceValid = parsePriceInput(priceInput) !== null



  return (

    <ModalPortal open={open} onClose={onClose} labelledBy="add-order-title">

      <div className="app-modal-head">

        <div className="min-w-0 flex-1">

          <p id="add-order-title" className="text-[15px] font-medium text-foreground sm:text-[16px]">إضافة للطلبية</p>

          <p className="mt-1 line-clamp-2 text-[13px] text-foreground-muted">{productName}</p>

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



      <div className="app-modal-body space-y-5">

        <div>

          <p className="mb-2.5 text-[13px] font-medium text-foreground-muted">سعر الوحدة للعميل (₪)</p>

          <input

            type="text"

            inputMode="decimal"

            dir="ltr"

            value={priceInput}

            onChange={(e) => setPriceInput(e.target.value)}

            className="h-12 w-full rounded-[10px] border border-border bg-surface px-4 text-[16px] font-medium text-foreground"

            aria-label="سعر الوحدة للعميل"

          />

          <p className="mt-2 text-[12px] text-foreground-muted">يُحفظ لهذا العميل عند التأكيد ويُستخدم في الطلبية والنسخ للمكتب.</p>

        </div>



        {pieceOnly ? (
          <p className="text-[13px] text-foreground-muted">
            وحدة البيع: <span className="font-medium text-foreground">حبة</span>
          </p>
        ) : (
          <div>
            <p className="mb-2.5 text-[13px] font-medium text-foreground-muted">وحدة القياس</p>
            <div className="grid grid-cols-2 gap-2.5">
              {unitOptions.map((u) => (
                <button
                  key={u}
                  type="button"
                  onClick={() => setUnit(u)}
                  className={
                    unit === u
                      ? 'filter-chip filter-chip--selected min-h-[48px] rounded-[14px] text-[15px] font-medium'
                      : 'filter-chip min-h-[48px] rounded-[14px] text-[15px] font-medium'
                  }
                >
                  {ORDER_UNIT_LABEL[u]}
                </button>
              ))}
            </div>
          </div>
        )}



        <div>

          <p className="mb-2.5 text-[13px] font-medium text-foreground-muted">الكمية</p>

          <QuantityInput

            value={qty}

            onChange={setQty}

            className="h-14 text-[1.5rem]"

            aria-label="كمية الطلب"

          />

          <p className="mt-3 text-center text-[14px] text-foreground-muted">

            {qty} {ORDER_UNIT_LABEL[unit]}

          </p>

        </div>

      </div>



      <div className="app-modal-foot">

        <button

          type="button"

          disabled={!priceValid}

          onClick={confirm}

          className={btn('primary', 'h-[50px] w-full rounded-[14px] text-[16px]')}

        >

          إضافة للطلبية

        </button>

      </div>

    </ModalPortal>

  )

}


