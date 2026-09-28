import { Star } from 'lucide-react'
import { useCatalogEngagement } from '../../context/CatalogEngagementContext'

export default function FavoriteToggle({
  productId,
  className = '',
}: {
  productId: string
  className?: string
}) {
  const { isFavorite, toggleFavorite } = useCatalogEngagement()
  const on = isFavorite(productId)

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggleFavorite(productId)
      }}
      className={`catalog-fav-btn focus-ring ${on ? 'catalog-fav-btn--on' : ''} ${className}`.trim()}
      aria-label={on ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}
      aria-pressed={on}
    >
      <Star size={18} strokeWidth={1.75} fill={on ? 'currentColor' : 'none'} aria-hidden />
    </button>
  )
}
