import { company } from '../../data/company'
import Logo from '../ui/Logo'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner container-x">
        <Logo variant="compact" />
        <p className="site-footer-copy type-meta">
          © 2026 {company.legalName}
        </p>
      </div>
    </footer>
  )
}
