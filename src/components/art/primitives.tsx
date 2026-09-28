import type { ReactNode } from 'react'
import type { ArtSpec } from '../../data/types'

export interface DrawProps {
  /** shading ramp of the primary material (edge → highlight) */
  r: string[]
  /** accent colour (stripes, handles, motors) */
  a: string
  spec: ArtSpec
  /** unique id prefix for gradients inside this SVG */
  id: string
}

/** width fraction + ramp index for each stacked stroke that fakes cylinder shading */
const LAYERS: [number, number][] = [
  [1, 0], [0.9, 1], [0.68, 2], [0.44, 3], [0.17, 4],
]

/**
 * A shaded tube along any path. Stacked strokes of decreasing width and
 * increasing brightness, nudged towards the light, give a soft studio-lit
 * cylinder that works on straight runs, elbows and coils alike.
 */
export function Tube({
  d, w, c, cap = 'butt',
}: { d: string; w: number; c: string[]; cap?: 'butt' | 'round' }) {
  return (
    <g fill="none" strokeLinecap={cap} strokeLinejoin="round">
      {LAYERS.map(([f, ci], i) => {
        const s = w * 0.05 * i
        return (
          <path
            key={i}
            d={d}
            stroke={c[ci]}
            strokeWidth={w * f}
            transform={i ? `translate(${-s * 0.6} ${-s})` : undefined}
          />
        )
      })}
    </g>
  )
}

/** Thin dark line across a tube — the visible seam of a socket, nut or flange. */
export function Seam({ x1, y1, x2, y2, c, o = 0.5, sw = 2 }: {
  x1: number; y1: number; x2: number; y2: number; c: string; o?: number; sw?: number
}) {
  return <path d={`M${x1} ${y1}L${x2} ${y2}`} stroke={c} strokeWidth={sw} opacity={o} strokeLinecap="round" />
}

/** Cross-ticks that read as a screw thread. */
export function ThreadsH({ x, y, len, w, c, n = 7 }: {
  x: number; y: number; len: number; w: number; c: string; n?: number
}) {
  const step = len / n
  return (
    <g stroke={c} strokeWidth={1.7} opacity={0.42} strokeLinecap="round">
      {Array.from({ length: n }).map((_, i) => (
        <path key={i} d={`M${x + step * i + step / 2} ${y - w / 2 + 3}v${w - 6}`} />
      ))}
    </g>
  )
}

export function ThreadsV({ x, y, len, w, c, n = 7 }: {
  x: number; y: number; len: number; w: number; c: string; n?: number
}) {
  const step = len / n
  return (
    <g stroke={c} strokeWidth={1.7} opacity={0.42} strokeLinecap="round">
      {Array.from({ length: n }).map((_, i) => (
        <path key={i} d={`M${x - w / 2 + 3} ${y + step * i + step / 2}h${w - 6}`} />
      ))}
    </g>
  )
}

/** Hollow end face of a pipe seen slightly from the side. */
export function Face({ cx, cy, rx, ry, r, hole = 0.62 }: {
  cx: number; cy: number; rx: number; ry: number; r: string[]; hole?: number
}) {
  return (
    <g>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={r[3]} stroke={r[1]} strokeWidth={1.2} />
      <ellipse cx={cx} cy={cy} rx={rx * hole} ry={ry * (hole + 0.08)} fill="#181917" />
      <ellipse cx={cx - rx * 0.12} cy={cy - ry * 0.08} rx={rx * hole * 0.6} ry={ry * (hole + 0.02) * 0.62} fill="#0d0d0c" />
    </g>
  )
}

export function Grad({ id, stops, x2 = 1, y2 = 0 }: {
  id: string; stops: [number, string][]; x2?: number; y2?: number
}): ReactNode {
  return (
    <linearGradient id={id} x1="0" y1="0" x2={x2} y2={y2}>
      {stops.map(([o, c], i) => (
        <stop key={i} offset={o} stopColor={c} />
      ))}
    </linearGradient>
  )
}
