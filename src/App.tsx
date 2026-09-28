import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import SalesOsLayout from './components/sales-os/SalesOsLayout'
import Home from './pages/Home'
import ProductsPage from './pages/ProductsPage'
import FavoritesPage from './pages/FavoritesPage'
import CategoryPage from './pages/CategoryPage'
import VisitOrderPage from './pages/VisitOrderPage'
import DashboardPage from './pages/DashboardPage'
import CustomerProfilePage from './pages/CustomerProfilePage'
import NotFound from './pages/NotFound'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import BrandsPage from './pages/BrandsPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/favorites" element={<FavoritesPage />} />
        <Route path="category/:slug" element={<CategoryPage />} />
        <Route path="visit-order" element={<VisitOrderPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="brands" element={<BrandsPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route element={<SalesOsLayout />}>
        <Route path="dashboard" element={<Navigate to="/dashboard/overview" replace />} />
        <Route path="dashboard/customers/:clientId" element={<CustomerProfilePage />} />
        <Route path="dashboard/:section" element={<DashboardPage />} />
      </Route>
    </Routes>
  )
}
