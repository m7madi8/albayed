import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  catalogBasePool,
  catalogFacetDefs,
  categoryCatalogPath,
  resolveCategoryScope,
} from '../lib/catalogFilters'
import CatalogHeader, { CatalogCategoryTabs, catalogTitleForCategoryId } from '../components/catalog/CatalogHeader'
import { useCatalogQuery } from '../lib/useCatalogQuery'
import ProductGrid from '../components/catalog/ProductGrid'
import ListToolbar from '../components/catalog/ListToolbar'
import CountryFilter from '../components/catalog/CountryFilter'
import CatalogClientBar from '../components/order/CatalogClientBar'
import { useVisitOrder } from '../context/VisitOrderContext'
import { useCatalogSearch } from '../context/SearchOpenContext'
import { CATALOG_COUNTRY_FILTER_KEY, LEGACY_CATALOG_FILTER_KEYS } from '../lib/catalogCountry'

export default function ProductsPage() {
  const [sp, setSp] = useSearchParams()
  const { lineCount } = useVisitOrder()
  const { openSearch } = useCatalogSearch()

  const scope = resolveCategoryScope(sp)
  const pool = useMemo(() => catalogBasePool(sp), [sp.toString()])
  const defs = useMemo(() => catalogFacetDefs(), [])

  const { facets, results, state, toggle, clearAll, setSort, sort, q, clearQuery, active, total } =
    useCatalogQuery(pool, defs)

  const countryFacet = facets[0]
  const countrySelected = state[CATALOG_COUNTRY_FILTER_KEY] ?? []

  const resultsKey = `${scope.slug ?? 'all'}-${sort}-${q}-${countrySelected.join(',')}`
  const { title, intro } = catalogTitleForCategoryId(scope.categoryId)

  const buildCategoryHref = useCallback(
    (slug: string | null) => {
      if (!slug) {
        const next = new URLSearchParams(sp)
        next.delete('category')
        next.delete('section')
        const s = next.toString()
        return s ? `/products?${s}` : '/products'
      }
      return categoryCatalogPath(slug, sp)
    },
    [sp],
  )

  const onToggleCountry = useCallback(
    (value: string) => toggle(CATALOG_COUNTRY_FILTER_KEY, value),
    [toggle],
  )

  const clearCountryFilter = useCallback(() => {
    setSp(
      (prev) => {
        const next = new URLSearchParams(prev)
        next.delete(CATALOG_COUNTRY_FILTER_KEY)
        for (const k of LEGACY_CATALOG_FILTER_KEYS) next.delete(k)
        return next
      },
      { replace: true, preventScrollReset: true },
    )
  }, [setSp])

  const onRemoveChip = useCallback(
    (key: string, value: string) => {
      toggle(key, value)
    },
    [toggle],
  )

  const clearFacetsAndSearch = useCallback(() => {
    clearAll()
    clearCountryFilter()
  }, [clearAll, clearCountryFilter])

  return (
    <div className={`catalog-page${lineCount > 0 ? ' catalog-page--order-bar' : ''}`}>
      <section className="catalog-shell catalog-page-body">
        <CatalogHeader
          title={title}
          intro={intro}
          count={results.length}
          query={q || undefined}
          onClearQuery={clearQuery}
          onOpenSearch={openSearch}
        />

        <CatalogCategoryTabs currentSlug={scope.slug} buildHref={buildCategoryHref} />

        <CountryFilter
          facet={countryFacet}
          selected={countrySelected}
          onToggle={onToggleCountry}
          onClearAll={clearCountryFilter}
        />

        <div className="catalog-client-strip mt-5">
          <CatalogClientBar />
        </div>

        <div className="catalog-layout mt-5 lg:mt-6">
          <div className="catalog-main min-w-0">
            <ListToolbar
              total={total}
              active={active}
              onRemove={onRemoveChip}
              sort={sort}
              onSort={setSort}
            />


            <ProductGrid products={results} onClearAll={clearFacetsAndSearch} resultsKey={resultsKey} />
          </div>
        </div>
      </section>
    </div>
  )
}
