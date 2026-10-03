import { trustPillars, company } from '../../data/company'

export default function TrustSection() {
  return (
    <section className="aisle-about" aria-labelledby="home-about-heading">
      <div className="container-x aisle-about__grid">
        <div>
          <h2 id="home-about-heading" className="aisle-h2">
            {company.showroom}
          </h2>
          <p className="aisle-lead aisle-about__lead">{company.description}</p>
        </div>

        <dl className="aisle-pillars">
          {trustPillars.map((p, i) => (
            <div key={p.label} className="aisle-pillar aisle-reveal">
              <span className="aisle-num" aria-hidden>
                {String(i + 1).padStart(2, '0')}
              </span>
              <dt>{p.label}</dt>
              <dd className="aisle-small">{p.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
