import { Link } from 'react-router-dom'
import { Moon, Sun } from 'lucide-react'
import { useState } from 'react'
import { useTheme } from '../../context/ThemeContext'
import { company } from '../../data/company'
import BackButton from '../ui/BackButton'
import { readSalesDensity, writeSalesDensity, type SalesDensity } from '../../lib/salesDensity'

const DENSITY_LABELS: Record<SalesDensity, string> = {
  dense: 'كثيف',
  default: 'افتراضي',
  relaxed: 'مريح',
}

export default function SettingsPanel() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'
  const [density, setDensity] = useState<SalesDensity>(() => readSalesDensity())

  const onDensity = (value: SalesDensity) => {
    setDensity(value)
    writeSalesDensity(value)
    window.dispatchEvent(new CustomEvent('al-bayed-density-change', { detail: value }))
  }

  return (
    <div className="sales-os-section max-w-lg">
      <div className="mb-4">
        <BackButton fallback="/dashboard/overview" />
      </div>
      <p className="text-[12px] font-medium tracking-wide text-foreground-muted">الإعدادات</p>
      <h1 className="display mt-1 text-[1.5rem] text-foreground">تفضيلات المندوب</h1>

      <div className="ios-tile mt-8 divide-y divide-border">
        <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-5">
          <div>
            <p className="text-[15px] font-medium text-foreground">المظهر</p>
            <p className="mt-1 text-[13px] text-foreground-muted">فاتح أو داكن — يُحفظ على هذا الجهاز.</p>
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            className="sales-os-icon-btn focus-ring"
            aria-label={isDark ? 'مظهر فاتح' : 'مظهر داكن'}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
        <div className="px-4 py-4 sm:px-5">
          <p className="text-[15px] font-medium text-foreground">كثافة القوائم</p>
          <p className="mt-1 text-[13px] text-foreground-muted">تباعد الصفوف في لوحة المندوب.</p>
          <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="كثافة العرض">
            {(['dense', 'default', 'relaxed'] as const).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => onDensity(d)}
                className={`filter-chip${density === d ? ' filter-chip--selected' : ''}`}
                aria-pressed={density === d}
              >
                {DENSITY_LABELS[d]}
              </button>
            ))}
          </div>
        </div>
        <div className="px-4 py-4 sm:px-5">
          <p className="text-[15px] font-medium text-foreground">الكتالوج العام</p>
          <p className="mt-1 text-[13px] text-foreground-muted">عرض المنتجات الكامل خارج مساحة المندوب.</p>
          <Link to="/products" className="mt-3 inline-block text-[14px] font-medium text-accent-text">
            فتح كتالوج المنتجات
          </Link>
        </div>
        <div className="px-4 py-4 sm:px-5 text-[13px] text-foreground-muted">
          {company.legalName} — نظام مبيعات محلي
        </div>
      </div>
    </div>
  )
}
