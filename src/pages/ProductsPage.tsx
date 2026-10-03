import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  catalogBasePool,
  categoryCatalogPath,
  resolveCategoryScope,
} from '../lib/catalogFilters'
import { catalogTitleForCategoryId } from '../components/catalog/CatalogHeader'
import CatalogIntro from '../components/catalog/CatalogIntro'
import CatalogCategoryRail from '../components/catalog/CatalogCategoryRail'
import CountryFilter from '../components/catalog/CountryFilter'
import { useCatalogQuery } from '../lib/useCatalogQuery'
import ProductGrid from '../components/catalog/ProductGrid'
import CatalogResultsBar from '../components/catalog/CatalogResultsBar'
import CatalogClientBar from '../components/order/CatalogClientBar'
import { useVisitOrder } from '../context/VisitOrderContext'
import { readRepModeActive } from '../lib/catalogRepMode'
import {
  catalogCountryFilterDef,
  CATALOG_COUNTRY_FILTER_KEY,
  LEGACY_CATALOG_FILTER_KEYS,
} from '../lib/catalogCountry'
import type { FilterDef } from '../data/types'

/** Country/origin chips only — no sidebar facet rail. */
const CATALOG_LIST_DEFS: FilterDef[] = [catalogCountryFilterDef]

export default function ProductsPage() {
  const [sp, setSp] = useSearchParams()
  const { lineCount, hasClient } = useVisitOrder()
  const showRepBar = readRepModeActive() || hasClient || lineCount > 0

  const scope = resolveCategoryScope(sp)
  const pool = useMemo(() => catalogBasePool(sp), [sp.toString()])

  const { facets, results, state, toggle, clearAll, setSort, sort, q, clearQuery, active, total } =
    useCatalogQuery(pool, CATALOG_LIST_DEFS)

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
    <div className={`catalog-pro catalog-page${lineCount > 0 ? ' catalog-page--order-bar' : ''}`}>
      <div className="cp-shell">
        <CatalogIntro
          title={title}
          intro={intro}
          count={results.length}
          totalPool={pool.length}
          query={q || undefined}
          onClearQuery={clearQuery}
        />

        <CatalogCategoryRail currentSlug={scope.slug} buildHref={buildCategoryHref} />

        {showRepBar ? (
          <div className="cp-client">
            <CatalogClientBar />
          </div>
        ) : null}

        <div className="cp-workspace cp-workspace--full">
          <div className="cp-main">
            <CountryFilter
              facet={countryFacet}
              selected={countrySelected}
              onToggle={onToggleCountry}
              onClearAll={clearCountryFilter}
            />

            <CatalogResultsBar
              total={total}
              active={active}
              onRemove={onRemoveChip}
              sort={sort}
              onSort={setSort}
              onClearAll={clearFacetsAndSearch}
            />

            <ProductGrid products={results} onClearAll={clearFacetsAndSearch} resultsKey={resultsKey} />
          </div>
        </div>
      </div>
    </div>
  )
}
