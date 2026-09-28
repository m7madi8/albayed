import { createContext, useContext, type ReactNode } from 'react'

const SearchOpenContext = createContext<(() => void) | null>(null)

export function SearchOpenProvider({ open, children }: { open: () => void; children: ReactNode }) {
  return <SearchOpenContext.Provider value={open}>{children}</SearchOpenContext.Provider>
}

export function useCatalogSearch() {
  const open = useContext(SearchOpenContext)
  return { openSearch: open ?? (() => {}) }
}
