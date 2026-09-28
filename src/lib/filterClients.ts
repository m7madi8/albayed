import type { SalesClient } from '../data/clients'

export function filterClients(clients: SalesClient[], query: string): SalesClient[] {
  const term = query.trim().toLowerCase()
  if (!term) return clients
  const digits = term.replace(/\D/g, '')
  return clients.filter((c) => {
    if (c.name.toLowerCase().includes(term)) return true
    if (c.city.toLowerCase().includes(term)) return true
    if (c.contact?.toLowerCase().includes(term)) return true
    if (digits.length > 0 && c.phone.replace(/\D/g, '').includes(digits)) return true
    return false
  })
}
