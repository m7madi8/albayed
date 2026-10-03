# Al-Bayed Design Spec v2

مرجع Master Design Prompt (الموسّع) — Premium Industrial · Modern B2B · Quiet Luxury · Swiss Editorial.

## North Star (§4.1)

«البايض ليست متجراً؛ هي مرجع السوق.» حضور فلسطيني عبر النبرة والدقة والتنظيم — بلا رمزية وطنية مباشرة، بلا ادعاءات تفوق غير **+5,000 منتج** الموثّق.

## Principles

| Rule | Implementation |
|------|----------------|
| Copper ≤ 3% viewport | Primary CTA واحد؛ `--accent-ink` للنص والروابط |
| لا أزرار معطّلة كـ CTA رئيسي | ProductCard / PDP تفتح شريط العميل أو rep mode |
| Availability | Pill فقط `limited` / `out_of_stock`؛ `in_stock` = نقطة muted |
| فلاتر count=0 | مخفية ما لم تكن نشطة (CountryFilter, FilterRail) |
| زائر vs مندوب | `CatalogClientBar` + rep mode؛ زائر = PDP فقط |
| RTL + SKU LTR | `.type-sku`, Monadi / Plex roles |

## Token map (§6.1–6.4)

| Token | Role |
|-------|------|
| `--surface-sunken`, `--surface-raised` | Stages, cards |
| `--ink-strong/body/muted/faint` | Hierarchy |
| `--line-hair/strong` | Borders |
| `--accent-ink` | Eyebrows, links (= `--accent-text`) |
| `--graphite-panel` | Contact CTA, hero scrim |
| `--fs-display-xl` | Hero title clamp |
| `--duration-fast/slow` | 160ms / 480ms |
| `src/styles/tokens.css` | Supplemental import (main `:root` in `index.css`) |

Global `prefers-reduced-motion: reduce` in `@layer base` + component overrides.

## Photography audit (§8.2)

| Check | Action |
|-------|--------|
| `public/` product paths | QA يدوي: استبدال أي asset بعلامة مائية |
| Stage | `catalog-stage--ratio` 4:3, `--surface-sunken`, `object-contain`, optional multiply |
| Vector fallback | `ProductArt` when `image` fails |

لا مسارات SIGNAST في repo — قائمة استبدال تُحدَّث عند رفع صور حقيقية.

## Microcopy samples (§10)

1. من المستودع إلى موقع المشروع.
2. تصفّح الكتالوج
3. اطلب زيارة
4. الكتالوج › {category}
5. أضف إلى الطلب
6. حدّد العميل
7. ● متوفر
8. مسح كل الفلاتر
9. لا توجد منتجات مطابقة
10. المواصفات التفصيلية
11. ورقة البيانات
12. مراجعة العرض
13. يحتاج إجراء الآن
14. فتح الكتالوج
15. عميل جديد
16. اتصال / واتساب
17. بدء طلبية لهذا العميل
18. بحث المنتجات (Ctrl+K)
19. العلامات · من نحن · تواصل
20. توزيع في الضفة (خريطة مبسّطة — بدون أعلام)

## Motion (§8.8)

- Marketing: hero parallax ≤24px (off when reduced motion)
- Catalog grid: opacity crossfade on `resultsKey` (C #3)
- Sales OS: instant panels
- Framer presets in `motionPresets.ts`

## Checklist §13

- [x] §3 diagnosis: client bar, cards, filters, tabs, contrast eyebrows
- [x] Tokens §6 in CSS
- [x] PDP gallery / grouped specs / optional datasheet
- [x] Visit stepper + 56px thumbs
- [x] Home: hero, brands static, editorial categories, map, graphite contact
- [x] Header public nav + home transparent
- [x] Universal search ↑↓ Enter
- [x] Customer profile tabs + tel/whatsapp
- [x] `npm run build` + `npm run lint`

## Quality gate §14 (target ≥8.5)

| Dimension | Score | Notes |
|-----------|-------|-------|
| Visual | 8.6 | Ink hierarchy, instrument cards, graphite contact |
| UX | 8.6 | No disabled catalog CTAs; rep gating |
| Brand | 8.5 | Quiet luxury; verified stats only |
| A11y | 8.5 | Reduced motion, focus rings, tabular nums |
| Performance | 8.5 | Lazy images, static catalog shell |

Build: `npm run build` · Lint: `npm run lint`
