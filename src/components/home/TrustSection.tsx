import { stats, trustPillars, company } from '../../data/company'

export default function TrustSection() {
  return (
    <section className="container-x py-8 lg:py-12">
      <h2 className="display text-[1.5rem] text-foreground lg:text-[2rem]">{company.showroom}</h2>
      <p className="mt-3 max-w-3xl text-[15px] leading-7 text-foreground-muted lg:text-[16px]">{company.description}</p>

      <div className="ios-list mt-8 lg:hidden">
        {stats.map((s) => (
          <div key={s.label} className="ios-list-row flex flex-col gap-1 py-4">
            <p className="display text-[2rem] text-foreground">{s.value}</p>
            <p className="text-[14px] text-foreground-muted">{s.label}</p>
          </div>
        ))}
        {trustPillars.map((p) => (
          <div key={p.label} className="ios-list-row flex flex-col gap-1 py-4">
            <p className="text-[15px] font-medium text-foreground">{p.label}</p>
            <p className="text-[14px] leading-6 text-foreground-muted">{p.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="ios-tile p-6">
            <p className="display text-[2.25rem] text-foreground">{s.value}</p>
            <p className="mt-2 text-[14px] text-foreground-muted">{s.label}</p>
          </div>
        ))}
        {trustPillars.map((p) => (
          <div key={p.label} className="ios-tile p-6 sm:col-span-1">
            <p className="text-[15px] font-medium text-foreground">{p.label}</p>
            <p className="mt-2 text-[14px] leading-6 text-foreground-muted">{p.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
