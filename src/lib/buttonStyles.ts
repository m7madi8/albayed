export type ButtonVariant = 'primary' | 'secondary' | 'light' | 'ghost'

const base =
  'ui-press type-button inline-flex h-11 min-h-[44px] shrink-0 cursor-pointer items-center justify-center gap-2 rounded-md px-5 transition-[background-color,color,border-color,transform,box-shadow] duration-[var(--duration-ui)] ease-[var(--ease-out-soft)] focus-visible:outline-none focus-visible:border-accent focus-visible:ring-[3px] focus-visible:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-50 aria-busy:pointer-events-none aria-busy:ds-btn--loading'

const variants: Record<ButtonVariant, string> = {
  primary:
    'border border-[var(--btn-border-primary)] bg-accent text-accent-foreground hover:border-[var(--btn-border-on-accent)] hover:bg-accent-hover active:bg-accent-hover',
  secondary:
    'border border-[var(--btn-border-soft)] bg-surface text-foreground hover:border-[var(--btn-border-hover)] hover:bg-surface-muted active:bg-surface-muted',
  light:
    'border border-[var(--btn-border-soft)] bg-surface-muted text-foreground hover:border-[var(--btn-border-hover)] hover:bg-surface active:bg-surface',
  ghost:
    'border border-[var(--btn-border-soft)] bg-transparent text-foreground hover:border-[var(--btn-border-hover)] hover:bg-surface-muted active:bg-surface-muted',
}

export const btn = (variant: ButtonVariant = 'primary', extra = '') => `${base} ${variants[variant]} ${extra}`
