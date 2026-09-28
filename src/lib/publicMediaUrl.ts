/** مسارات `public/` مع أسماء عربية — ترميز كل مقطع لضمان تحميل الصور في المتصفح. */
export function publicMediaUrl(path: string): string {
  if (!path.startsWith('/')) return path
  return path
    .split('/')
    .map((segment) => (segment ? encodeURIComponent(segment) : ''))
    .join('/')
}
