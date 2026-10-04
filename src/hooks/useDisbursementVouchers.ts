import { useCallback, useEffect, useState } from 'react'
import {
  DISBURSEMENT_VOUCHERS_CHANGE_EVENT,
  loadDisbursementVouchers,
  type DisbursementVoucher,
} from '../lib/disbursementVouchers'

const STORAGE_KEY = 'albayed-disbursement-vouchers-v1'

export function useDisbursementVouchers() {
  const [vouchers, setVouchers] = useState<DisbursementVoucher[]>(() => loadDisbursementVouchers())

  const refresh = useCallback(() => setVouchers(loadDisbursementVouchers()), [])

  useEffect(() => {
    const onChange = () => refresh()
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) refresh()
    }
    window.addEventListener(DISBURSEMENT_VOUCHERS_CHANGE_EVENT, onChange)
    window.addEventListener('storage', onStorage)
    return () => {
      window.removeEventListener(DISBURSEMENT_VOUCHERS_CHANGE_EVENT, onChange)
      window.removeEventListener('storage', onStorage)
    }
  }, [refresh])

  return { vouchers, refresh }
}
