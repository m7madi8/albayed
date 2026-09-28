import VisitOrderReview from '../components/order/VisitOrderReview'

export default function VisitOrderPage() {
  return (
    <div className="catalog-page catalog-page--order">
      <section className="catalog-shell catalog-page-body presentation-order-page">
        <VisitOrderReview variant="catalog" />
      </section>
    </div>
  )
}
