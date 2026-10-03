import { Link, useLocation } from 'react-router-dom'

const STEPS = [
  { id: 'catalog', label: 'اختيار الأصناف', path: '/products' },
  { id: 'review', label: 'مراجعة العرض', path: '/visit-order' },
] as const

export default function VisitOrderStepper() {
  const { pathname } = useLocation()
  const onReview = pathname.startsWith('/visit-order')

  return (
    <nav className="visit-order-stepper" aria-label="مراحل طلب الزيارة">
      <ol className="visit-order-stepper__list">
        {STEPS.map((step, i) => {
          const active = step.id === 'review' ? onReview : !onReview && step.id === 'catalog'
          const done = step.id === 'catalog' && onReview
          return (
            <li key={step.id} className="visit-order-stepper__item">
              <Link
                to={step.path}
                className={`visit-order-stepper__link${active ? ' visit-order-stepper__link--active' : ''}${done ? ' visit-order-stepper__link--done' : ''}`}
                aria-current={active ? 'step' : undefined}
              >
                <span className="visit-order-stepper__index" aria-hidden>
                  {i + 1}
                </span>
                {step.label}
              </Link>
              {i < STEPS.length - 1 ? <span className="visit-order-stepper__sep" aria-hidden /> : null}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
