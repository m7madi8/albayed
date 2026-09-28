import BrandHero from '../brand/BrandHero'
import { heroBackgroundForSection } from '../../lib/brandAssets'
import type { SalesSectionId } from '../../lib/salesFilters'

export default function CategoryHero({ section }: { section: SalesSectionId }) {
  return <BrandHero size="section" background={heroBackgroundForSection(section)} />
}
