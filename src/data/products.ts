import type { ArtSpec, Availability, Product, SpecRow } from './types'
import { catalogProductImage } from '../lib/catalogProductPhotos'

/**
 * Demo products (~50). Names, brands and specs are realistic but fictional.
 * `attributes` keys line up with the filter keys in categories.ts.
 * Arrays represent one product family offered in several values (sizes, lengths…).
 */

type Attrs = Record<string, string | string[]>

interface Seed {
  slug: string
  name: string
  cat: string
  type: string
  brand: string
  origin: string
  av?: Availability
  art: ArtSpec
  summary: string
  attrs: Attrs
  details?: SpecRow[]
  kw?: string[]
}

const S = {
  h: '1/2 إنش', tq: '3/4 إنش', one: '1 إنش', oq: '1¼ إنش', oh: '1½ إنش',
  two: '2 إنش', th: '3 إنش', fo: '4 إنش', six: '6 إنش',
}

const seeds: Seed[] = [
  /* ───────────── مواسير بلاستيك ───────────── */
  {
    slug: 'pvc-pressure-pipe-pn16', name: 'ماسورة بلاستيك PVC ضغط PN16', cat: 'pipes', type: 'PVC', brand: 'nukhba', origin: 'tr',
    art: { kind: 'pipe', material: 'pvc', mark: 'PVC-U PN16' },
    summary: 'ماسورة بلاستيك PVC صلبة لشبكات المياه المضغوطة، وصلات بالمذيب أو بحلقة مطاطية.',
    attrs: { diameter: [S.one, S.two, S.th, S.fo], length: '6 م', thickness: 'PN16', usage: ['مياه الشرب', 'الري'] },
    details: [{ label: 'المادة الخام', value: 'PVC-U' }, { label: 'اللون', value: 'رمادي' }, { label: 'المعيار', value: 'ISO 1452' }],
    kw: ['pvc', 'pressure pipe'],
  },
  {
    slug: 'pvc-sewer-pipe-sn4', name: 'ماسورة بلاستيك PVC صرف صحي SN4', cat: 'pipes', type: 'PVC', brand: 'aqualine', origin: 'jo',
    art: { kind: 'pipe', material: 'pvc', variant: 2, mark: 'SN4' },
    summary: 'ماسورة بلاستيك PVC لشبكات الصرف الصحي والتصريف، بجدار أملس ومقاومة عالية للتآكل.',
    attrs: { diameter: [S.two, S.th, S.fo, S.six], length: '6 م', thickness: 'SN4', usage: 'الصرف الصحي' },
    details: [{ label: 'المادة الخام', value: 'PVC-U' }, { label: 'اللون', value: 'بني محمر' }, { label: 'الصلابة الحلقية', value: 'SN4' }],
    kw: ['sewer', 'drain'],
  },
  {
    slug: 'pvc-irrigation-pipe-pn10', name: 'ماسورة بلاستيك PVC للري PN10', cat: 'pipes', type: 'PVC', brand: 'mirage', origin: 'es',
    art: { kind: 'pipe', material: 'pvc', variant: 1, mark: 'PN10' },
    summary: 'ماسورة بلاستيك PVC خفيفة الوزن لخطوط الري الرئيسية والفرعية.',
    attrs: { diameter: [S.tq, S.one, S.oh, S.two], length: '6 م', thickness: 'PN10', usage: 'الري' },
    details: [{ label: 'المادة الخام', value: 'PVC-U' }, { label: 'اللون', value: 'رمادي فاتح' }],
    kw: ['irrigation'],
  },
  {
    slug: 'ppr-green-pipe-pn20', name: 'ماسورة بلاستيك PPR أخضر PN20', cat: 'pipes', type: 'PPR', brand: 'nukhba', origin: 'tr',
    art: { kind: 'pipe', material: 'ppr', mark: 'PPR PN20' },
    summary: 'ماسورة بلاستيك بولي بروبيلين للتمديدات الداخلية للمياه الساخنة والباردة، تُوصَل باللحام الحراري.',
    attrs: { diameter: [S.h, S.tq, S.one, S.oq, S.oh, S.two], length: '4 م', thickness: 'PN20', usage: ['التمديدات الداخلية', 'مياه الشرب'] },
    details: [{ label: 'المادة الخام', value: 'PP-R 80' }, { label: 'حرارة التشغيل', value: 'حتى 95°م' }, { label: 'اللون', value: 'أخضر' }],
    kw: ['ppr', 'hot water'],
  },
  {
    slug: 'ppr-white-pipe-pn16', name: 'ماسورة بلاستيك PPR أبيض PN16', cat: 'pipes', type: 'PPR', brand: 'terraflow', origin: 'cn', av: 'limited',
    art: { kind: 'pipe', material: 'white', variant: 0, mark: 'PPR PN16' },
    summary: 'ماسورة بلاستيك PPR بيضاء للمياه الباردة والتمديدات الداخلية بضغط متوسط.',
    attrs: { diameter: [S.tq, S.one, S.oq, S.two], length: '4 م', thickness: 'PN16', usage: ['التمديدات الداخلية', 'مياه الشرب'] },
    details: [{ label: 'المادة الخام', value: 'PP-R' }, { label: 'اللون', value: 'أبيض' }],
    kw: ['ppr'],
  },
  {
    slug: 'ppr-aluminium-pipe-pn25', name: 'ماسورة بلاستيك PPR مقوّى بالألمنيوم PN25', cat: 'pipes', type: 'PPR', brand: 'hydrotec', origin: 'de',
    art: { kind: 'pipe', material: 'ppr', variant: 2, mark: 'PN25 AL' },
    summary: 'ماسورة بلاستيك PPR بطبقة ألمنيوم تقلل التمدد الحراري، مناسبة للتدفئة والمياه الساخنة.',
    attrs: { diameter: [S.tq, S.one, S.oq, S.oh], length: '4 م', thickness: 'PN25', usage: ['تمديدات التدفئة', 'التمديدات الداخلية'] },
    details: [{ label: 'التركيب', value: 'ثلاث طبقات مع طبقة ألمنيوم' }, { label: 'حرارة التشغيل', value: 'حتى 95°م' }],
    kw: ['ppr al', 'stabi'],
  },
  {
    slug: 'hdpe-water-coil-pe100', name: 'بربيج بلاستيك HDPE للمياه PE100', cat: 'pipes', type: 'بربيج HDPE', brand: 'aqualine', origin: 'jo',
    art: { kind: 'coil', material: 'hdpe' },
    summary: 'بربيج بولي إيثيلين عالي الكثافة بلفة طويلة، مرن ومقاوم للتآكل، لشبكات مياه الشرب.',
    attrs: { diameter: [S.h, S.tq, S.one, S.oq, S.two], length: 'لفة 100 م', thickness: 'PN16', usage: ['مياه الشرب', 'الري'] },
    details: [{ label: 'المادة الخام', value: 'PE100' }, { label: 'اللون', value: 'أسود بخط أزرق' }, { label: 'المعيار', value: 'ISO 4427' }],
    kw: ['hdpe', 'coil', 'polyethylene'],
  },
  {
    slug: 'hdpe-rod-pn10', name: 'ماسورة بلاستيك HDPE قضيب PN10', cat: 'pipes', type: 'HDPE', brand: 'maidan', origin: 'jo',
    art: { kind: 'pipe', material: 'hdpe', variant: 1, mark: 'PE100 PN10' },
    summary: 'ماسورة بلاستيك HDPE بأطوال مستقيمة للخطوط الرئيسية، تُوصَل باللحام الحراري أو الكهربائي.',
    attrs: { diameter: [S.th, S.fo, S.six], length: '12 م', thickness: 'PN10', usage: ['مياه الشرب', 'الإنشاءات والصناعة'] },
    details: [{ label: 'المادة الخام', value: 'PE100' }, { label: 'اللون', value: 'أسود بخط أزرق' }],
    kw: ['hdpe', 'main line'],
  },
  {
    slug: 'hdpe-irrigation-coil-pn6', name: 'بربيج بلاستيك HDPE للري PN6', cat: 'pipes', type: 'بربيج HDPE', brand: 'zahra', origin: 'eg',
    art: { kind: 'coil', material: 'hdpe', variant: 1 },
    summary: 'بربيج أسود مرن لخطوط الري في الأراضي الزراعية والمشاريع.',
    attrs: { diameter: [S.h, S.tq, S.one], length: 'لفة 200 م', thickness: 'PN6', usage: 'الري' },
    details: [{ label: 'المادة الخام', value: 'PE80' }, { label: 'اللون', value: 'أسود' }],
    kw: ['irrigation', 'drip'],
  },
  {
    slug: 'pex-b-underfloor-heating', name: 'بربيج بلاستيك PEX-B للتدفئة الأرضية', cat: 'pipes', type: 'بربيج PEX', brand: 'hydrotec', origin: 'de',
    art: { kind: 'coil', material: 'pex' },
    summary: 'بربيج بولي إيثيلين متشابك الروابط بحاجز أكسجين لأنظمة التدفئة الأرضية.',
    attrs: { diameter: [S.h, S.tq], length: 'لفة 200 م', thickness: 'PN10', usage: 'تمديدات التدفئة' },
    details: [{ label: 'التركيب', value: 'PEX-B مع طبقة EVOH' }, { label: 'حرارة التشغيل', value: 'حتى 90°م' }],
    kw: ['pex', 'underfloor', 'heating'],
  },
  {
    slug: 'pex-al-pex-multilayer', name: 'بربيج بلاستيك PEX-AL-PEX متعدد الطبقات', cat: 'pipes', type: 'بربيج PEX', brand: 'cuprix', origin: 'it',
    art: { kind: 'coil', material: 'pex', variant: 1 },
    summary: 'بربيج متعدد الطبقات يحتفظ بشكله عند الثني، للتمديدات الداخلية والتدفئة.',
    attrs: { diameter: [S.h, S.tq, S.one], length: 'لفة 100 م', thickness: 'PN10', usage: ['التمديدات الداخلية', 'تمديدات التدفئة'] },
    details: [{ label: 'التركيب', value: 'PEX / ألمنيوم / PEX' }, { label: 'الوصلات', value: 'ضغط (Compression)' }],
    kw: ['multilayer', 'pex al pex'],
  },

  /* ───────────── الوصلات ───────────── */
  {
    slug: 'ppr-elbow-90', name: 'كوع PPR حراري 90°', cat: 'fittings', type: 'كوع', brand: 'nukhba', origin: 'tr',
    art: { kind: 'elbow', material: 'ppr' },
    summary: 'كوع بزاوية قائمة لأنظمة PPR، يُلحَم حراريًا بالأنبوب.',
    attrs: { size: [S.h, S.tq, S.one, S.oq, S.oh, S.two], connection: 'لحام حراري', material: 'PPR' },
    details: [{ label: 'الزاوية', value: '90 درجة' }, { label: 'الضغط', value: 'PN25' }],
    kw: ['elbow', 'ppr'],
  },
  {
    slug: 'ppr-elbow-45', name: 'كوع PPR حراري 45°', cat: 'fittings', type: 'كوع', brand: 'bluestream', origin: 'tr',
    art: { kind: 'elbow45', material: 'ppr' },
    summary: 'كوع بزاوية 45 درجة لتغيير الاتجاه بانسيابية أكبر في التمديدات.',
    attrs: { size: [S.tq, S.one, S.oq, S.two], connection: 'لحام حراري', material: 'PPR' },
    details: [{ label: 'الزاوية', value: '45 درجة' }, { label: 'الضغط', value: 'PN25' }],
    kw: ['elbow 45'],
  },
  {
    slug: 'ppr-equal-tee', name: 'تيه PPR متساوي', cat: 'fittings', type: 'تيه', brand: 'terraflow', origin: 'cn',
    art: { kind: 'tee', material: 'ppr' },
    summary: 'تيه بثلاث نهايات متساوية لتفريع خطوط PPR.',
    attrs: { size: [S.h, S.tq, S.one, S.oq, S.two], connection: 'لحام حراري', material: 'PPR' },
    details: [{ label: 'الشكل', value: 'متساوي الأفرع' }, { label: 'الضغط', value: 'PN25' }],
    kw: ['tee'],
  },
  {
    slug: 'pvc-solvent-elbow', name: 'كوع PVC ضغط 90° (لحام بالمذيب)', cat: 'fittings', type: 'كوع', brand: 'mirage', origin: 'es',
    art: { kind: 'elbow', material: 'pvc', variant: 1 },
    summary: 'كوع PVC لشبكات المياه المضغوطة، يُوصَل بالمذيب اللاصق.',
    attrs: { size: [S.one, S.oh, S.two, S.th, S.fo], connection: 'لحام بالمذيب', material: 'PVC' },
    details: [{ label: 'الزاوية', value: '90 درجة' }, { label: 'الضغط', value: 'PN16' }],
    kw: ['pvc elbow'],
  },
  {
    slug: 'pvc-sewer-tee', name: 'تيه PVC للصرف الصحي', cat: 'fittings', type: 'تيه', brand: 'aqualine', origin: 'jo',
    art: { kind: 'tee', material: 'pvc', variant: 1 },
    summary: 'تيه بفرع مائل مصمم لتدفق الصرف الصحي.',
    attrs: { size: [S.two, S.th, S.fo], connection: 'حلقة مطاطية', material: 'PVC' },
    details: [{ label: 'زاوية الفرع', value: '87.5 درجة' }],
    kw: ['sewer tee'],
  },
  {
    slug: 'hdpe-compression-coupling', name: 'وصلة HDPE بالضغط (Compression)', cat: 'fittings', type: 'وصلة توصيل', brand: 'cuprix', origin: 'it',
    art: { kind: 'coupling', material: 'black', variant: 1 },
    summary: 'وصلة ميكانيكية لتوصيل مواسير HDPE دون لحام.',
    attrs: { size: [S.h, S.tq, S.one, S.oq, S.two], connection: 'ضغط', material: 'HDPE' },
    details: [{ label: 'الضغط', value: 'PN16' }, { label: 'الحلقات', value: 'مطاط NBR' }],
    kw: ['compression coupling'],
  },
  {
    slug: 'ppr-brass-male-adapter', name: 'وصلة PPR قلاووظ خارجي بنحاس', cat: 'fittings', type: 'وصلة توصيل', brand: 'nukhba', origin: 'tr',
    art: { kind: 'coupling', material: 'ppr', variant: 2 },
    summary: 'وصلة بنهاية نحاسية مقلوظة للانتقال من PPR إلى محبس أو بطارية.',
    attrs: { size: [S.h, S.tq, S.one], connection: ['لحام حراري', 'قلاووظ'], material: ['PPR', 'نحاس'] },
    details: [{ label: 'القلاووظ', value: 'BSP خارجي' }],
    kw: ['adapter', 'threaded'],
  },

  /* ───────────── النحاس ───────────── */
  {
    slug: 'brass-ball-valve', name: 'محبس نحاس كروي', cat: 'brass', type: 'محبس كروي', brand: 'cuprix', origin: 'it',
    art: { kind: 'ballValve', material: 'brass' },
    summary: 'محبس كروي بذراع فولاذي، إغلاق كامل بربع دورة، لخطوط المياه والتدفئة.',
    attrs: { size: [S.h, S.tq, S.one, S.oq, S.oh, S.two], thickness: 'مقوّى', usage: ['مياه الشرب', 'التمديدات الداخلية', 'التدفئة'] },
    details: [{ label: 'الضغط', value: 'PN25' }, { label: 'الوصلات', value: 'قلاووظ BSP' }, { label: 'الذراع', value: 'فولاذ مطلي' }],
    kw: ['ball valve'],
  },
  {
    slug: 'brass-gate-valve', name: 'محبس نحاس بوابة', cat: 'brass', type: 'محبس بوابة', brand: 'ferro', origin: 'de',
    art: { kind: 'gateValve', material: 'brass' },
    summary: 'محبس بوابة بعجلة يدوية للتحكم التدريجي بالتدفق.',
    attrs: { size: [S.tq, S.one, S.oq, S.two], thickness: 'قياسي', usage: ['مياه الشرب', 'التمديدات الداخلية'] },
    details: [{ label: 'الضغط', value: 'PN16' }, { label: 'التشغيل', value: 'عجلة يدوية' }],
    kw: ['gate valve'],
  },
  {
    slug: 'brass-check-valve', name: 'صمام عدم رجوع نحاس', cat: 'brass', type: 'صمام عدم رجوع', brand: 'cuprix', origin: 'it', av: 'limited',
    art: { kind: 'checkValve', material: 'brass' },
    summary: 'صمام يسمح بالتدفق في اتجاه واحد ويحمي المضخات والخزانات.',
    attrs: { size: [S.h, S.tq, S.one, S.oh, S.two], thickness: 'قياسي', usage: ['مياه الشرب', 'التمديدات الداخلية'] },
    details: [{ label: 'الضغط', value: 'PN16' }, { label: 'النوع', value: 'زنبركي' }],
    kw: ['check valve', 'non return'],
  },
  {
    slug: 'brass-elbow-90', name: 'وصلة نحاس 90 درجة', cat: 'brass', type: 'وصلة نحاس', brand: 'zahra', origin: 'eg',
    art: { kind: 'elbow', material: 'brass', variant: 2 },
    summary: 'كوع نحاسي بقلاووظ داخلي من الطرفين للتوصيلات الدقيقة.',
    attrs: { size: [S.h, S.tq, S.one], thickness: 'قياسي', usage: ['التمديدات الداخلية', 'التدفئة'] },
    details: [{ label: 'الزاوية', value: '90 درجة' }, { label: 'القلاووظ', value: 'BSP داخلي × داخلي' }],
    kw: ['brass elbow'],
  },
  {
    slug: 'brass-tee', name: 'وصلة نحاس تيه قلاووظ', cat: 'brass', type: 'وصلة نحاس', brand: 'zahra', origin: 'eg',
    art: { kind: 'tee', material: 'brass', variant: 2 },
    summary: 'تيه نحاسي بثلاثة قلاووظ داخلية لتفريع الخطوط.',
    attrs: { size: [S.h, S.tq, S.one, S.oq], thickness: 'قياسي', usage: ['التمديدات الداخلية', 'التدفئة'] },
    details: [{ label: 'القلاووظ', value: 'BSP داخلي' }],
    kw: ['brass tee'],
  },
  {
    slug: 'brass-double-nipple', name: 'نبل نحاس مزدوج', cat: 'brass', type: 'وصلة نحاس', brand: 'cuprix', origin: 'it',
    art: { kind: 'nipple', material: 'brass' },
    summary: 'وصلة قلاووظ خارجي من الطرفين بمنتصف سداسي للربط بالمفتاح.',
    attrs: { size: [S.h, S.tq, S.one, S.oq], thickness: 'مقوّى', usage: ['التمديدات الداخلية', 'التدفئة'] },
    details: [{ label: 'القلاووظ', value: 'BSP خارجي' }, { label: 'المنتصف', value: 'سداسي' }],
    kw: ['nipple'],
  },
  {
    slug: 'brass-manifold-4', name: 'موزع نحاس 4 مخارج', cat: 'brass', type: 'موزع', brand: 'hydrotec', origin: 'de',
    art: { kind: 'manifold', material: 'brass' },
    summary: 'موزع لتقسيم خط رئيسي إلى أربعة مسارات في غرف التمديد والتدفئة الأرضية.',
    attrs: { size: [S.one, S.oq], thickness: 'مقوّى', usage: ['تمديدات التدفئة', 'التمديدات الداخلية'] },
    details: [{ label: 'عدد المخارج', value: '4' }, { label: 'الضغط', value: 'PN10' }],
    kw: ['manifold', 'distributor'],
  },
  {
    slug: 'brass-y-strainer', name: 'مصفاة نحاس Y', cat: 'brass', type: 'مصفاة', brand: 'ferro', origin: 'il',
    art: { kind: 'strainer', material: 'brass' },
    summary: 'مصفاة تحجز الشوائب قبل المضخات والمحابس والعدادات.',
    attrs: { size: [S.tq, S.one, S.oh, S.two], thickness: 'قياسي', usage: ['مياه الشرب', 'التدفئة'] },
    details: [{ label: 'الشبكة', value: 'ستانلس 0.8 مم' }, { label: 'الضغط', value: 'PN16' }],
    kw: ['strainer', 'y strainer', 'filter'],
  },

  /* ───────────── الأدوات الصحية ───────────── */
  {
    slug: 'countertop-ceramic-basin', name: 'مغسلة سيراميك فوق الطاولة', cat: 'sanitary', type: 'مغسلة', brand: 'ciera', origin: 'es',
    art: { kind: 'basin', material: 'ceramic' },
    summary: 'مغسلة بيضاوية تُركَّب فوق الطاولة بحواف ناعمة وطلاء سهل التنظيف.',
    attrs: { finish: 'أبيض لامع', material: 'سيراميك', installation: 'فوق الطاولة' },
    details: [{ label: 'الأبعاد', value: '60 × 40 سم' }, { label: 'فتحة البطارية', value: 'بدون' }],
    kw: ['basin', 'washbasin'],
  },
  {
    slug: 'pedestal-ceramic-basin', name: 'مغسلة سيراميك بعمود', cat: 'sanitary', type: 'مغسلة', brand: 'ciera', origin: 'es',
    art: { kind: 'basin', material: 'ceramic', variant: 1 },
    summary: 'مغسلة كلاسيكية بعمود أرضي يخفي التمديدات.',
    attrs: { finish: 'أبيض لامع', material: 'سيراميك', installation: 'بعمود أرضي' },
    details: [{ label: 'الأبعاد', value: '55 × 45 سم' }, { label: 'فتحة البطارية', value: 'واحدة' }],
    kw: ['pedestal basin'],
  },
  {
    slug: 'wall-hung-basin', name: 'مغسلة معلقة على الحائط', cat: 'sanitary', type: 'مغسلة', brand: 'aura', origin: 'it',
    art: { kind: 'basin', material: 'ceramic', variant: 2 },
    summary: 'مغسلة مدمجة معلقة توفر مساحة أسفلها.',
    attrs: { finish: 'أبيض لامع', material: 'سيراميك', installation: 'معلق' },
    details: [{ label: 'الأبعاد', value: '50 × 40 سم' }, { label: 'فتحة البطارية', value: 'واحدة' }],
    kw: ['wall hung basin'],
  },
  {
    slug: 'close-coupled-toilet', name: 'مرحاض سيراميك بخزان مدمج', cat: 'sanitary', type: 'مرحاض', brand: 'mirage', origin: 'tr',
    art: { kind: 'toilet', material: 'ceramic' },
    summary: 'مرحاض أرضي بخزان مدمج ونظام تصريف مزدوج لتوفير المياه.',
    attrs: { finish: 'أبيض لامع', material: 'سيراميك', installation: 'أرضي' },
    details: [{ label: 'التصريف', value: 'مزدوج 3/6 لتر' }, { label: 'المقعد', value: 'إغلاق هادئ' }],
    kw: ['toilet', 'wc'],
  },
  {
    slug: 'wall-hung-toilet', name: 'مرحاض معلق مع خزان مخفي', cat: 'sanitary', type: 'مرحاض', brand: 'aura', origin: 'it', av: 'limited',
    art: { kind: 'toilet', material: 'ceramic', variant: 1 },
    summary: 'مرحاض معلق بتصميم انسيابي يُركَّب مع خزان داخل الجدار.',
    attrs: { finish: 'أبيض لامع', material: 'سيراميك', installation: 'معلق' },
    details: [{ label: 'التصريف', value: 'مزدوج' }, { label: 'الخزان', value: 'مخفي (يُباع منفصلًا)' }],
    kw: ['wall hung wc'],
  },
  {
    slug: 'chrome-basin-mixer', name: 'بطارية مغسلة كروم', cat: 'sanitary', type: 'بطارية', brand: 'aura', origin: 'it',
    art: { kind: 'mixer', material: 'chrome', variant: 1 },
    summary: 'بطارية بذراع واحد وخرطوشة سيراميك بجسم نحاسي مطلي بالكروم.',
    attrs: { finish: 'كروم', material: 'نحاس', installation: 'فوق السطح' },
    details: [{ label: 'الخرطوشة', value: 'سيراميك 35 مم' }, { label: 'الارتفاع', value: '150 مم' }],
    kw: ['mixer', 'tap', 'faucet'],
  },
  {
    slug: 'kitchen-gooseneck-mixer', name: 'بطارية مطبخ بعنق طويل', cat: 'sanitary', type: 'بطارية', brand: 'aura', origin: 'it',
    art: { kind: 'mixer', material: 'chrome', variant: 0 },
    summary: 'بطارية مطبخ بعنق مرتفع تدور 360 درجة وموزع مياه قابل للتنظيف.',
    attrs: { finish: 'كروم', material: 'نحاس', installation: 'فوق السطح' },
    details: [{ label: 'الدوران', value: '360 درجة' }, { label: 'الارتفاع', value: '340 مم' }],
    kw: ['kitchen mixer'],
  },
  {
    slug: 'rain-shower-set', name: 'طقم دش مطري كروم', cat: 'sanitary', type: 'دش', brand: 'hydrotec', origin: 'de',
    art: { kind: 'shower', material: 'chrome' },
    summary: 'طقم دش برأس مطري كبير وذراع حائط، مضاد للترسبات.',
    attrs: { finish: 'كروم', material: 'ستانلس ستيل', installation: 'حائط' },
    details: [{ label: 'قطر الرأس', value: '250 مم' }, { label: 'فوهات مضادة للترسب', value: 'سيليكون' }],
    kw: ['shower', 'rain shower'],
  },
  {
    slug: 'matte-black-basin-mixer', name: 'بطارية مغسلة أسود مطفي', cat: 'sanitary', type: 'بطارية', brand: 'aura', origin: 'it',
    art: { kind: 'mixer', material: 'blackchrome', variant: 1 },
    summary: 'بطارية بتشطيب أسود مطفي مقاوم للخدوش بتصميم أسطواني.',
    attrs: { finish: 'أسود مطفي', material: 'نحاس', installation: 'فوق السطح' },
    details: [{ label: 'الخرطوشة', value: 'سيراميك 35 مم' }, { label: 'الارتفاع', value: '160 مم' }],
    kw: ['black mixer'],
  },

  /* ───────────── مستلزمات المشاريع ───────────── */
  {
    slug: 'centrifugal-pump-1-5hp', name: 'مضخة مياه طرد مركزي 1.5 حصان', cat: 'projects', type: 'مضخة', brand: 'hydrotec', origin: 'it',
    art: { kind: 'pump', material: 'steel' },
    summary: 'مضخة سطحية لرفع الضغط وتغذية الشبكات في المباني السكنية.',
    attrs: { capacity: '1.5 حصان', usage: ['رفع الضغط', 'تغذية الشبكات'] },
    details: [{ label: 'القدرة', value: '1.1 كيلوواط' }, { label: 'الجهد', value: '220 فولت' }, { label: 'أقصى ارتفاع ضخ', value: '45 م' }],
    kw: ['pump', 'centrifugal'],
  },
  {
    slug: 'circulation-pump-heating', name: 'مضخة تدوير لأنظمة التدفئة', cat: 'projects', type: 'مضخة', brand: 'hydrotec', origin: 'de',
    art: { kind: 'pump', material: 'steel', variant: 1 },
    summary: 'مضخة تدوير هادئة لدوائر التدفئة المركزية.',
    attrs: { capacity: '0.5 حصان', usage: 'التدفئة' },
    details: [{ label: 'الجهد', value: '220 فولت' }, { label: 'درجة حرارة السائل', value: 'حتى 110°م' }],
    kw: ['circulation pump'],
  },
  {
    slug: 'poly-water-tank-1000l', name: 'خزان مياه بولي إيثيلين 1000 لتر', cat: 'projects', type: 'خزان', brand: 'maidan', origin: 'jo',
    art: { kind: 'tank', material: 'black' },
    summary: 'خزان أسطواني بطبقات مقاومة للأشعة فوق البنفسجية لتخزين مياه الشرب.',
    attrs: { capacity: '1000 لتر', usage: 'تخزين المياه' },
    details: [{ label: 'المادة', value: 'بولي إيثيلين بثلاث طبقات' }, { label: 'الارتفاع', value: '1.35 م' }],
    kw: ['tank', 'water tank'],
  },
  {
    slug: 'poly-water-tank-5000l', name: 'خزان مياه بولي إيثيلين 5000 لتر', cat: 'projects', type: 'خزان', brand: 'maidan', origin: 'jo', av: 'limited',
    art: { kind: 'tank', material: 'black', variant: 1 },
    summary: 'خزان كبير للمباني والمشاريع بفتحة صيانة علوية.',
    attrs: { capacity: '5000 لتر', usage: 'تخزين المياه' },
    details: [{ label: 'المادة', value: 'بولي إيثيلين بثلاث طبقات' }, { label: 'الارتفاع', value: '2.05 م' }],
    kw: ['large tank'],
  },
  {
    slug: 'cast-iron-manhole-cover', name: 'غطاء فتحة تفتيش حديد زهر', cat: 'projects', type: 'غطاء تفتيش', brand: 'ferro', origin: 'cn',
    art: { kind: 'cover', material: 'iron' },
    summary: 'غطاء دائري بإطار للمناهل في الطرق والساحات.',
    attrs: { capacity: 'حمولة 25 طن', usage: 'الصرف الصحي' },
    details: [{ label: 'القطر', value: '60 سم' }, { label: 'المادة', value: 'حديد زهر رمادي' }],
    kw: ['manhole', 'cover'],
  },
  {
    slug: 'foam-pipe-insulation', name: 'عازل حراري إسفنجي للأنابيب', cat: 'projects', type: 'عزل', brand: 'zahra', origin: 'eg',
    art: { kind: 'pipe', material: 'foam', variant: 3 },
    summary: 'قشرة عزل مرنة مشقوقة طوليًا تقلل فقد الحرارة وتمنع التكثف.',
    attrs: { usage: ['التدفئة', 'التمديدات الداخلية'] },
    details: [{ label: 'السماكة', value: '13 مم' }, { label: 'الطول', value: '2 م' }],
    kw: ['insulation', 'foam'],
  },

  /* ───────────── الأدوات والملحقات ───────────── */
  {
    slug: 'pipe-wrench-14', name: 'مفتاح ماسورة حديد 14 إنش', cat: 'tools', type: 'مفتاح', brand: 'ferro', origin: 'de',
    art: { kind: 'wrench', material: 'steel' },
    summary: 'مفتاح ماسورة قابل للتعديل بفكّ مسنّن لتثبيت المواسير والوصلات.',
    attrs: { usage: 'تركيب وصيانة', material: 'فولاذ' },
    details: [{ label: 'الطول', value: '14 إنش' }, { label: 'أقصى فتحة', value: '48 مم' }],
    kw: ['wrench', 'stillson'],
  },
  {
    slug: 'ptfe-tape', name: 'شريط تفلون للتمديدات', cat: 'tools', type: 'شريط', brand: 'maidan', origin: 'cn',
    art: { kind: 'tape', material: 'white' },
    summary: 'شريط PTFE لإحكام القلاووظ ومنع التسرب.',
    attrs: { usage: 'إحكام الوصلات', material: 'PTFE' },
    details: [{ label: 'العرض', value: '12 مم' }, { label: 'الطول', value: '12 م' }],
    kw: ['ptfe', 'teflon tape'],
  },
  {
    slug: 'pvc-solvent-cement', name: 'غراء PVC (لاصق مذيب) 250 مل', cat: 'tools', type: 'لاصق', brand: 'mirage', origin: 'es',
    art: { kind: 'can', material: 'steel' },
    summary: 'لاصق مذيب لوصلات PVC وCPVC بتصلّب سريع.',
    attrs: { usage: 'لحام PVC', material: 'مذيب' },
    details: [{ label: 'الحجم', value: '250 مل' }, { label: 'التصلب', value: 'أولي 2 دقيقة' }],
    kw: ['glue', 'cement', 'adhesive'],
  },
  {
    slug: 'pipe-sealant-paste', name: 'معجون إحكام للوصلات القلاووظ', cat: 'tools', type: 'لاصق', brand: 'hydrotec', origin: 'de',
    art: { kind: 'can', material: 'white', variant: 1 },
    summary: 'معجون يمنع التسرب في وصلات المعدن والبلاستيك ويبقى قابلاً للفك.',
    attrs: { usage: 'إحكام الوصلات', material: 'معجون' },
    details: [{ label: 'الحجم', value: '400 غ' }, { label: 'الحرارة', value: 'حتى 130°م' }],
    kw: ['sealant', 'paste'],
  },
  {
    slug: 'pipe-clamp-rubber', name: 'حامل أنبوب بمطاط (كلبس)', cat: 'tools', type: 'حامل', brand: 'terraflow', origin: 'cn',
    art: { kind: 'clip', material: 'steel' },
    summary: 'حامل معدني ببطانة مطاط لتثبيت الأنابيب على الجدران والأسقف.',
    attrs: { usage: 'تثبيت', material: 'فولاذ مجلفن' },
    details: [{ label: 'المقاسات', value: '1/2 – 4 إنش' }, { label: 'البطانة', value: 'EPDM' }],
    kw: ['clamp', 'clip', 'hanger'],
  },
]

export const products: Product[] = seeds.map((s, i) => ({
  id: `p${String(i + 1).padStart(3, '0')}`,
  slug: s.slug,
  name: s.name,
  categoryId: s.cat,
  type: s.type,
  brandId: s.brand,
  originId: s.origin,
  availability: s.av ?? 'in_stock',
  art: s.art,
  image: catalogProductImage(s.slug),
  summary: s.summary,
  attributes: s.attrs,
  details: s.details ?? [],
  keywords: s.kw,
}))
