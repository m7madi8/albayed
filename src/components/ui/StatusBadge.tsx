import { statusClass, type StatusTone } from '../../lib/statusStyles'

export default function StatusBadge({
  tone,
  children,
}: {
  tone: StatusTone
  children: string
}) {
  return <span className={statusClass(tone)}>{children}</span>
}
