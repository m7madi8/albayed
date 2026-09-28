import { ramp } from './palette'
import { Face, Grad, Seam, ThreadsH, Tube, type DrawProps } from './primitives'

const mark = (text: string | undefined, x: number, y: number, c: string) =>
  text ? (
    <text x={x} y={y} fontSize={10.5} fontWeight={500} fill={c} opacity={0.6} style={{ direction: 'ltr' }} fontFamily="inherit">
      {text}
    </text>
  ) : null

/* ── straight pipe: single, stack of three, pair, or foam insulation ── */
export function Pipe({ r, a, spec }: DrawProps) {
  const v = spec.variant ?? 0
  const stripe = spec.material === 'hdpe' || spec.material === 'pex'

  const one = (y: number, x0: number, len: number, w: number, key: string, label?: string, hole = 0.62, slit = false) => {
    const x1 = x0 + len
    const rx = w * 0.2
    return (
      <g key={key}>
        <Tube d={`M${x0} ${y}H${x1}`} w={w} c={r} />
        {stripe && <path d={`M${x0} ${y - w * 0.14}H${x1}`} stroke={a} strokeWidth={3} opacity={0.9} />}
        {slit && <path d={`M${x0} ${y - w * 0.3}H${x1}`} stroke={r[0]} strokeWidth={2} opacity={0.7} />}
        <Face cx={x1} cy={y} rx={rx} ry={w / 2} r={r} hole={hole} />
        {label && mark(label, x0 + len * 0.16, y + 3.5, r[0])}
      </g>
    )
  }

  if (v === 1)
    return (
      <g>
        {one(96, 64, 236, 46, 'a')}
        {one(148, 40, 276, 46, 'b', spec.mark)}
        {one(200, 84, 224, 46, 'c')}
      </g>
    )
  if (v === 2)
    return (
      <g transform="rotate(-6 200 150)">
        {one(118, 56, 262, 58, 'a')}
        {one(184, 86, 236, 58, 'b', spec.mark)}
        {spec.material === 'ppr' && <path d={`M150 ${184 - 29}v58`} stroke="#f1f1ec" strokeWidth={4} opacity={0.75} />}
      </g>
    )
  if (v === 3)
    return (
      <g transform="rotate(-8 200 150)">
        {one(112, 50, 250, 84, 'a', undefined, 0.72, true)}
        {one(196, 88, 232, 84, 'b', undefined, 0.72, true)}
      </g>
    )
  return <g transform="rotate(-9 200 150)">{one(150, 44, 268, 68, 'a', spec.mark, 0.6)}</g>
}

/* ── coil of flexible pipe (HDPE / PEX) ── */
export function Coil({ r, a, spec }: DrawProps) {
  const rings: [number, number, number][] = [[124, 66, 24], [88, 47, 22], [54, 30, 20]]
  const tiers = [3, 2, 1, 0]
  const stripe = spec.material === 'hdpe' || spec.material === 'pex'
  const ell = (cx: number, cy: number, rx: number, ry: number) =>
    `M${cx - rx} ${cy}a${rx} ${ry} 0 1 0 ${rx * 2} 0a${rx} ${ry} 0 1 0 ${-rx * 2} 0`
  return (
    <g>
      {tiers.map((t) => {
        const cy = 118 + t * 15
        return (
          <g key={t}>
            {rings.map(([rx, ry, w], i) => (
              <g key={i}>
                <Tube d={ell(200, cy, rx, ry)} w={w} c={r} />
                {stripe && t === 0 && (
                  <path d={ell(200, cy - w * 0.22, rx, ry)} stroke={a} strokeWidth={2.6} fill="none" opacity={0.9} />
                )}
              </g>
            ))}
          </g>
        )
      })}
      <ellipse cx={200} cy={118} rx={40} ry={16} fill="#191a18" />
      <ellipse cx={196} cy={116} rx={30} ry={11} fill="#0d0d0c" />
      {/* binding strap */}
      <rect x={300} y={118} width={9} height={50} rx={2} fill={a} opacity={0.9} transform="rotate(-8 304 140)" />
    </g>
  )
}

/* ── 90° elbow ── */
export function Elbow({ r, spec }: DrawProps) {
  const w = 54
  const threaded = spec.material === 'brass'
  return (
    <g>
      <Tube d="M64 208H190A72 72 0 0 0 262 136V58" w={w} c={r} />
      <Tube d="M64 208H108" w={w + 14} c={r} />
      <Tube d="M262 58V102" w={w + 14} c={r} />
      <Seam x1={108} y1={208 - (w + 14) / 2} x2={108} y2={208 + (w + 14) / 2} c={r[0]} />
      <Seam x1={262 - (w + 14) / 2} y1={102} x2={262 + (w + 14) / 2} y2={102} c={r[0]} />
      {threaded && (
        <>
          <ThreadsH x={64} y={208} len={44} w={w + 14} c={r[0]} n={5} />
          <g stroke={r[0]} strokeWidth={1.7} opacity={0.42} strokeLinecap="round">
            {[0, 1, 2, 3, 4].map((i) => (
              <path key={i} d={`M${262 - w / 2 - 4} ${58 + 5 + i * 8.6}h${w + 8}`} />
            ))}
          </g>
        </>
      )}
    </g>
  )
}

/* ── 45° elbow ── */
export function Elbow45({ r }: DrawProps) {
  const w = 54
  const n = 0.7071
  const p = { x: 247.7, y: 150.3 }
  const half = (w + 14) / 2
  return (
    <g>
      <Tube d="M56 212H150Q190 212 216 186L282 120" w={w} c={r} />
      <Tube d="M56 212H100" w={w + 14} c={r} />
      <Tube d={`M${p.x} ${p.y}L284 118`} w={w + 14} c={r} />
      <Seam x1={100} y1={212 - half} x2={100} y2={212 + half} c={r[0]} />
      <Seam x1={p.x - n * half} y1={p.y - n * half} x2={p.x + n * half} y2={p.y + n * half} c={r[0]} />
    </g>
  )
}

/* ── equal tee ── */
export function Tee({ r, spec }: DrawProps) {
  const w = 54
  const half = (w + 14) / 2
  const threaded = spec.material === 'brass'
  return (
    <g>
      <Tube d="M46 196H354" w={w} c={r} />
      <Tube d="M200 176V52" w={w} c={r} />
      <path d="M173 172Q200 194 227 172" stroke={r[0]} strokeWidth={1.6} opacity={0.4} fill="none" />
      <Tube d="M46 196H92" w={w + 14} c={r} />
      <Tube d="M308 196H354" w={w + 14} c={r} />
      <Tube d="M200 52V96" w={w + 14} c={r} />
      <Seam x1={92} y1={196 - half} x2={92} y2={196 + half} c={r[0]} />
      <Seam x1={308} y1={196 - half} x2={308} y2={196 + half} c={r[0]} />
      <Seam x1={200 - half} y1={96} x2={200 + half} y2={96} c={r[0]} />
      {threaded && (
        <>
          <ThreadsH x={46} y={196} len={46} w={w + 14} c={r[0]} n={5} />
          <ThreadsH x={308} y={196} len={46} w={w + 14} c={r[0]} n={5} />
        </>
      )}
    </g>
  )
}

/* ── straight coupling / compression fitting / adapter ── */
export function Coupling({ r, spec }: DrawProps) {
  const v = spec.variant ?? 0
  if (v === 1)
    return (
      <g>
        <Tube d="M60 150H340" w={56} c={r} />
        <Tube d="M92 150H150" w={84} c={r} />
        <Tube d="M250 150H308" w={84} c={r} />
        {[104, 118, 132, 262, 276, 290].map((x) => (
          <Seam key={x} x1={x} y1={112} x2={x} y2={188} c={r[0]} o={0.35} sw={1.6} />
        ))}
        <Seam x1={150} y1={108} x2={150} y2={192} c={r[0]} />
        <Seam x1={250} y1={108} x2={250} y2={192} c={r[0]} />
        <Tube d="M196 150H204" w={62} c={r} />
      </g>
    )
  if (v === 2) {
    const br = ramp('brass')
    return (
      <g>
        <Tube d="M60 150H200" w={70} c={r} />
        <Seam x1={104} y1={115} x2={104} y2={185} c={r[0]} />
        <Tube d="M196 150H340" w={50} c={br} />
        <Tube d="M196 150H230" w={80} c={br} />
        <Seam x1={230} y1={110} x2={230} y2={190} c={br[0]} />
        <ThreadsH x={236} y={150} len={104} w={50} c={br[0]} n={9} />
      </g>
    )
  }
  return (
    <g>
      <Tube d="M92 150H308" w={80} c={r} />
      <Tube d="M178 150H222" w={94} c={r} />
      <Seam x1={124} y1={110} x2={124} y2={190} c={r[0]} />
      <Seam x1={276} y1={110} x2={276} y2={190} c={r[0]} />
      <Seam x1={178} y1={103} x2={178} y2={197} c={r[0]} o={0.4} />
      <Seam x1={222} y1={103} x2={222} y2={197} c={r[0]} o={0.4} />
    </g>
  )
}

/* ── reducer ── */
export function Reducer({ r, id }: DrawProps) {
  const gid = `${id}-red`
  return (
    <g>
      <defs>
        <Grad id={gid} x2={0} y2={1} stops={[[0, r[0]], [0.16, r[1]], [0.34, r[3]], [0.55, r[2]], [1, r[0]]]} />
      </defs>
      <polygon points="140,106 268,122 268,178 140,194" fill={`url(#${gid})`} />
      <Tube d="M52 150H144" w={88} c={r} />
      <Tube d="M264 150H348" w={56} c={r} />
      <Seam x1={96} y1={104} x2={96} y2={196} c={r[0]} />
      <Seam x1={306} y1={120} x2={306} y2={180} c={r[0]} />
    </g>
  )
}

/* ── end cap ── */
export function Cap({ r, id }: DrawProps) {
  const gid = `${id}-dome`
  return (
    <g>
      <defs>
        <radialGradient id={gid} cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor={r[4]} />
          <stop offset="0.45" stopColor={r[2]} />
          <stop offset="1" stopColor={r[0]} />
        </radialGradient>
      </defs>
      <Tube d="M86 150H250" w={84} c={r} />
      <ellipse cx={252} cy={150} rx={40} ry={42} fill={`url(#${gid})`} />
      <Seam x1={128} y1={108} x2={128} y2={192} c={r[0]} />
      <Seam x1={210} y1={108} x2={210} y2={192} c={r[0]} o={0.3} />
    </g>
  )
}

/* ── double nipple (threaded ends, hex centre) ── */
export function Nipple({ r }: DrawProps) {
  return (
    <g>
      <Tube d="M56 150H344" w={44} c={r} />
      <ThreadsH x={56} y={150} len={90} w={44} c={r[0]} n={9} />
      <ThreadsH x={254} y={150} len={90} w={44} c={r[0]} n={9} />
      <Tube d="M146 150H254" w={74} c={r} />
      <Seam x1={146} y1={113} x2={146} y2={187} c={r[0]} />
      <Seam x1={254} y1={113} x2={254} y2={187} c={r[0]} />
      <Seam x1={146} y1={131} x2={254} y2={131} c={r[0]} o={0.35} sw={1.5} />
      <Seam x1={146} y1={169} x2={254} y2={169} c={r[0]} o={0.35} sw={1.5} />
    </g>
  )
}

