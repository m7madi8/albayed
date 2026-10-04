import type { Product } from '../../../data/types'
import { useProductQuickAdd } from '../../../lib/useProductQuickAdd'
import InlineOrderControl from './InlineOrderControl'

export default function SpecimenSheetOrderCell({ product }: { product: Product }) {
  const quick = useProductQuickAdd(product)
  return (
    <>
      <InlineOrderControl product={product} quick={quick} />
      {quick.modal}
    </>
  )
}
