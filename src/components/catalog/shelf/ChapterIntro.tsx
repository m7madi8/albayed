import type { Category } from '../../../data/types'
import type { Product } from '../../../data/types'
import { chapterTechnicalLine } from '../../../lib/chapterTechnicalLine'
export default function ChapterIntro({
  category,
  pool,
}: {
  category: Category
  pool: Product[]
}) {
  const tech = chapterTechnicalLine(category, pool)

  return (
    <header className="sh-chapter">
      <h1 className="sh-chapter__title">{category.name}</h1>
      {category.tagline ? <p className="sh-chapter__tagline">{category.tagline}</p> : null}
      {tech ? <p className="sh-chapter__tech" dir="ltr">{tech}</p> : null}
    </header>
  )
}
