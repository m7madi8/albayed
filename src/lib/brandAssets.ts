/** Approved brand files under /public/brand */
export const BRAND_LOGO_FULL = '/brand/logo-black.png'
export const BRAND_LOGO_ON_DARK = '/brand/logo-on-dark.png'
/** Ivory mark — used on photographic heroes */
export const BRAND_LOGO_HERO = '/brand/logo-on-dark.png'

/** Default hero — master 3840px wide */
export const BRAND_HERO_IMAGE = '/brand/hero-4k.jpg'
export const BRAND_HERO_IMAGE_FALLBACK = '/brand/hero-2k.jpg'
export const BRAND_HERO_WIDTH = 3840
export const BRAND_HERO_HEIGHT = 1534
export const BRAND_HERO_FALLBACK_WIDTH = 2048

/** Pipes section (warehouse) */
export const PIPES_HERO_IMAGE = '/brand/hero-pipes-4k.jpg'
export const PIPES_HERO_IMAGE_FALLBACK = '/brand/hero-pipes-2k.jpg'
export const PIPES_HERO_WIDTH = 3840
export const PIPES_HERO_HEIGHT = 2149
export const PIPES_HERO_FALLBACK_WIDTH = 2048

/** Brass section (warehouse) */
export const BRASS_HERO_IMAGE = '/brand/hero-brass-4k.jpg'
export const BRASS_HERO_IMAGE_FALLBACK = '/brand/hero-brass-2k.jpg'
export const BRASS_HERO_WIDTH = 3840
export const BRASS_HERO_HEIGHT = 2550
export const BRASS_HERO_FALLBACK_WIDTH = 2048

export type HeroBackground = 'default' | 'pipes' | 'brass'

export interface HeroArtwork {
  src: string
  fallback: string
  width: number
  height: number
  fallbackWidth: number
}

/** Primary site hero — `/brand/hero-4k.jpg` (single background for home + sales overview). */
export const SITE_HERO_ART: HeroArtwork = {
  src: BRAND_HERO_IMAGE,
  fallback: BRAND_HERO_IMAGE_FALLBACK,
  width: BRAND_HERO_WIDTH,
  height: BRAND_HERO_HEIGHT,
  fallbackWidth: BRAND_HERO_FALLBACK_WIDTH,
}

export const HERO_ARTWORK: Record<HeroBackground, HeroArtwork> = {
  default: SITE_HERO_ART,
  pipes: {
    src: PIPES_HERO_IMAGE,
    fallback: PIPES_HERO_IMAGE_FALLBACK,
    width: PIPES_HERO_WIDTH,
    height: PIPES_HERO_HEIGHT,
    fallbackWidth: PIPES_HERO_FALLBACK_WIDTH,
  },
  brass: {
    src: BRASS_HERO_IMAGE,
    fallback: BRASS_HERO_IMAGE_FALLBACK,
    width: BRASS_HERO_WIDTH,
    height: BRASS_HERO_HEIGHT,
    fallbackWidth: BRASS_HERO_FALLBACK_WIDTH,
  },
}

export function heroBackgroundForSection(sectionId: string): HeroBackground {
  if (sectionId === 'pipes') return 'pipes'
  if (sectionId === 'brass') return 'brass'
  return 'default'
}
