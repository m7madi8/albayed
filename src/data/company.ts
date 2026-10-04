import type { SiteStat } from './types'

/**
 * Company-level content. Anything marked `placeholder` is demo-safe and must be
 * replaced with a verified figure before public launch.
 */
export const company = {
  name: 'البايض',
  legalName: 'شركة البايض',
  showroom: 'معرض البايض للأدوات الصحية',
  latin: 'AL-BAYED',
  description:
    'موزّع فلسطيني للمواسير والوصلات والنحاس والأدوات الصحية ومستلزمات المشاريع، بآلاف الأصناف من علامات ومصادر متعددة.',
  contact: {
    phone: '+970 00 000 0000',
    whatsapp: '+970 00 000 0000',
    email: 'info@example.com',
    address: 'فلسطين — العنوان التفصيلي يُضاف لاحقًا',
    hours: 'السبت – الخميس، 8:00 – 17:00',
  },
}

/** The only verified figure from the brief; everything else stays qualitative until real numbers exist. */
export const stats: SiteStat[] = [{ value: '+5,000', label: 'منتج في الكتالوج' }]

/** Qualitative trust markers — deliberately non-numeric so nothing here reads as an invented statistic. */
export const trustPillars = [
  { label: 'علامات ومصادر متعددة', description: 'خيارات بمستويات جودة وأسعار مختلفة تناسب كل مشروع.' },
  { label: 'تغطية شاملة للتصنيفات', description: 'من الأنبوب إلى القطعة الأخيرة في التمديد.' },
  { label: 'تواصل مباشر وسريع', description: 'فريق جاهز للرد على استفسارات المنتج والتوفر.' },
]
