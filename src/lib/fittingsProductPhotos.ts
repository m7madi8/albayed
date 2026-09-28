/** صور حقيقية من `public/المنتجات/الوصلات` — بالترتيب 1→7 كما في الكتالوج. */
const FITTINGS_MEDIA_BASE = '/المنتجات/الوصلات'

const FITTINGS_PRODUCT_FILES: Record<string, string> = {
  'ppr-elbow-90': '1.jpg',
  'ppr-elbow-45': '2.jpg',
  'ppr-equal-tee': '3.webp',
  'pvc-solvent-elbow': '4.webp',
  'pvc-sewer-tee': '5.webp',
  'hdpe-compression-coupling': '6.avif',
  'ppr-brass-male-adapter': '7.jpg',
}

export function fittingsProductImage(slug: string): string | undefined {
  const file = FITTINGS_PRODUCT_FILES[slug]
  return file ? `${FITTINGS_MEDIA_BASE}/${file}` : undefined
}

export const FITTINGS_SECTION_COVER_IMAGE = `${FITTINGS_MEDIA_BASE}/1.jpg`
