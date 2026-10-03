export default function CatalogViewToggle({
  view,
  onView,
}: {
  view: 'gallery' | 'sheet'
  onView: (view: 'gallery' | 'sheet') => void
}) {
  return (
    <div className="sh-view-toggle" role="group" aria-label="طريقة العرض">
      <button
        type="button"
        className={`sh-view-toggle__btn${view === 'gallery' ? ' sh-view-toggle__btn--active' : ''}`}
        onClick={() => onView('gallery')}
        aria-pressed={view === 'gallery'}
      >
        معرض
      </button>
      <button
        type="button"
        className={`sh-view-toggle__btn${view === 'sheet' ? ' sh-view-toggle__btn--active' : ''}`}
        onClick={() => onView('sheet')}
        aria-pressed={view === 'sheet'}
      >
        جدول
      </button>
    </div>
  )
}
