# Al-Bayed homepage — "الممر" (The Aisle)

## Apply (≈10 min)

1. Copy `src/` over the project (7 component files, `pages/Home.tsx`, `styles/home.css`).
2. In `src/index.css`, right after `@import './styles/tokens.css';` add:
   `@import './styles/home.css';`
3. Figures font (optional but intended): `npm i @fontsource/ibm-plex-mono`, then in `main.tsx`
   `import '@fontsource/ibm-plex-mono/400.css'` and `/500.css`. Without it the stack falls back to `ui-monospace`.
4. Delete the old home-only CSS from `index.css` (grep first — they should have no other users):
   `.home-catalog-*`, `.home-category-*`, `.home-category-grid--editorial`, `.home-brand-tile`, `.home-contact-cta`.
   **Keep `.brand-hero*`**: `BrandHero` is still used by category pages (`size="section"`).
5. `npx tsc --noEmit` and check 390 / 768 / 1024 / 1440.

I could not build against your repo (not available here); files were syntax-checked only.
Assumed shapes: `brands[].{id,name,latin,originId}`, `originMap.get(id)?.name`, `categories[].{id,slug,name,tagline}`,
`trustPillars[].{label,description}`, `HERO_ARTWORK.{pipes,default,brass}` with `src/fallback/width/height/fallbackWidth`.

## Concept
The company's own line — من المستودع إلى موقع المشروع — is the structure. Real warehouse photography is the plate;
the finished showroom is mounted across the seam. Catalog = index of aisles. Brands = grouped by origin.
Figures/labels borrow warehouse location-tag voice (IBM Plex Mono digits, numbered bays).

## Narrative
01 Hero (aisle + showroom inset) → 02 Ledger strip (all figures derived from data) → 03 Aisle index
(list + sticky plate, replaces 5 cards) → 04 Sources by origin (replaces 12 tiles) → 05 Showroom statement +
numbered pillars (replaces 4 stat tiles) → 06 Closing on graphite with brass-shelf macro.

## Rules kept
Ivory/graphite/copper only · no gradients (one functional header scrim already exists) · no glass · no bento ·
Arabic never letter-spaced · reduced-motion honoured · 44px targets · no new JS dependency.

## Open items for you
- No founding year / client list / branch count in the data, so heritage is carried by sourcing + scale.
  Add real ones to `LedgerStrip` when confirmed — don't invent.
- Only 3 distinct photos exist (warehouse, brass shelves, bathroom). 5 categories reuse them; new photography per category
  (or macro shots of fittings) is the single biggest remaining upgrade.
- Header component wasn't provided: only its over-photo icon-button state is restyled here.
