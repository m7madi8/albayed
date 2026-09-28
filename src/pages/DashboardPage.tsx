import { Navigate, useParams } from 'react-router-dom'
import OverviewDashboard from '../components/dashboard/OverviewDashboard'
import CustomersDashboard from '../components/dashboard/CustomersDashboard'
import OrdersDashboard from '../components/dashboard/OrdersDashboard'
import SettingsPanel from '../components/dashboard/SettingsPanel'
import SalesOrderWorkspace from '../components/dashboard/SalesOrderWorkspace'
import { useSalesToast } from '../hooks/useSalesToast'

export default function DashboardPage() {
  const { section } = useParams<'section'>()
  const { showToast } = useSalesToast()

  if (!section) return <Navigate to="/dashboard/overview" replace />

  if (section === 'overview') return <OverviewDashboard />
  if (section === 'customers') return <CustomersDashboard />
  if (section === 'order') return <SalesOrderWorkspace showToast={showToast} />
  if (section === 'orders') return <OrdersDashboard />
  if (section === 'settings') return <SettingsPanel />

  return <Navigate to="/dashboard/overview" replace />
}
