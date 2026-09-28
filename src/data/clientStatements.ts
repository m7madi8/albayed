/** كشف حساب العميل — يُجلب من نظام المبيعات عند الربط. */

export interface StatementEntry {
  id: string
  date: string
  description: string
  debit: number
  credit: number
  balance: number
}

export interface ClientStatement {
  clientId: string
  updatedAt: string
  openingBalance: number
  entries: StatementEntry[]
}

export function getClientStatement(_clientId: string): ClientStatement | null {
  return null
}

export function formatStatementAmount(value: number): string {
  return `${value.toLocaleString('ar-EG')} ₪`
}
