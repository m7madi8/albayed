import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import type { Product } from '../../data/types'
import { catalogResultsMotion } from '../../lib/motionPresets'
import EmptyState from '../ui/EmptyState'
import ProductCard from './ProductCard'
import ProductGridSkeleton from './ProductGridSkeleton'

export default function ProductGrid({
  products,
  onClearAll,
  resultsKey,
}: {
  products: Product[]
  onClearAll?: () => void
  resultsKey?: string
}) {
  const reduce = useReducedMotion()
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (!resultsKey) return
    setBusy(true)
    const id = window.setTimeout(() => setBusy(false), 120)
    return () => window.clearTimeout(id)
  }, [resultsKey])

  if (busy && products.length > 0) {
    return <ProductGridSkeleton count={Math.min(products.length, 8)} />
  }

  if (products.length === 0) {
    const empty = (
      <EmptyState
        title="لا توجد منتجات مطابقة"
        body="جرّب تعديل الفلاتر أو البحث بكلمات أخرى."
        action={
          onClearAll ? (
            <button type="button" onClick={onClearAll} className="catalog-empty__link">
              مسح كل الفلاتر
            </button>
          ) : undefined
        }
      />
    )

    if (reduce || !resultsKey) return empty

    return (
      <motion.div key={`empty-${resultsKey}`} {...catalogResultsMotion}>
        {empty}
      </motion.div>
    )
  }

  const grid = (
    <div className="product-grid">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  )

  if (reduce || !resultsKey) return grid

  return (
    <motion.div key={resultsKey} className="catalog-results-motion" {...catalogResultsMotion}>
      {grid}
    </motion.div>
  )
}
