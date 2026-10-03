const REP_MODE_KEY = 'al-bayed-rep-mode'
const REP_FROM_DASHBOARD_KEY = 'al-bayed-rep-from-dashboard'

export function activateRepMode(fromDashboard = false) {
  try {
    localStorage.setItem(REP_MODE_KEY, '1')
    if (fromDashboard) localStorage.setItem(REP_FROM_DASHBOARD_KEY, '1')
  } catch {
    /* ignore */
  }
}

export function readRepModeActive(): boolean {
  try {
    return localStorage.getItem(REP_MODE_KEY) === '1'
  } catch {
    return false
  }
}

/** Show catalog client/order tools when rep mode is on or a visit-order session exists. */
export function useCatalogRepContext(hasClient: boolean, lineCount: number): boolean {
  if (hasClient || lineCount > 0) return true
  return readRepModeActive()
}

export function enableRepModeOnDashboardLink() {
  activateRepMode(true)
}
