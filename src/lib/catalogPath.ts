/** Catalog list, favorites, and legacy category paths share catalog chrome. */
export function isCatalogPath(pathname: string): boolean {
  return (
    pathname === '/products' ||
    pathname === '/products/favorites' ||
    pathname.startsWith('/category/') ||
    pathname === '/visit-order'
  )
}
