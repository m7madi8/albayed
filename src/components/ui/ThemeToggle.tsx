import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

export default function ThemeToggle({
  variant = 'icon',
}: {
  variant?: 'icon' | 'menu'
}) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'
  const label = isDark ? 'التبديل إلى المظهر الفاتح' : 'التبديل إلى المظهر الداكن'

  if (variant === 'menu') {
    return (
      <button type="button" role="menuitem" className="rep-sidebar-user-item focus-ring" onClick={toggleTheme}>
        {isDark ? <Sun size={16} strokeWidth={1.75} aria-hidden /> : <Moon size={16} strokeWidth={1.75} aria-hidden />}
        {isDark ? 'مظهر فاتح' : 'مظهر داكن'}
      </button>
    )
  }

  return (
    <button type="button" onClick={toggleTheme} aria-label={label} className="app-header-icon-btn" title={label}>
      {isDark ? <Sun size={22} strokeWidth={1.75} aria-hidden /> : <Moon size={22} strokeWidth={1.75} aria-hidden />}
    </button>
  )
}
