import { Navigate, useParams, useSearchParams } from 'react-router-dom'
import { categoryBySlug } from '../data/categories'

/** Legacy path — canonical catalog URL is /products?category= */
export default function CategoryPage() {
  const { slug } = useParams()
  const [sp] = useSearchParams()
  const category = categoryBySlug(slug ?? '')
  if (!category) return <Navigate to="/products" replace />
  const next = new URLSearchParams(sp)
  next.set('category', category.slug)
  next.delete('section')
  return <Navigate to={`/products?${next.toString()}`} replace />
}
