import type { ComponentProps, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { btn, type ButtonVariant } from '../../lib/buttonStyles'

type Common = { variant?: ButtonVariant; children: ReactNode; className?: string }

export function ButtonLink({ variant = 'primary', className = '', children, ...rest }: Common & ComponentProps<typeof Link>) {
  return (
    <Link className={btn(variant, className)} {...rest}>
      {children}
    </Link>
  )
}

export function Button({ variant = 'primary', className = '', children, ...rest }: Common & ComponentProps<'button'>) {
  return (
    <button type="button" className={btn(variant, className)} {...rest}>
      {children}
    </button>
  )
}
