import { btn } from '../../lib/buttonStyles'

import { ORDER_UNIT_LABEL } from '../../lib/orderUnits'

import { useAddToOrderFlow } from './useAddToOrderFlow'



export default function AddToOrderButton({

  productId,

  productName,

  fullWidth = true,

  variant = 'default',

}: {

  productId: string

  productName: string

  fullWidth?: boolean

  variant?: 'default' | 'card' | 'exhibit'

}) {

  const { tryOpen, modal, hasClient, inOrder } = useAddToOrderFlow(productId, productName)



  return (

    <>

      <div className={variant === 'exhibit' ? 'product-exhibit-add-wrap' : 'flex flex-col gap-1.5'}>

        <button

          type="button"

          disabled={!hasClient}

          onClick={tryOpen}

          className={

            variant === 'exhibit'

              ? 'product-exhibit-add ui-press'

              : variant === 'card'

                ? btn(

                    'primary',

                    `${fullWidth ? 'w-full' : ''} h-11 rounded-[10px] px-3 text-[14px] font-medium disabled:border-[var(--btn-border-soft)] disabled:bg-surface disabled:text-foreground-muted`,

                  )

                : btn(

                    'primary',

                    `${fullWidth ? 'w-full' : ''} h-10 rounded-[12px] px-4 text-[14px] sm:h-11 sm:text-[15px]`,

                  )

          }

        >

          إضافة

        </button>

        {variant !== 'exhibit' && !hasClient && (

          <p className="text-[11px] leading-5 text-foreground-muted">حدّد الشركة أولًا.</p>

        )}

        {variant !== 'exhibit' && inOrder.length > 0 && hasClient && (

          <p className="text-[11px] leading-5 text-foreground-muted">

            {inOrder.map((l) => `${l.quantity} ${ORDER_UNIT_LABEL[l.unit]}`).join(' · ')}

          </p>

        )}

      </div>

      {modal}

    </>

  )

}


