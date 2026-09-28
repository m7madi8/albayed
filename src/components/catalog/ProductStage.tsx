import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import type { Product } from '../../data/types'
import { productExhibitArtZoom, productExhibitLayout } from '../../lib/productCardPresentation'
import { publicMediaUrl } from '../../lib/publicMediaUrl'
import ProductArt from '../art/ProductArt'

/** Consistent product visual frame — vector today, photography-ready. */
export default function ProductStage({
  product,
  className = '',
  density = 'card',
}: {
  product: Product
  className?: string
  density?: 'card' | 'thumb' | 'hero'
}) {
  const layout = productExhibitLayout(product.art.kind)
  const zoom = productExhibitArtZoom(product.art.kind)
  const style = { '--catalog-art-zoom': String(zoom) } as CSSProperties
  const photoSrc = product.image ? publicMediaUrl(product.image) : undefined
  const [photoFailed, setPhotoFailed] = useState(false)

  useEffect(() => {
    setPhotoFailed(false)
  }, [photoSrc])

  const showPhoto = Boolean(photoSrc) && !photoFailed

  return (
    <div
      className={`catalog-stage-frame catalog-stage-frame--${layout} catalog-stage-frame--${density}${showPhoto ? ' catalog-stage-frame--photo' : ''} ${className}`.trim()}
      style={style}
    >
      {showPhoto ? (
        <img
          src={photoSrc}
          alt=""
          className="catalog-stage-frame__photo"
          loading={density === 'card' ? 'lazy' : 'eager'}
          decoding="async"
          onError={() => setPhotoFailed(true)}
        />
      ) : (
        <ProductArt spec={product.art} className="catalog-stage-frame__art" shadow={density === 'hero'} />
      )}
    </div>
  )
}
