/** Normalise Arabic / Latin text so search ignores diacritics, hamza forms and digit styles. */
const DIACRITICS = /[\u064B-\u065F\u0670\u0640]/g
const ARABIC_DIGITS = /[\u0660-\u0669]/g

export function normalize(input: string): string {
  return input
    .toLowerCase()
    .replace(DIACRITICS, '')
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/ؤ/g, 'و')
    .replace(/ئ/g, 'ي')
    .replace(ARABIC_DIGITS, (d) => String(d.charCodeAt(0) - 0x0660))
    .replace(/[°"'’“”]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

export const collator = new Intl.Collator('ar', { numeric: true, sensitivity: 'base' })
