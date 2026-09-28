import type { Brand, Origin } from './types'

/** Demo origins. */
export const origins: Origin[] = [
  { id: 'tr', name: 'تركيا', latin: 'Türkiye' },
  { id: 'it', name: 'إيطاليا', latin: 'Italy' },
  { id: 'cn', name: 'الصين', latin: 'China' },
  { id: 'jo', name: 'الأردن', latin: 'Jordan' },
  { id: 'es', name: 'إسبانيا', latin: 'Spain' },
  { id: 'de', name: 'ألمانيا', latin: 'Germany' },
  { id: 'eg', name: 'مصر', latin: 'Egypt' },
  { id: 'il', name: 'إسرائيل', latin: 'Israel' },
]

/** Demo brands — fictional placeholders, to be replaced with the company's real brand list. */
export const brands: Brand[] = [
  { id: 'nukhba', name: 'النخبة', latin: 'Al-Nukhba', originId: 'tr' },
  { id: 'aura', name: 'أورا', latin: 'AURA', originId: 'it' },
  { id: 'mirage', name: 'ميراج', latin: 'MIRAGE', originId: 'es' },
  { id: 'aqualine', name: 'أكوا لاين', latin: 'AquaLine', originId: 'jo' },
  { id: 'ferro', name: 'فيرو', latin: 'FERRO', originId: 'de' },
  { id: 'bluestream', name: 'بلو ستريم', latin: 'BlueStream', originId: 'tr' },
  { id: 'cuprix', name: 'كوبريكس', latin: 'CuPrix', originId: 'it' },
  { id: 'zahra', name: 'زهرة', latin: 'Zahra', originId: 'eg' },
  { id: 'maidan', name: 'ميدان', latin: 'MAIDAN', originId: 'jo' },
  { id: 'ciera', name: 'سيرا', latin: 'Ciera', originId: 'es' },
  { id: 'terraflow', name: 'تيرا فلو', latin: 'TerraFlow', originId: 'cn' },
  { id: 'hydrotec', name: 'هيدروتك', latin: 'HYDROTEC', originId: 'de' },
]
