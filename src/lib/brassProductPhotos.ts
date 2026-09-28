/** صور حقيقية من `public/المنتجات/النحاس` — بالترتيب 1→8 كما في الكتالوج. */
const BRASS_MEDIA_BASE = '/المنتجات/النحاس'

/** ترتيب الأصناف في `products.ts` ضمن فئة brass */
const BRASS_PRODUCT_FILES: Record<string, string> = {
  'brass-ball-valve': '1.webp',
  'brass-gate-valve': '2.jpg',
  'brass-check-valve': '3.jpg',
  'brass-elbow-90': '4.jpg',
  'brass-tee': '5.webp',
  'brass-double-nipple': '6.jpg',
  'brass-manifold-4': '7.webp',
  'brass-y-strainer': '8.jpg',
}

export function brassProductImage(slug: string): string | undefined {
  const file = BRASS_PRODUCT_FILES[slug]
  return file ? `${BRASS_MEDIA_BASE}/${file}` : undefined
}

