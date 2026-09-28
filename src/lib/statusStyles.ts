export type StatusTone =
  | 'draft'
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'paid'
  | 'returned'
  | 'synced'
  | 'completed'
  | 'info'

export const STATUS_LABEL: Record<StatusTone, string> = {
  draft: 'مسودة',
  pending: 'بانتظار الاعتماد',
  approved: 'معتمد',
  rejected: 'مرفوض',
  paid: 'مدفوع',
  returned: 'مرتجع',
  synced: 'تمت المزامنة',
  completed: 'مكتمل',
  info: 'معلومة',
}

export const statusClass = (tone: StatusTone) => `status-pill status-${tone}`
