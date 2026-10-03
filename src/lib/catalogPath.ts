/** Catalog list, favorites, product detail, and legacy category paths share catalog chrome. */
export function isCatalogPath(pathname: string): boolean {
  return (
    pathname === '/products' ||
    pathname.startsWith('/products/') ||
    pathname.startsWith('/category/') ||
    pathname === '/visit-order'
  )
}
