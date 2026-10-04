import { Link } from 'react-router-dom'
import { useCatalogEngagement } from '../context/CatalogEngagementContext'
import { getProductById } from '../lib/catalog'
import ProductGrid from '../components/catalog/ProductGrid'
import EmptyState from '../components/ui/EmptyState'

export default function FavoritesPage() {
  const { favoriteIds } = useCatalogEngagement()
  const products = favoriteIds.map((id) => getProductById(id)).filter((p): p is NonNullable<typeof p> => Boolean(p))

  return (
    <div className="catalog-pro catalog-page">
      <div className="cp-shell">
        <header className="cp-intro">
          <div>
            <p className="cp-intro__kicker">كتالوج المندوب</p>
            <h1 className="cp-intro__title">المفضلة</h1>
            <p className="cp-intro__meta">
              <strong>{products.length.toLocaleString('en-US')}</strong> صنف محفوظ للعرض
            </p>
          </div>
          <div className="cp-intro__actions">
            <Link to="/products" className="cp-card__action cp-card__action--ghost" style={{ minHeight: 48 }}>
              العودة للكتالوج
            </Link>
          </div>
        </header>

        {products.length === 0 ? (
          <EmptyState
            variant="catalog"
            title="لا توجد مفضلة بعد"
            body="اضغط النجمة على أي منتج أثناء العرض أمام العميل لحفظه هنا."
            action={
              <Link to="/products" className="cp-card__action">
                تصفح الكتالوج
              </Link>
            }
          />
        ) : (
          <ProductGrid products={products} resultsKey="favorites" />
        )}
      </div>
    </div>
  )
}
