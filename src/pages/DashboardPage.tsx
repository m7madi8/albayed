import { Navigate, useParams } from 'react-router-dom'
import OverviewDashboard from '../components/dashboard/OverviewDashboard'
import CustomersDashboard from '../components/dashboard/CustomersDashboard'
import OrdersDashboard from '../components/dashboard/OrdersDashboard'
import ReceiptVouchersDashboard from '../components/dashboard/ReceiptVouchersDashboard'
import SettingsPanel from '../components/dashboard/SettingsPanel'
export default function DashboardPage() {
  const { section } = useParams<'section'>()

  if (!section) return <Navigate to="/dashboard/overview" replace />

  if (section === 'overview') return <OverviewDashboard />
  if (section === 'customers') return <CustomersDashboard />
  if (section === 'receipts') return <ReceiptVouchersDashboard />
  if (section === 'order') return <Navigate to="/products" replace />
  if (section === 'orders') return <OrdersDashboard />
  if (section === 'settings') return <SettingsPanel />

  return <Navigate to="/dashboard/overview" replace />
}
