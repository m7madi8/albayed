import VisitOrderReview from '../order/VisitOrderReview'

export default function SalesOrderWorkspace({ showToast }: { showToast?: (msg: string) => void }) {
  return (
    <div className="order-workspace">
      <VisitOrderReview variant="dashboard" showToast={showToast} />
    </div>
  )
}
