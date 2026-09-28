import { products } from '../data/products'
import ProductArt from '../components/art/ProductArt'

/** Dev-only sheet to review every illustration side by side. */
export default function ArtLab() {
  return (
    <div className="container-x py-10">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-6">
        {products.map((p) => (
          <div key={p.id} className="rounded-2xl bg-surface-muted p-2">
            <ProductArt spec={p.art} alt={p.name} />
            <div className="px-2 pb-2 text-xs text-foreground-muted">{p.name}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
