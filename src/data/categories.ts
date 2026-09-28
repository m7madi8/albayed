import type { Category, FilterDef } from './types'

/** Nominal inch sizes in natural order — used to sort every diameter/size facet. */
export const SIZE_ORDER = [
  '1/2 إنش', '3/4 إنش', '1 إنش', '1¼ إنش', '1½ إنش', '2 إنش', '2½ إنش', '3 إنش', '4 إنش', '6 إنش',
]

const origin: FilterDef = { key: 'origin', label: 'المنشأ', source: 'origin' }
const brand: FilterDef = { key: 'brand', label: 'العلامة التجارية', source: 'brand' }
const type = (label = 'النوع'): FilterDef => ({ key: 'type', label, source: 'type' })
const attr = (key: string, label: string, order?: string[]): FilterDef => ({ key, label, source: 'attr', order })

/**
 * Categories drive the whole browsing UI: the hero, the sub-type strip and —
 * most importantly — the filter set. Nothing about a category page is hardcoded
 * in a component; add an entry here and the page exists.
 */
export const categories: Category[] = [
  {
    id: 'pipes',
    name: 'مواسير بلاستيك',
    slug: 'pipes',
    tagline: 'مواسير بلاستيك للمياه والري والتمديدات والصرف.',
    description:
      'مواسير بلاستيك (PVC، PPR، HDPE، PEX) لشبكات المياه والري والتدفئة والصرف الصحي، بأقطار وأطوال وضغوط تشغيل مختلفة.',
    productCount: 420,
    subtypes: ['PVC', 'HDPE', 'PPR', 'PEX'],
    filters: [
      type(),
      attr('diameter', 'القطر', SIZE_ORDER),
      attr('length', 'الطول'),
      attr('thickness', 'السماكة والضغط', ['PN6', 'PN10', 'PN16', 'PN20', 'PN25', 'SN4']),
      attr('usage', 'الاستخدام'),
      origin,
      brand,
    ],
    tone: '#e8e6de',
    hero: [
      { kind: 'pipe', material: 'ppr', variant: 1 },
      { kind: 'coil', material: 'hdpe' },
      { kind: 'pipe', material: 'pvc', mark: 'PN16' },
    ],
  },
  {
    id: 'fittings',
    name: 'الوصلات',
    slug: 'fittings',
    tagline: 'كل ما يربط الشبكة: أكواع وتيهات وتخفيضات بطرق توصيل مختلفة.',
    description:
      'وصلات لجميع أنظمة المواسير، من اللحام الحراري والمذيب إلى القلاووظ والضغط، بمقاسات ومواد ومنشأ متعدد.',
    productCount: 690,
    subtypes: ['كوع', 'تيه', 'وصلة تخفيض', 'وصلة توصيل', 'غطاء نهاية'],
    filters: [
      type(),
      attr('size', 'المقاس', SIZE_ORDER),
      attr('connection', 'طريقة التوصيل'),
      attr('material', 'المادة'),
      origin,
      brand,
    ],
    tone: '#e4e3d9',
    hero: [
      { kind: 'elbow', material: 'ppr' },
      { kind: 'tee', material: 'pvc' },
      { kind: 'reducer', material: 'ppr' },
    ],
  },
  {
    id: 'brass',
    name: 'قطع النحاس',
    slug: 'brass',
    tagline: 'محابس وصمامات ووصلات نحاسية للتمديدات التي لا تتحمل التهاون.',
    description:
      'منتجات نحاس أصفر للمياه والتدفئة والتوزيع، بدرجات سماكة وضغط مختلفة ومقاسات من نصف إنش إلى أربعة.',
    productCount: 380,
    subtypes: ['محبس كروي', 'محبس بوابة', 'صمام عدم رجوع', 'وصلة نحاس', 'موزع', 'مصفاة'],
    filters: [
      type(),
      attr('size', 'المقاس', SIZE_ORDER),
      attr('thickness', 'السماكة', ['قياسي', 'مقوّى']),
      attr('usage', 'الاستخدام'),
      origin,
      brand,
    ],
    tone: '#ebe3d1',
    hero: [
      { kind: 'ballValve', material: 'brass' },
      { kind: 'gateValve', material: 'brass' },
      { kind: 'manifold', material: 'brass' },
    ],
  },
  {
    id: 'sanitary',
    name: 'الأدوات الصحية',
    slug: 'sanitary',
    tagline: 'مغاسل ومراحيض وبطاريات — تُباع بالحبة.',
    description:
      'أدوات صحية للسكن والمشاريع التجارية، من السيراميك إلى البطاريات بتشطيبات كروم وأسود مطفي. الطلب بالحبة فقط.',
    productCount: 540,
    subtypes: ['مغسلة', 'مرحاض', 'بطارية', 'دش'],
    filters: [
      type(),
      attr('finish', 'اللون والتشطيب'),
      attr('material', 'المادة'),
      attr('installation', 'طريقة التركيب'),
      origin,
      brand,
    ],
    tone: '#ecedea',
    hero: [
      { kind: 'basin', material: 'ceramic' },
      { kind: 'mixer', material: 'chrome' },
      { kind: 'toilet', material: 'ceramic' },
    ],
  },
  {
    id: 'projects',
    name: 'مستلزمات المشاريع',
    slug: 'projects',
    tagline: 'مضخات وخزانات وتجهيزات للمشاريع السكنية والتجارية.',
    description:
      'تجهيزات الموقع والمشاريع: مضخات، خزانات، أغطية تفتيش وعزل حراري للأنابيب.',
    productCount: 260,
    subtypes: ['مضخة', 'خزان', 'غطاء تفتيش', 'عزل'],
    filters: [type(), attr('capacity', 'السعة والقدرة'), attr('usage', 'الاستخدام'), origin, brand],
    tone: '#dfdfd9',
    hero: [
      { kind: 'pump', material: 'steel' },
      { kind: 'tank', material: 'black' },
      { kind: 'cover', material: 'iron' },
    ],
  },
  {
    id: 'tools',
    name: 'الأدوات والملحقات',
    slug: 'tools',
    tagline: 'الأدوات الصغيرة التي تكمل التركيب.',
    description:
      'أدوات يدوية وملحقات تركيب: مفاتيح، أشرطة تفلون، لواصق وحوامل تثبيت.',
    productCount: 310,
    subtypes: ['مفتاح', 'لاصق', 'شريط', 'حامل'],
    filters: [type(), attr('usage', 'الاستخدام'), attr('material', 'المادة'), origin, brand],
    tone: '#e7e4dc',
    hero: [
      { kind: 'wrench', material: 'steel' },
      { kind: 'tape', material: 'white' },
      { kind: 'can', material: 'steel' },
    ],
  },
]

export const categoryBySlug = (slug: string) => categories.find((c) => c.slug === slug)
export const categoryById = (id: string) => categories.find((c) => c.id === id)

/** @deprecated صفحة المنتجات تستخدم salesOriginFilterDef من lib/salesFilters */
export const globalFilters: FilterDef[] = [origin]
