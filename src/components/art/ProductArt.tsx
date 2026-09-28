import { useId, type ComponentType } from 'react'
import type { ArtKind, ArtSpec } from '../../data/types'
import { accentOf, ramp } from './palette'
import type { DrawProps } from './primitives'
import { Cap, Coil, Coupling, Elbow, Elbow45, Nipple, Pipe, Reducer, Tee } from './kindsPipes'
import { BallValve, CheckValve, GateValve, Manifold, Strainer } from './kindsValves'
import { Basin, Can, Clip, Cover, Mixer, Pump, Shower, Tank, Tape, Toilet, Wrench } from './kindsOther'

interface KindDef {
  Draw: ComponentType<DrawProps>
  /** focal point used by the close-up view */
  focus: [number, number]
}

const KINDS: Record<ArtKind, KindDef> = {
  pipe: { Draw: Pipe, focus: [290, 140] },
  coil: { Draw: Coil, focus: [200, 150] },
  elbow: { Draw: Elbow, focus: [225, 150] },
  elbow45: { Draw: Elbow45, focus: [190, 175] },
  tee: { Draw: Tee, focus: [200, 150] },
  coupling: { Draw: Coupling, focus: [200, 150] },
  reducer: { Draw: Reducer, focus: [200, 150] },
  cap: { Draw: Cap, focus: [230, 150] },
  nipple: { Draw: Nipple, focus: [200, 150] },
  ballValve: { Draw: BallValve, focus: [200, 130] },
  gateValve: { Draw: GateValve, focus: [200, 130] },
  checkValve: { Draw: CheckValve, focus: [200, 140] },
  strainer: { Draw: Strainer, focus: [225, 160] },
  manifold: { Draw: Manifold, focus: [200, 130] },
  mixer: { Draw: Mixer, focus: [225, 130] },
  shower: { Draw: Shower, focus: [190, 110] },
  basin: { Draw: Basin, focus: [200, 140] },
  toilet: { Draw: Toilet, focus: [190, 150] },
  pump: { Draw: Pump, focus: [230, 160] },
  tank: { Draw: Tank, focus: [200, 130] },
  cover: { Draw: Cover, focus: [200, 155] },
  wrench: { Draw: Wrench, focus: [280, 150] },
  tape: { Draw: Tape, focus: [200, 160] },
  can: { Draw: Can, focus: [200, 150] },
  clip: { Draw: Clip, focus: [200, 150] },
}

export type ArtView = 'main' | 'detail' | 'blueprint'

interface Props {
  spec: ArtSpec
  view?: ArtView
  label?: string
  alt?: string
  className?: string
  /** draw the soft floor shadow (off when nesting inside a composition) */
  shadow?: boolean
}

/**
 * Vector product imagery: a coherent, studio-lit visual language for the demo.
 * In production, swap for <img src={product.image}> — see ProductImage.
 */
export default function ProductArt({ spec, view = 'main', label, alt, className, shadow = true }: Props) {
  const id = 'a' + useId().replace(/[^a-zA-Z0-9]/g, '')
  const { Draw, focus } = KINDS[spec.kind]
  const r = ramp(spec.material)
  const a = accentOf(spec.material)

  const viewBox =
    view === 'detail' ? `${focus[0] - 95} ${focus[1] - 71} 190 142` : view === 'blueprint' ? '0 0 400 300' : '28 36 344 228'

  return (
    <svg
      viewBox={viewBox}
      className={className}
      role={alt ? 'img' : undefined}
      aria-label={alt}
      aria-hidden={alt ? undefined : true}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <radialGradient id={`${id}-sh`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#000" stopOpacity="0.2" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>
      {view === 'blueprint' && <Blueprint label={label} />}
      <g style={view === 'blueprint' ? { filter: 'grayscale(1) contrast(0.9)', opacity: 0.55 } : undefined} transform={view === 'blueprint' ? 'translate(40 26) scale(0.8)' : undefined}>
        {shadow && view !== 'blueprint' && <ellipse cx={200} cy={252} rx={150} ry={13} fill={`url(#${id}-sh)`} />}
        <Draw r={r} a={a} spec={spec} id={id} />
      </g>
    </svg>
  )
}

function Blueprint({ label }: { label?: string }) {
  return (
    <g>
      <defs>
        <pattern id="bp-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" stroke="#151614" strokeOpacity="0.07" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="400" height="300" fill="url(#bp-grid)" />
      <g stroke="#8b7355" strokeWidth="1.2" fill="none" strokeLinecap="round">
        <path d="M40 274H360M40 268v12M360 268v12" />
        <path d="M22 40V250M16 40h12M16 250h12" />
      </g>
      {label && (
        <g>
          <rect x="166" y="262" width="68" height="24" rx="12" fill="#f7f7f4" />
          <text x="200" y="278" textAnchor="middle" fontSize="12" fill="#8b7355" fontWeight="500" fontFamily="inherit">
            {label}
          </text>
        </g>
      )}
    </g>
  )
}

/** Composition of several arts at large scale, used by category heroes and tiles. */
export function ArtComposition({ items, className, fit = 'cover' }: {
  items: { spec: ArtSpec; x: number; y: number; size: number }[]
  className?: string
  /** 'cover' crops to fill (use only when the container's aspect ratio matches the 900x520 viewBox).
   *  'contain' always shows every item, letterboxing instead of cropping — safe for arbitrary card shapes. */
  fit?: 'cover' | 'contain'
}) {
  return (
    <svg viewBox="0 0 900 520" className={className} aria-hidden="true" preserveAspectRatio={fit === 'cover' ? 'xMidYMid slice' : 'xMidYMid meet'}>
      {items.map((it, i) => (
        <svg key={i} x={it.x} y={it.y} width={it.size} height={(it.size * 3) / 4} viewBox="0 0 400 300" overflow="visible">
          <ProductArtInner spec={it.spec} />
        </svg>
      ))}
    </svg>
  )
}

function ProductArtInner({ spec }: { spec: ArtSpec }) {
  const id = 'c' + useId().replace(/[^a-zA-Z0-9]/g, '')
  const { Draw } = KINDS[spec.kind]
  return (
    <g>
      <defs>
        <radialGradient id={`${id}-sh`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#000" stopOpacity="0.2" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx={200} cy={252} rx={150} ry={13} fill={`url(#${id}-sh)`} />
      <Draw r={ramp(spec.material)} a={accentOf(spec.material)} spec={spec} id={id} />
    </g>
  )
}
