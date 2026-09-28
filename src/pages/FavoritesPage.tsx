import { Link } from 'react-router-dom'
import { useCatalogEngagement } from '../context/CatalogEngagementContext'
import { getProductById } from '../lib/catalog'
import ProductGrid from '../components/catalog/ProductGrid'
import EmptyState from '../components/ui/EmptyState'
import { btn } from '../lib/buttonStyles'

export default function FavoritesPage() {
  const { favoriteIds } = useCatalogEngagement()
  const products = favoriteIds.map((id) => getProductById(id)).filter((p): p is NonNullable<typeof p> => Boolean(p))

  return (
    <div className="catalog-page">
      <section className="catalog-shell catalog-page-body">
        <header className="catalog-page-head">
          <div>
            <p className="text-[12px] font-medium tracking-wide text-foreground-muted">كتالوج المنتجات</p>
            <h1 className="display mt-1 text-[1.35rem] text-foreground sm:text-[1.5rem]">المفضلة</h1>
            <p className="mt-3 text-[14px] text-foreground-muted">
              <span className="font-medium text-foreground">{products.length}</span> صنف محفوظ للعرض
            </p>
          </div>
          <Link to="/products" className={btn('secondary', 'catalog-head-btn h-11 rounded-[12px] px-4 text-[14px]')}>
            الكتالوج
          </Link>
        </header>

        {products.length === 0 ? (
          <EmptyState
            title="لا توجد مفضلة بعد"
            body="اضغط النجمة على أي منتج أثناء العرض أمام العميل لحفظه هنا."
            action={
              <Link to="/products" className={btn('primary', 'h-11 rounded-[12px] px-5 text-[14px]')}>
                تصفح الكتالوج
              </Link>
            }
          />
        ) : (
          <ProductGrid products={products} resultsKey="favorites" />
        )}
      </section>
    </div>
  )
}
