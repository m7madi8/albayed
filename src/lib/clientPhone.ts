export function isValidClientPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '')
  return digits.length >= 9 && digits.length <= 15
}

export function normalizeClientPhone(phone: string): string {
  return phone.trim()
}
