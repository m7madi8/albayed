import Hero from '../components/home/Hero'
import LedgerStrip from '../components/home/LedgerStrip'
import CategoryShowcase from '../components/home/CategoryShowcase'
import BrandShowcase from '../components/home/BrandShowcase'
import TrustSection from '../components/home/TrustSection'
import ContactCTA from '../components/home/ContactCTA'

export default function Home() {
  return (
    <div className="home-page rhythm-editorial">
      <Hero />
      <LedgerStrip />
      <CategoryShowcase />
      <BrandShowcase />
      <TrustSection />
      <ContactCTA />
    </div>
  )
}
