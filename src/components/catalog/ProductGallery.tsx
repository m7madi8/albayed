import { useState } from 'react'
import type { ArtSpec } from '../../data/types'
import ProductArt, { type ArtView } from '../art/ProductArt'

const VIEWS: { key: ArtView; label: string }[] = [
  { key: 'main', label: 'عام' },
  { key: 'detail', label: 'تفصيلي' },
  { key: 'blueprint', label: 'مخطط' },
]

export default function ProductGallery({ art, name }: { art: ArtSpec; name: string }) {
  const [view, setView] = useState<ArtView>('main')

  return (
    <div>
      <div className="catalog-stage catalog-stage--ratio flex items-center justify-center rounded-[var(--radius-card)] p-10 sm:p-14">
        <ProductArt spec={art} view={view} alt={name} className="h-full w-full" />
      </div>
      <div className="mt-4 flex justify-center gap-2">
        {VIEWS.map((v) => (
          <button
            key={v.key}
            type="button"
            onClick={() => setView(v.key)}
            className={
              view === v.key
                ? 'filter-chip filter-chip--selected rounded-full px-4 py-2 text-[13.5px] font-medium'
                : 'filter-chip rounded-full px-4 py-2 text-[13.5px] font-medium'
            }
          >
            {v.label}
          </button>
        ))}
      </div>
    </div>
  )
}
