export function filterChipClass(active: boolean, disabled?: boolean) {
  const base = 'filter-chip type-label'
  if (disabled) return `${base}`
  if (active) return `${base} filter-chip--selected`
  return base
}
