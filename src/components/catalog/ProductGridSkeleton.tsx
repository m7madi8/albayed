export default function ProductGridSkeleton({
  count = 6,
  variant = 'catalog',
}: {
  count?: number
  variant?: 'catalog' | 'shelf'
}) {
  if (variant === 'shelf') {
    return (
      <div className="sh-grid" aria-hidden>
        {Array.from({ length: count }, (_, i) => (
          <div key={i} className="sh-tag">
            <div className="sh-tag__plate skeleton-shimmer" style={{ minHeight: '11rem' }} />
            <div className="sh-tag__body">
              <div className="skeleton-shimmer" style={{ height: 12, width: '40%', marginBottom: 8 }} />
              <div className="skeleton-shimmer" style={{ height: 16, width: '90%' }} />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="cp-grid cp-grid--skeleton" aria-hidden>      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="cp-card">
          <div className="cp-skel-media skeleton-shimmer" />
          <div className="cp-skel-line cp-skel-line--sm skeleton-shimmer" />
          <div className="cp-skel-line cp-skel-line--lg skeleton-shimmer" />
          <div className="cp-skel-line skeleton-shimmer" />
        </div>
      ))}
    </div>
  )
}
