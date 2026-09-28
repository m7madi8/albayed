export default function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="product-grid product-grid--skeleton" aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="catalog-card catalog-card--skeleton">
          <div className="catalog-card__stage catalog-stage skeleton-shimmer" />
          <div className="catalog-card__meta">
            <div className="skeleton-line skeleton-line--sm" />
            <div className="skeleton-line skeleton-line--lg" />
            <div className="skeleton-line skeleton-line--md" />
          </div>
        </div>
      ))}
    </div>
  )
}
