import { useOutletContext } from 'react-router-dom'

export function useSalesToast() {
  return useOutletContext<{ showToast?: (message: string) => void }>()
}
