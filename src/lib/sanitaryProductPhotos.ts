/** صور حقيقية من `public/المنتجات/الادوات الصحية` — بالترتيب 1→9 كما في الكتالوج. */
const SANITARY_MEDIA_BASE = '/المنتجات/الادوات الصحية'

const SANITARY_PRODUCT_FILES: Record<string, string> = {
  'countertop-ceramic-basin': '1.jpg',
  'pedestal-ceramic-basin': '2.jpg',
  'wall-hung-basin': '3.jpg',
  'close-coupled-toilet': '4.jpg',
  'wall-hung-toilet': '5.webp',
  'chrome-basin-mixer': '6.webp',
  'kitchen-gooseneck-mixer': '7.webp',
  'rain-shower-set': '8.jpg',
  'matte-black-basin-mixer': '9.webp',
}

export function sanitaryProductImage(slug: string): string | undefined {
  const file = SANITARY_PRODUCT_FILES[slug]
  return file ? `${SANITARY_MEDIA_BASE}/${file}` : undefined
}

export const SANITARY_SECTION_COVER_IMAGE = `${SANITARY_MEDIA_BASE}/1.jpg`
