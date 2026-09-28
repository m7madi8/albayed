import { Link } from 'react-router-dom'
import { brands, originMap } from '../../lib/catalog'
import SectionHead from '../ui/SectionHead'
import Reveal from '../ui/Reveal'

export default function BrandShowcase() {
  return (
    <section className="hairline-t hairline-b bg-surface-muted/50 py-16 md:py-24">
      <div className="container-x">
        <SectionHead title="العلامات التجارية" intro="نوفّر منتجات من علامات متعددة المصادر، لتناسب مستويات الجودة والميزانية المختلفة." />
        <div className="mt-10 grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-4">
          {brands.map((b, i) => (
            <Reveal key={b.id} delay={i * 25}>
              <Link
                to={`/products?brand=${encodeURIComponent(b.name)}`}
                className="group flex flex-col justify-between gap-6 rounded-2xl border border-border bg-surface p-6 transition-colors duration-200 hover:border-ink/20"
              >
                <span className="text-[19px] font-medium tracking-wide text-foreground">{b.latin}</span>
                <span className="flex items-center justify-between text-[13.5px] text-foreground-muted">
                  {b.name}
                  <span>{originMap.get(b.originId)?.name}</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
