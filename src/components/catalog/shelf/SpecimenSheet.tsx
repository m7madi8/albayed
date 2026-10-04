import { Link } from 'react-router-dom'
import type { Product } from '../../../data/types'
import { availabilityLabel, brandOf, headlineSpec } from '../../../lib/catalog'
import ProductStage from '../ProductStage'
import SpecimenSheetOrderCell from './SpecimenSheetOrderCell'
import { groupCatalogShelf } from '../../../lib/groupCatalogShelf'
import { formatCatalogNum } from '../../../lib/catalogCounts'

export default function SpecimenSheet({ products }: { products: Product[] }) {
  const sections = groupCatalogShelf(products)

  return (
    <div className="sh-sheet-wrap">
      {sections.map((section) => (
        <div key={section.type} className="sh-section">
          <div className="sh-section__head">
            <h3 className="sh-section__title">{section.type}</h3>
            <span className="sh-section__count">{formatCatalogNum(section.products.length)}</span>
          </div>
          <table className="sh-sheet">
            <thead>
              <tr>
                <th scope="col" />
                <th scope="col">SKU</th>
                <th scope="col">الصنف</th>
                <th scope="col">العلامة</th>
                <th scope="col">المقاس</th>
                <th scope="col">الحالة</th>
                <th scope="col">إجراء</th>
              </tr>
            </thead>
            <tbody>
              {section.products.map((p) => {
                const brand = brandOf(p)
                const spec = headlineSpec(p)
                const showAvail = p.availability !== 'in_stock'
                return (
                  <tr key={p.id}>
                    <td>
                      <div className="sh-sheet__thumb">
                        <ProductStage product={p} density="card" />
                      </div>
                    </td>
                    <td className="sh-sheet__sku">{p.id}</td>
                    <td>
                      <Link to={`/products/${p.slug}`} className="font-semibold text-foreground hover:text-accent-ink">
                        {p.name}
                      </Link>
                    </td>
                    <td>{brand.name}</td>
                    <td dir="ltr" className="sh-sheet__sku">{spec}</td>
                    <td>{showAvail ? availabilityLabel[p.availability] : '—'}</td>
                    <td>
                      <SpecimenSheetOrderCell product={p} />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  )
}
