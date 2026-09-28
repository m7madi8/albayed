/** نموذج عميل B2B — القائمة من التخزين المحلي أو الـ API لاحقًا. */
export interface SalesClient {
  id: string
  name: string
  city: string
  phone: string
  contact?: string
}
