import type { Material } from '../../data/types'

/** Mix a hex colour towards another by t (0–1). */
export function mix(hex: string, target: string, t: number): string {
  const p = (h: string) => {
    const s = h.replace('#', '')
    return [0, 2, 4].map((i) => parseInt(s.slice(i, i + 2), 16))
  }
  const a = p(hex)
  const b = p(target)
  const out = a.map((v, i) => Math.round(v + (b[i] - v) * t))
  return '#' + out.map((v) => v.toString(16).padStart(2, '0')).join('')
}

interface MaterialDef {
  base: string
  accent?: string
  metal?: boolean
}

/** Colour language of the catalog imagery — muted, studio-lit, one family per material. */
export const MATERIALS: Record<Material, MaterialDef> = {
  pvc: { base: '#c3c7c2' },
  ppr: { base: '#6f9a78', accent: '#f1f1ec' },
  hdpe: { base: '#2e3033', accent: '#3f77b5' },
  gi: { base: '#a8b0b5', metal: true },
  pex: { base: '#e8e4d9', accent: '#b6503f' },
  brass: { base: '#b48a4a', metal: true },
  chrome: { base: '#c8ccd0', metal: true },
  ceramic: { base: '#f5f4f0' },
  black: { base: '#2a2c2e' },
  steel: { base: '#8a949c', metal: true, accent: '#2f5d86' },
  foam: { base: '#292a2b' },
  iron: { base: '#4b4d50' },
  white: { base: '#eceae4' },
  blackchrome: { base: '#27292b', metal: true },
}

/** 5-step shading ramp: edge shadow → base → highlight. */
export function ramp(material: Material): string[] {
  const { base, metal } = MATERIALS[material]
  return metal
    ? [mix(base, '#000000', 0.58), mix(base, '#000000', 0.26), base, mix(base, '#ffffff', 0.5), mix(base, '#ffffff', 0.86)]
    : [mix(base, '#000000', 0.42), mix(base, '#000000', 0.17), base, mix(base, '#ffffff', 0.26), mix(base, '#ffffff', 0.55)]
}

export const accentOf = (material: Material) => MATERIALS[material].accent ?? mix(MATERIALS[material].base, '#000000', 0.3)

/** Build a shading ramp from any hex (used for accents such as red handles or blue motors). */
export function rampFromHex(hex: string, metal = false): string[] {
  return metal
    ? [mix(hex, '#000000', 0.58), mix(hex, '#000000', 0.26), hex, mix(hex, '#ffffff', 0.5), mix(hex, '#ffffff', 0.86)]
    : [mix(hex, '#000000', 0.42), mix(hex, '#000000', 0.17), hex, mix(hex, '#ffffff', 0.26), mix(hex, '#ffffff', 0.55)]
}
