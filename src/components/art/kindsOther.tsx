import { ramp, rampFromHex } from './palette'
import { Grad, Seam, Tube, type DrawProps } from './primitives'

const ell = (cx: number, cy: number, rx: number, ry: number) =>
  `M${cx - rx} ${cy}a${rx} ${ry} 0 1 0 ${rx * 2} 0a${rx} ${ry} 0 1 0 ${-rx * 2} 0`

/* ── mixer tap ── */
export function Mixer({ r, spec }: DrawProps) {
  const v = spec.variant ?? 0
  if (v === 1)
    return (
      <g>
        <Tube d="M196 250V172" w={58} c={r} />
        <Tube d="M196 250V232" w={84} c={r} />
        <Seam x1={154} y1={232} x2={238} y2={232} c={r[0]} o={0.4} />
        <Tube d="M196 176V128C196 96 262 94 264 128V138" w={30} c={r} cap="round" />
        <Tube d="M264 130V148" w={38} c={r} />
        <Seam x1={245} y1={148} x2={283} y2={148} c={r[0]} o={0.4} />
        <Tube d="M188 176L128 156" w={15} c={r} cap="round" />
      </g>
    )
  return (
    <g>
      <Tube d="M172 254V166" w={52} c={r} />
      <Tube d="M172 254V236" w={78} c={r} />
      <Seam x1={133} y1={236} x2={211} y2={236} c={r[0]} o={0.4} />
      <Tube d="M172 170V120C172 52 264 46 266 106V126" w={28} c={r} cap="round" />
      <Tube d="M266 118V138" w={38} c={r} />
      <Seam x1={247} y1={138} x2={285} y2={138} c={r[0]} o={0.4} />
      <Tube d="M198 190H262" w={14} c={r} cap="round" />
    </g>
  )
}

/* ── rain shower with wall mixer ── */
export function Shower({ r, id }: DrawProps) {
  const g = `${id}-shr`
  return (
    <g>
      <defs>
        <Grad id={g} stops={[[0, r[1]], [0.3, r[3]], [0.55, r[4]], [1, r[1]]]} />
      </defs>
      <Tube d="M354 176H224Q190 176 190 144V116" w={18} c={r} cap="round" />
      <ellipse cx={352} cy={176} rx={9} ry={26} fill={r[2]} stroke={r[1]} strokeWidth={1.2} />
      <path d="M94 84v11a96 28 0 0 0 192 0v-11z" fill={r[1]} />
      <ellipse cx={190} cy={84} rx={96} ry={28} fill={`url(#${g})`} stroke={r[1]} strokeWidth={1.2} />
      <ellipse cx={190} cy={84} rx={72} ry={19} fill="none" stroke={r[0]} strokeWidth={1.4} opacity={0.3} />
      <ellipse cx={190} cy={84} rx={10} ry={3} fill={r[2]} stroke={r[1]} strokeWidth={1} />
      <circle cx={300} cy={226} r={28} fill={r[2]} stroke={r[1]} strokeWidth={1.4} />
      <circle cx={300} cy={226} r={19} fill={r[3]} stroke={r[1]} strokeWidth={1} />
      <Tube d="M300 226L332 210" w={11} c={r} cap="round" />
    </g>
  )
}

/* ── basin: countertop / pedestal / wall-hung ── */
export function Basin({ r, id, spec }: DrawProps) {
  const v = spec.variant ?? 0
  const gh = `${id}-bh`
  const gi = `${id}-bi`
  const gr = `${id}-br`
  const br = ramp('chrome')
  const cy = v === 0 ? 138 : v === 1 ? 104 : 112
  const rx = v === 0 ? 128 : v === 1 ? 112 : 118
  const ry = v === 0 ? 58 : 48
  const th = v === 0 ? 30 : 24
  return (
    <g>
      <defs>
        <Grad id={gh} stops={[[0, r[0]], [0.14, r[1]], [0.4, r[4]], [0.72, r[2]], [1, r[0]]]} />
        <Grad id={gi} x2={0} y2={1} stops={[[0, r[0]], [0.35, r[1]], [1, r[4]]]} />
        <radialGradient id={gr} cx="0.4" cy="0.3" r="0.85">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor={r[3]} />
        </radialGradient>
      </defs>
      {v === 0 && (
        <g>
          <rect x={44} y={196} width={312} height={26} rx={4} fill="#dedbd2" />
          <rect x={44} y={196} width={312} height={7} rx={3} fill="#eceae3" />
          <ellipse cx={200} cy={232} rx={150} ry={8} fill="#000" opacity={0.08} />
        </g>
      )}
      {v === 1 && (
        <g>
          <path d="M166 146C170 188 166 220 156 250H244C234 220 230 188 234 146Z" fill={`url(#${gh})`} />
          <ellipse cx={200} cy={252} rx={48} ry={8} fill={r[1]} />
          <ellipse cx={200} cy={254} rx={90} ry={6} fill="#000" opacity={0.1} />
        </g>
      )}
      {v === 2 && (
        <g>
          <Tube d="M200 156V194" w={22} c={br} />
          <Tube d="M200 200H244V238" w={20} c={br} />
          <ellipse cx={244} cy={240} rx={12} ry={4} fill={br[1]} />
          <ellipse cx={200} cy={250} rx={110} ry={6} fill="#000" opacity={0.06} />
        </g>
      )}
      <path d={`M${200 - rx} ${cy}v${th}a${rx} ${ry} 0 0 0 ${rx * 2} 0v${-th}z`} fill={`url(#${gh})`} />
      <ellipse cx={200} cy={cy} rx={rx} ry={ry} fill={`url(#${gr})`} stroke={r[1]} strokeWidth={1.2} />
      <ellipse cx={200} cy={cy + 2} rx={rx - 26} ry={ry - 15} fill={`url(#${gi})`} />
      <ellipse cx={200} cy={cy + ry * 0.32} rx={14} ry={5.5} fill={br[3]} stroke={br[1]} strokeWidth={1.2} />
      <ellipse cx={200} cy={cy + ry * 0.32} rx={6} ry={2.4} fill="#1c1d1b" />
    </g>
  )
}

/* ── toilet ── */
export function Toilet({ r, id, spec }: DrawProps) {
  const v = spec.variant ?? 0
  const g = `${id}-tl`
  const gi = `${id}-ti`
  const br = ramp('chrome')
  return (
    <g>
      <defs>
        <Grad id={g} stops={[[0, r[1]], [0.22, r[4]], [0.6, r[3]], [1, r[1]]]} />
        <Grad id={gi} x2={0} y2={1} stops={[[0, r[0]], [0.4, r[1]], [1, r[3]]]} />
      </defs>
      {v === 0 ? (
        <g>
          <rect x={200} y={54} width={118} height={96} rx={12} fill={`url(#${g})`} stroke={r[1]} strokeWidth={1} />
          <rect x={194} y={50} width={130} height={16} rx={8} fill={r[4]} stroke={r[1]} strokeWidth={1} />
          <ellipse cx={258} cy={46} rx={15} ry={5} fill={br[3]} stroke={br[1]} strokeWidth={1} />
          <path d="M92 158C92 214 132 240 184 242C236 240 276 214 276 158Z" fill={`url(#${g})`} />
          <ellipse cx={184} cy={246} rx={78} ry={11} fill="#000" opacity={0.12} />
          <ellipse cx={184} cy={158} rx={96} ry={35} fill={r[4]} stroke={r[1]} strokeWidth={1.2} />
          <ellipse cx={184} cy={160} rx={70} ry={23} fill={`url(#${gi})`} />
        </g>
      ) : (
        <g>
          <rect x={296} y={26} width={64} height={244} fill="#dddad1" />
          <rect x={296} y={26} width={6} height={244} fill="#cfccc2" />
          <rect x={314} y={62} width={34} height={46} rx={7} fill={br[3]} stroke={br[1]} strokeWidth={1.2} />
          <line x1={322} y1={80} x2={340} y2={80} stroke={br[1]} strokeWidth={2} strokeLinecap="round" />
          <line x1={322} y1={92} x2={340} y2={92} stroke={br[1]} strokeWidth={2} strokeLinecap="round" />
          <path d="M96 138C96 194 138 214 190 216C236 214 276 198 288 158L288 138Z" fill={`url(#${g})`} />
          <ellipse cx={190} cy={244} rx={80} ry={8} fill="#000" opacity={0.06} />
          <ellipse cx={190} cy={138} rx={96} ry={35} fill={r[4]} stroke={r[1]} strokeWidth={1.2} />
          <ellipse cx={190} cy={140} rx={70} ry={23} fill={`url(#${gi})`} />
        </g>
      )}
    </g>
  )
}

/* ── pump: surface centrifugal (0) or heating circulator (1) ── */
export function Pump({ r, a, spec, id }: DrawProps) {
  const v = spec.variant ?? 0
  const blue = rampFromHex(a)
  const g = `${id}-pg`
  if (v === 1)
    return (
      <g>
        <Tube d="M100 196H300" w={56} c={r} />
        <Tube d="M92 196H112" w={92} c={r} />
        <Tube d="M288 196H308" w={92} c={r} />
        {[176, 216].map((y) => (
          <circle key={`l${y}`} cx={102} cy={y} r={4} fill={r[0]} opacity={0.7} />
        ))}
        {[176, 216].map((y) => (
          <circle key={`r${y}`} cx={298} cy={y} r={4} fill={r[0]} opacity={0.7} />
        ))}
        <Tube d="M200 158V78" w={78} c={blue} />
        <ellipse cx={200} cy={78} rx={39} ry={11} fill={blue[3]} stroke={blue[1]} strokeWidth={1.2} />
        <ellipse cx={200} cy={78} rx={16} ry={4.5} fill={blue[1]} />
        <rect x={172} y={110} width={56} height={34} rx={5} fill={r[3]} stroke={r[1]} strokeWidth={1} />
        <circle cx={186} cy={127} r={5} fill={blue[1]} />
        <circle cx={212} cy={127} r={5} fill={r[0]} opacity={0.5} />
        <ellipse cx={200} cy={244} rx={110} ry={7} fill="#000" opacity={0.1} />
      </g>
    )
  return (
    <g>
      <defs>
        <radialGradient id={g} cx="0.35" cy="0.3" r="0.85">
          <stop offset="0" stopColor={r[4]} />
          <stop offset="0.5" stopColor={r[2]} />
          <stop offset="1" stopColor={r[0]} />
        </radialGradient>
      </defs>
      <ellipse cx={190} cy={240} rx={150} ry={8} fill="#000" opacity={0.1} />
      <rect x={76} y={216} width={186} height={12} rx={3} fill={r[0]} />
      <Tube d="M74 170H198" w={94} c={blue} />
      {[92, 106, 120, 134, 148, 162, 176].map((x) => (
        <Seam key={x} x1={x} y1={126} x2={x} y2={214} c={blue[0]} o={0.35} sw={1.8} />
      ))}
      <ellipse cx={74} cy={170} rx={13} ry={47} fill={blue[1]} stroke={blue[0]} strokeWidth={1} />
      <rect x={112} y={116} width={44} height={16} rx={3} fill={r[3]} stroke={r[1]} strokeWidth={1} />
      <Tube d="M252 110V66" w={40} c={r} />
      <Tube d="M252 76V66" w={60} c={r} />
      <Tube d="M304 170H352" w={40} c={r} />
      <Tube d="M342 170H352" w={60} c={r} />
      <circle cx={252} cy={170} r={56} fill={`url(#${g})`} stroke={r[1]} strokeWidth={1.4} />
      {[0, 60, 120, 180, 240, 300].map((deg) => {
        const rad = (deg * Math.PI) / 180
        return <circle key={deg} cx={252 + Math.cos(rad) * 43} cy={170 + Math.sin(rad) * 43} r={3.6} fill={r[0]} opacity={0.75} />
      })}
      <circle cx={252} cy={170} r={19} fill={r[3]} stroke={r[1]} strokeWidth={1.2} />
      <circle cx={252} cy={170} r={8} fill={r[1]} />
    </g>
  )
}

/* ── polyethylene storage tank ── */
export function Tank({ r, id, spec }: DrawProps) {
  const v = spec.variant ?? 0
  const g = `${id}-tk`
  const br = ramp('chrome')
  const x0 = v === 0 ? 118 : 82
  const w = v === 0 ? 164 : 236
  const top = v === 0 ? 74 : 104
  const bot = v === 0 ? 232 : 236
  const cx = x0 + w / 2
  const rx = w / 2
  return (
    <g>
      <defs>
        <Grad id={g} stops={[[0, r[0]], [0.16, r[2]], [0.32, r[3]], [0.62, r[2]], [1, r[0]]]} />
      </defs>
      <ellipse cx={cx} cy={bot + 6} rx={rx + 20} ry={9} fill="#000" opacity={0.12} />
      <path d={`M${x0} ${top}V${bot}A${rx} 20 0 0 0 ${x0 + w} ${bot}V${top}Z`} fill={`url(#${g})`} />
      {(v === 0 ? [140, 190] : [160, 204]).map((y) => (
        <path key={y} d={`M${x0} ${y}a${rx} 15 0 0 0 ${w} 0`} fill="none" stroke={r[3]} strokeWidth={2.4} opacity={0.28} />
      ))}
      <ellipse cx={cx} cy={top} rx={rx} ry={22} fill={r[3]} stroke={r[1]} strokeWidth={1.2} />
      <ellipse cx={cx} cy={top} rx={rx - 12} ry={16} fill="none" stroke={r[1]} strokeWidth={1.2} opacity={0.6} />
      <ellipse cx={cx + (v === 0 ? 0 : -30)} cy={top - 2} rx={v === 0 ? 28 : 40} ry={v === 0 ? 8 : 11} fill={r[4]} stroke={r[1]} strokeWidth={1.2} />
      <ellipse cx={cx + (v === 0 ? 0 : -30)} cy={top - 4} rx={v === 0 ? 14 : 22} ry={4} fill={r[1]} opacity={0.8} />
      <Tube d={`M${x0 + w} ${bot - 22}H${x0 + w + 36}`} w={22} c={br} />
      <Seam x1={x0 + w + 26} y1={bot - 33} x2={x0 + w + 26} y2={bot - 11} c={br[0]} o={0.4} />
    </g>
  )
}

/* ── cast-iron manhole cover ── */
export function Cover({ r, id }: DrawProps) {
  const g = `${id}-cv`
  const cl = `${id}-cc`
  return (
    <g>
      <defs>
        <radialGradient id={g} cx="0.4" cy="0.35" r="0.85">
          <stop offset="0" stopColor={r[3]} />
          <stop offset="0.6" stopColor={r[2]} />
          <stop offset="1" stopColor={r[1]} />
        </radialGradient>
        <clipPath id={cl}>
          <circle r={104} />
        </clipPath>
      </defs>
      <ellipse cx={200} cy={222} rx={140} ry={12} fill="#000" opacity={0.1} />
      <path d="M68 156v14a132 62 0 0 0 264 0v-14z" fill={r[0]} />
      <ellipse cx={200} cy={156} rx={132} ry={62} fill={`url(#${g})`} stroke={r[0]} strokeWidth={1.2} />
      <g transform="translate(200 156) scale(1 0.47)">
        <circle r={112} fill="none" stroke={r[3]} strokeWidth={4} opacity={0.45} />
        <g clipPath={`url(#${cl})`} stroke={r[3]} strokeWidth={5} opacity={0.42}>
          {Array.from({ length: 11 }).map((_, i) => (
            <g key={i}>
              <path d={`M${-120 + i * 24} -120L${-120 + i * 24 + 240} 120`} />
              <path d={`M${-120 + i * 24} 120L${-120 + i * 24 + 240} -120`} />
            </g>
          ))}
        </g>
        <circle r={30} fill={r[2]} stroke={r[3]} strokeWidth={4} opacity={0.9} />
      </g>
      <rect x={128} y={148} width={26} height={9} rx={4} fill={r[0]} opacity={0.6} />
      <rect x={246} y={148} width={26} height={9} rx={4} fill={r[0]} opacity={0.6} />
    </g>
  )
}

/* ── pipe wrench ── */
export function Wrench({ r }: DrawProps) {
  const red = rampFromHex('#a9433a')
  return (
    <g transform="translate(200 156) scale(0.8) rotate(-32) translate(-200 -156)">
      <Tube d="M46 200H282" w={22} c={r} cap="round" />
      <Tube d="M46 200H150" w={28} c={red} cap="round" />
      <rect x={268} y={170} width={50} height={60} rx={8} fill={r[2]} stroke={r[1]} strokeWidth={1.2} />
      <polygon points="296,170 356,152 360,184 324,194 300,194" fill={r[3]} stroke={r[1]} strokeWidth={1.2} strokeLinejoin="round" />
      <polygon points="300,206 326,206 358,200 356,230 318,234" fill={r[2]} stroke={r[1]} strokeWidth={1.2} strokeLinejoin="round" />
      <path d="M330 194l6-3m4 2l6-2M330 206l6-3m4 1l8-2" stroke={r[0]} strokeWidth={1.8} opacity={0.6} strokeLinecap="round" />
      <circle cx={290} cy={216} r={14} fill={r[3]} stroke={r[1]} strokeWidth={1.2} />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <line key={i} x1={290 + Math.cos((i * Math.PI) / 4) * 8} y1={216 + Math.sin((i * Math.PI) / 4) * 8} x2={290 + Math.cos((i * Math.PI) / 4) * 14} y2={216 + Math.sin((i * Math.PI) / 4) * 14} stroke={r[0]} strokeWidth={1.6} opacity={0.6} />
      ))}
    </g>
  )
}

/* ── PTFE thread tape ── */
export function Tape({ r, id }: DrawProps) {
  const g = `${id}-tp`
  const gt = `${id}-tt`
  return (
    <g>
      <defs>
        <Grad id={g} stops={[[0, r[1]], [0.22, r[4]], [0.6, r[3]], [1, r[1]]]} />
        <radialGradient id={gt} cx="0.4" cy="0.3" r="0.9">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor={r[3]} />
        </radialGradient>
      </defs>
      <ellipse cx={200} cy={226} rx={112} ry={10} fill="#000" opacity={0.1} />
      <path d="M108 152v34a92 46 0 0 0 184 0v-34z" fill={`url(#${g})`} />
      <ellipse cx={200} cy={152} rx={92} ry={46} fill={`url(#${gt})`} stroke={r[1]} strokeWidth={1} />
      <ellipse cx={200} cy={152} rx={64} ry={31} fill="none" stroke={r[1]} strokeWidth={1} opacity={0.35} />
      <ellipse cx={200} cy={153} rx={30} ry={15} fill="#191a18" />
      <ellipse cx={198} cy={151} rx={24} ry={11} fill="#0e0f0d" />
    </g>
  )
}

/* ── can of solvent cement / sealant ── */
export function Can({ r, spec, id }: DrawProps) {
  const v = spec.variant ?? 0
  const g = `${id}-cn`
  const label = v === 0 ? '#2f5d86' : '#8b7355'
  return (
    <g>
      <defs>
        <Grad id={g} stops={[[0, r[1]], [0.2, r[3]], [0.42, r[4]], [0.75, r[2]], [1, r[0]]]} />
      </defs>
      <ellipse cx={200} cy={236} rx={92} ry={10} fill="#000" opacity={0.12} />
      <path d="M140 108V226A60 13 0 0 0 260 226V108Z" fill={`url(#${g})`} />
      <path d="M140 140Q200 154 260 140V214Q200 228 140 214Z" fill={label} />
      <path d="M140 140Q200 154 260 140V152Q200 166 140 152Z" fill="#ffffff" opacity={0.85} />
      <path d="M156 186H244" stroke="#ffffff" strokeWidth={5} strokeLinecap="round" opacity={0.8} />
      <path d="M170 198H230" stroke="#ffffff" strokeWidth={3} strokeLinecap="round" opacity={0.55} />
      <ellipse cx={200} cy={108} rx={60} ry={13} fill={r[3]} stroke={r[1]} strokeWidth={1.2} />
      <Tube d="M200 106V72" w={40} c={rampFromHex('#26282a')} />
      <ellipse cx={200} cy={72} rx={20} ry={6} fill="#34363a" stroke="#1a1b1c" strokeWidth={1} />
    </g>
  )
}

/* ── pipe clamp with rubber liner ── */
export function Clip({ r, id }: DrawProps) {
  const pv = ramp('pvc')
  const g = `${id}-cl`
  return (
    <g>
      <defs>
        <radialGradient id={g} cx="0.4" cy="0.35" r="0.9">
          <stop offset="0" stopColor={pv[4]} />
          <stop offset="1" stopColor={pv[2]} />
        </radialGradient>
      </defs>
      <ellipse cx={200} cy={246} rx={92} ry={8} fill="#000" opacity={0.1} />
      <rect x={166} y={74} width={26} height={30} rx={4} fill={r[2]} stroke={r[1]} strokeWidth={1} />
      <rect x={208} y={74} width={26} height={30} rx={4} fill={r[2]} stroke={r[1]} strokeWidth={1} />
      <Tube d="M150 90H250" w={9} c={r} cap="round" />
      <circle cx={150} cy={90} r={9} fill={r[3]} stroke={r[1]} strokeWidth={1} />
      <circle cx={250} cy={90} r={9} fill={r[3]} stroke={r[1]} strokeWidth={1} />
      <Tube d={ell(200, 162, 74, 74)} w={16} c={r} />
      <circle cx={200} cy={162} r={60} fill="none" stroke="#26282a" strokeWidth={10} />
      <circle cx={200} cy={162} r={52} fill={`url(#${g})`} />
      <circle cx={200} cy={162} r={35} fill="#181917" />
      <circle cx={196} cy={160} r={27} fill="#0d0d0c" />
    </g>
  )
}
