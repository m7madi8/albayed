import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  loadSubmittedOrders,
  setSubmittedOrderStatus,
  SUBMITTED_ORDERS_CHANGE_EVENT,
  type SubmittedOrder,
} from '../lib/submittedOrders'

const STORAGE_KEY = 'albayed-submitted-orders-v1'

export function useSubmittedOrders() {
  const [orders, setOrders] = useState<SubmittedOrder[]>(() => loadSubmittedOrders())

  const refresh = useCallback(() => setOrders(loadSubmittedOrders()), [])

  useEffect(() => {
    const onChange = () => refresh()
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) refresh()
    }
    window.addEventListener(SUBMITTED_ORDERS_CHANGE_EVENT, onChange)
    window.addEventListener('storage', onStorage)
    return () => {
      window.removeEventListener(SUBMITTED_ORDERS_CHANGE_EVENT, onChange)
      window.removeEventListener('storage', onStorage)
    }
  }, [refresh])

  const pendingCount = useMemo(() => orders.filter((o) => o.status === 'pending').length, [orders])

  const acceptOrder = useCallback(
    (id: string) => {
      setSubmittedOrderStatus(id, 'accepted')
      refresh()
    },
    [refresh],
  )

  const rejectOrder = useCallback(
    (id: string) => {
      setSubmittedOrderStatus(id, 'rejected')
      refresh()
    },
    [refresh],
  )

  return { orders, pendingCount, refresh, acceptOrder, rejectOrder }
}
