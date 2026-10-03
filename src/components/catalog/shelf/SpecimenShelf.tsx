import { useEffect, useState, type CSSProperties } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import type { Product } from '../../../data/types'
import { groupCatalogShelf } from '../../../lib/groupCatalogShelf'
import { materialCssVar, materialKeyForProduct } from '../../../lib/shelfMaterials'
import { formatCatalogNum } from '../../../lib/catalogCounts'
import { catalogResultsMotion } from '../../../lib/motionPresets'
import EmptyState from '../../ui/EmptyState'
import SpecimenTag from './SpecimenTag'
import SpecimenSheet from './SpecimenSheet'
import ProductGridSkeleton from '../ProductGridSkeleton'

export default function SpecimenShelf({
  products,
  view,
  onClearAll,
  resultsKey,
}: {
  products: Product[]
  view: 'gallery' | 'sheet'
  onClearAll?: () => void
  resultsKey?: string
}) {
  const reduce = useReducedMotion()
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (!resultsKey) return
    setBusy(true)
    const id = window.setTimeout(() => setBusy(false), 60)
    return () => window.clearTimeout(id)
  }, [resultsKey])

  if (busy && products.length > 0) {
    return <ProductGridSkeleton count={Math.min(products.length, 12)} variant="shelf" />
  }

  if (products.length === 0) {
    return (
      <EmptyState
        variant="shelf"
        title="لا توجد منتجات مطابقة"
        body="عدّل الفلاتر أو ابحث باسم المنتج أو رقم الصنف."
        action={
          onClearAll ? (
            <button type="button" className="sh-tools__filter-link" onClick={onClearAll}>
              مسح كل الفلاتر
            </button>
          ) : undefined
        }
      />
    )
  }

  if (view === 'sheet') {
    const sheet = <SpecimenSheet products={products} />
    if (reduce || !resultsKey) return sheet
    return (
      <motion.div key={resultsKey} {...catalogResultsMotion}>
        {sheet}
      </motion.div>
    )
  }

  const sections = groupCatalogShelf(products)
  const grid = (
    <div>
      {sections.map((section) => {
        const mat = section.products[0] ? materialKeyForProduct(section.products[0]) : 'default'
        return (
          <section key={section.type} className="sh-section">
            <div
              className="sh-section__head"
              style={{ '--sh-section-material': materialCssVar(mat) } as CSSProperties}
            >
              <span className="sh-section__tick" aria-hidden />
              <h2 className="sh-section__title">{section.type}</h2>
              <span className="sh-section__count">{formatCatalogNum(section.products.length)}</span>
            </div>
            <div className="sh-grid">
              {section.products.map((p) => (
                <SpecimenTag key={p.id} product={p} />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )

  if (reduce || !resultsKey) return grid
  return (
    <motion.div key={resultsKey} {...catalogResultsMotion}>
      {grid}
    </motion.div>
  )
}
