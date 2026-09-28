import { Link } from 'react-router-dom'
import { company } from '../../data/company'
import { BRAND_LOGO_FULL, BRAND_LOGO_ON_DARK } from '../../lib/brandAssets'
import { useTheme } from '../../context/ThemeContext'

export default function Logo({
  compact = false,
  variant = compact ? 'compact' : 'default',
}: {
  compact?: boolean
  variant?: 'default' | 'compact' | 'header'
}) {
  const { theme } = useTheme()
  const resolved = variant === 'compact' || compact ? 'compact' : variant
  const src = theme === 'dark' ? BRAND_LOGO_ON_DARK : BRAND_LOGO_FULL

  const size =
    resolved === 'header'
      ? 'logo-img logo-img--header'
      : resolved === 'compact'
        ? 'logo-img logo-img--compact'
        : 'logo-img logo-img--default'

  const dims =
    resolved === 'header'
      ? { w: 200, h: 48 }
      : resolved === 'compact'
        ? { w: 148, h: 36 }
        : { w: 160, h: 40 }

  return (
    <Link to="/" aria-label={`${company.legalName} — الرئيسية`} className="logo-link">
      <img
        src={src}
        alt={company.legalName}
        width={dims.w}
        height={dims.h}
        className={size}
        decoding="async"
      />
    </Link>
  )
}
