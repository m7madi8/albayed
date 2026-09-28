import type { SalesClient } from '../data/clients'
import { isValidClientPhone, normalizeClientPhone } from './clientPhone'

const STORAGE_KEY = 'albayed-custom-clients-v2'
const LEGACY_KEYS = ['albayed-custom-clients-v1']

function purgeLegacyClientStorage() {
  for (const key of LEGACY_KEYS) {
    try {
      localStorage.removeItem(key)
    } catch {
      /* ignore */
    }
  }
}

purgeLegacyClientStorage()

function readAllRaw(): SalesClient[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as Array<Partial<SalesClient> & { phone?: string }>
    if (!Array.isArray(parsed)) return []
    return parsed
      .filter((c) => c?.id && c?.name && c?.city)
      .map((c) => ({
        id: c.id!,
        name: c.name!,
        city: c.city!,
        phone: typeof c.phone === 'string' ? c.phone : '',
        contact: c.contact?.trim() || undefined,
      }))
  } catch {
    return []
  }
}

function writeAll(clients: SalesClient[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(clients))
}

/** عملاء مكتملون (مع هاتف صالح) للقائمة */
export function loadAllClients(): SalesClient[] {
  return readAllRaw().filter((c) => isValidClientPhone(c.phone))
}

export function findClientById(id: string): SalesClient | undefined {
  return readAllRaw().find((c) => c.id === id)
}

export function clientById(id: string): SalesClient | undefined {
  return findClientById(id)
}

export function saveCustomClient(input: {
  name: string
  city: string
  phone: string
  contact?: string
}): SalesClient {
  const name = input.name.trim()
  const city = input.city.trim()
  const phone = normalizeClientPhone(input.phone)
  if (!isValidClientPhone(phone)) {
    throw new Error('invalid phone')
  }
  const client: SalesClient = {
    id: `local-${Date.now()}`,
    name,
    city,
    phone,
    contact: input.contact?.trim() || undefined,
  }
  const custom = readAllRaw()
  custom.push(client)
  writeAll(custom)
  return client
}

export function updateClientPhone(id: string, phone: string): SalesClient | null {
  const normalized = normalizeClientPhone(phone)
  if (!isValidClientPhone(normalized)) return null
  const custom = readAllRaw()
  const i = custom.findIndex((c) => c.id === id)
  if (i === -1) return null
  custom[i] = { ...custom[i], phone: normalized }
  writeAll(custom)
  return custom[i]
}
