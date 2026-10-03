import { Link } from 'react-router-dom'
import { company, stats, trustPillars } from '../data/company'
import { categories } from '../data/categories'
import Reveal from '../components/ui/Reveal'
import { ButtonLink } from '../components/ui/Button'

export default function AboutPage() {
  return (
    <div>
      <section className="hairline-b bg-surface-muted/60">
        <div className="container-x py-16 md:py-24">
          <Reveal className="max-w-2xl">
            <p className="text-[13.5px] font-medium text-accent-text">عن الشركة</p>
            <h1 className="display mt-4 text-[clamp(2.1rem,4.6vw,3.4rem)] text-foreground">{company.showroom}</h1>
            <p className="mt-6 text-[17px] leading-8 text-foreground-secondary/80">{company.description}</p>
          </Reveal>
        </div>
      </section>

      <section className="container-x py-14 md:py-20">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {stats.map((s) => (
            <Reveal key={s.label}>
              <p className="display text-[clamp(2.4rem,4.6vw,3.2rem)] text-foreground">{s.value}</p>
              <p className="mt-2 text-[13.5px] text-foreground-muted">{s.label}</p>
            </Reveal>
          ))}
          {trustPillars.map((p) => (
            <Reveal key={p.label}>
              <p className="text-[15.5px] font-medium text-foreground">{p.label}</p>
              <p className="mt-2 text-[13.5px] leading-6 text-foreground-muted">{p.description}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="hairline-t bg-surface-muted/50 py-14 md:py-20">
        <div className="container-x">
          <Reveal className="max-w-xl">
            <h2 className="display text-[clamp(1.8rem,3.6vw,2.6rem)] text-foreground">تصنيفاتنا</h2>
            <p className="mt-4 text-[16px] leading-7 text-foreground-muted">
              نغطي احتياجات مشاريع المياه والصرف الصحي والتدفئة، من الأنبوب إلى القطعة الأخيرة في التمديد.
            </p>
          </Reveal>
          <div className="mt-9 flex flex-wrap gap-2.5">
            {categories.map((c) => (
              <Link
                key={c.id}
                to={`/products?category=${c.slug}`}
                className="filter-chip rounded-full px-5 py-2.5 text-[14.5px] font-medium"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-16 text-center md:py-24">
        <Reveal className="mx-auto max-w-md">
          <h2 className="display text-[clamp(1.8rem,3.6vw,2.6rem)] text-foreground">هل لديك مشروع قيد التخطيط؟</h2>
          <p className="mt-4 text-[15.5px] leading-7 text-foreground-muted">تواصل مع فريقنا وسنساعدك في اختيار وتوريد ما تحتاجه.</p>
          <ButtonLink to="/contact" variant="primary" className="mt-8">تواصل معنا</ButtonLink>
        </Reveal>
      </section>
    </div>
  )
}
