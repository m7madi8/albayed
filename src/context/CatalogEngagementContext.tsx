import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from 'react'

const FAV_KEY = 'albayed-catalog-favorites'

function readIds(key: string): string[] {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === 'string') : []
  } catch {
    return []
  }
}

function writeIds(key: string, ids: string[]) {
  localStorage.setItem(key, JSON.stringify(ids))
}

type Store = { favorites: string[] }

let store: Store = {
  favorites: readIds(FAV_KEY),
}
const listeners = new Set<() => void>()

function emit() {
  listeners.forEach((l) => l())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function getSnapshot() {
  return store
}

const CatalogEngagementContext = createContext<{
  favoriteIds: string[]
  isFavorite: (id: string) => boolean
  toggleFavorite: (id: string) => void
} | null>(null)

export function CatalogEngagementProvider({ children }: { children: React.ReactNode }) {
  const snap = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)

  const toggleFavorite = useCallback((id: string) => {
    const set = new Set(store.favorites)
    if (set.has(id)) set.delete(id)
    else set.add(id)
    const favorites = [...set]
    store = { ...store, favorites }
    writeIds(FAV_KEY, favorites)
    emit()
  }, [])

  const value = useMemo(
    () => ({
      favoriteIds: snap.favorites,
      isFavorite: (id: string) => snap.favorites.includes(id),
      toggleFavorite,
    }),
    [snap.favorites, toggleFavorite],
  )

  return <CatalogEngagementContext.Provider value={value}>{children}</CatalogEngagementContext.Provider>
}

export function useCatalogEngagement() {
  const ctx = useContext(CatalogEngagementContext)
  if (!ctx) throw new Error('useCatalogEngagement must be used within CatalogEngagementProvider')
  return ctx
}
