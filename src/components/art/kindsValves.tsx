import { rampFromHex } from './palette'
import { Seam, ThreadsH, ThreadsV, Tube, type DrawProps } from './primitives'

const RED = '#a9433a'

/* ── ball valve with lever ── */
export function BallValve({ r }: DrawProps) {
  const red = rampFromHex(RED)
  return (
    <g>
      <Tube d="M46 176H130" w={54} c={r} />
      <ThreadsH x={46} y={176} len={54} w={54} c={r[0]} n={6} />
      <Tube d="M270 176H354" w={54} c={r} />
      <ThreadsH x={300} y={176} len={54} w={54} c={r[0]} n={6} />
      <Tube d="M150 176H250" w={108} c={r} cap="round" />
      <Seam x1={132} y1={124} x2={132} y2={228} c={r[0]} o={0.45} />
      <Seam x1={268} y1={124} x2={268} y2={228} c={r[0]} o={0.45} />
      <Tube d="M200 128V92" w={30} c={r} />
      <Tube d="M200 100V86" w={46} c={r} />
      <Seam x1={177} y1={100} x2={223} y2={100} c={r[0]} o={0.4} />
      <Tube d="M112 74H262" w={15} c={red} cap="round" />
      <Tube d="M112 74H156" w={20} c={red} cap="round" />
      <Seam x1={200} y1={86} x2={200} y2={82} c={r[0]} />
    </g>
  )
}

/* ── gate valve with wheel ── */
export function GateValve({ r }: DrawProps) {
  const red = rampFromHex(RED)
  const ell = (cx: number, cy: number, rx: number, ry: number) =>
    `M${cx - rx} ${cy}a${rx} ${ry} 0 1 0 ${rx * 2} 0a${rx} ${ry} 0 1 0 ${-rx * 2} 0`
  return (
    <g>
      <Tube d="M52 200H132" w={50} c={r} />
      <ThreadsH x={52} y={200} len={52} w={50} c={r[0]} n={6} />
      <Tube d="M268 200H348" w={50} c={r} />
      <ThreadsH x={296} y={200} len={52} w={50} c={r[0]} n={6} />
      <Tube d="M152 200H248" w={92} c={r} cap="round" />
      <Tube d="M200 158V112" w={62} c={r} />
      <Tube d="M200 118V104" w={78} c={r} />
      <Seam x1={161} y1={118} x2={239} y2={118} c={r[0]} o={0.4} />
      <Tube d="M200 106V64" w={12} c={r} />
      <Tube d={ell(200, 60, 66, 15)} w={10} c={red} />
      <path d="M134 60H266M200 45V75" stroke={red[1]} strokeWidth={4} opacity={0.85} />
      <ellipse cx={200} cy={60} rx={12} ry={6} fill={red[3]} stroke={red[0]} strokeWidth={1} />
    </g>
  )
}

/* ── swing / spring check valve ── */
export function CheckValve({ r }: DrawProps) {
  return (
    <g>
      <Tube d="M50 170H122" w={52} c={r} />
      <ThreadsH x={50} y={170} len={52} w={52} c={r[0]} n={6} />
      <Tube d="M278 170H350" w={52} c={r} />
      <ThreadsH x={298} y={170} len={52} w={52} c={r[0]} n={6} />
      <Tube d="M128 170H272" w={88} c={r} />
      <Seam x1={128} y1={126} x2={128} y2={214} c={r[0]} />
      <Seam x1={272} y1={126} x2={272} y2={214} c={r[0]} />
      <Tube d="M200 130V98" w={62} c={r} />
      <ellipse cx={200} cy={98} rx={31} ry={9} fill={r[3]} stroke={r[1]} strokeWidth={1.2} />
      <ellipse cx={200} cy={98} rx={18} ry={5} fill={r[1]} opacity={0.7} />
      <path d="M170 172H228M212 160L228 172L212 184" stroke={r[0]} strokeWidth={3.2} opacity={0.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  )
}

/* ── Y strainer ── */
export function Strainer({ r }: DrawProps) {
  return (
    <g>
      <Tube d="M50 118H120" w={50} c={r} />
      <ThreadsH x={50} y={118} len={52} w={50} c={r[0]} n={6} />
      <Tube d="M280 118H350" w={50} c={r} />
      <ThreadsH x={298} y={118} len={52} w={50} c={r[0]} n={6} />
      <Tube d="M116 118H284" w={70} c={r} />
      <Seam x1={120} y1={83} x2={120} y2={153} c={r[0]} />
      <Seam x1={280} y1={83} x2={280} y2={153} c={r[0]} />
      <Tube d="M214 132L268 196" w={52} c={r} />
      <Tube d="M262 190L296 230" w={66} c={r} />
      <Seam x1={262 - 24} y1={190 + 20} x2={262 + 26} y2={190 - 20} c={r[0]} />
      <Seam x1={296 - 30} y1={230 + 25} x2={296 + 30} y2={230 - 25} c={r[0]} o={0.3} />
    </g>
  )
}

/* ── 4-way manifold ── */
export function Manifold({ r }: DrawProps) {
  const xs = [112, 172, 232, 292]
  return (
    <g>
      {xs.map((x) => (
        <g key={x}>
          <Tube d={`M${x} 110V196`} w={30} c={r} />
          <Tube d={`M${x} 152V166`} w={42} c={r} />
          <Seam x1={x - 21} y1={152} x2={x + 21} y2={152} c={r[0]} o={0.4} />
          <ThreadsV x={x} y={172} len={26} w={30} c={r[0]} n={4} />
        </g>
      ))}
      <Tube d="M62 96H338" w={48} c={r} cap="round" />
      <Tube d="M46 96H92" w={56} c={r} />
      <Seam x1={92} y1={68} x2={92} y2={124} c={r[0]} />
      <ThreadsH x={46} y={96} len={44} w={56} c={r[0]} n={5} />
      <Tube d="M330 96H344" w={58} c={r} cap="round" />
    </g>
  )
}
