import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { brands, originMap, productsByBrand } from '../lib/catalog'
import Reveal from '../components/ui/Reveal'

export default function BrandsPage() {
  return (
    <div>
      <section className="hairline-b bg-surface-muted/60">
        <div className="container-x py-14 md:py-20">
          <Reveal>
            <h1 className="display text-[clamp(2rem,4.4vw,3.2rem)] text-foreground">العلامات التجارية</h1>
            <p className="mt-4 max-w-lg text-[16px] leading-8 text-foreground-muted">
              نتعامل مع علامات من مصادر ومستويات جودة متعددة، لنؤمّن الخيار المناسب لكل مشروع وميزانية.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-x py-14 md:py-20">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {brands.map((b) => {
            const count = productsByBrand(b.id).length
            return (
              <Reveal key={b.id}>
                <Link
                  to={`/products?brand=${encodeURIComponent(b.name)}`}
                  className="group flex flex-col justify-between gap-8 rounded-[var(--radius-card)] border border-border bg-surface p-7 transition-colors duration-200 hover:border-ink/20"
                >
                  <div>
                    <p className="text-[21px] font-medium tracking-wide text-foreground">{b.latin}</p>
                    <p className="mt-1 text-[15px] text-foreground-muted">{b.name}</p>
                  </div>
                  <div className="flex items-center justify-between text-[13.5px] text-foreground-muted">
                    <span>المنشأ: {originMap.get(b.originId)?.name}</span>
                    <span className="inline-flex items-center gap-1 font-medium text-foreground">
                      {count} منتج <ArrowLeft size={13} strokeWidth={2} className="transition-transform group-hover:-translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </section>
    </div>
  )
}
