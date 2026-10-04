import { useCallback, useEffect, useState } from 'react'
import {
  loadReceiptVouchers,
  RECEIPT_VOUCHERS_CHANGE_EVENT,
  type ReceiptVoucher,
} from '../lib/chequeReceiptVouchers'

const STORAGE_KEY = 'albayed-receipt-vouchers-v2'
const LEGACY_STORAGE_KEY = 'albayed-cheque-receipt-vouchers-v1'

export function useReceiptVouchers() {
  const [vouchers, setVouchers] = useState<ReceiptVoucher[]>(() => loadReceiptVouchers())

  const refresh = useCallback(() => setVouchers(loadReceiptVouchers()), [])

  useEffect(() => {
    const onChange = () => refresh()
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY || e.key === LEGACY_STORAGE_KEY) refresh()
    }
    window.addEventListener(RECEIPT_VOUCHERS_CHANGE_EVENT, onChange)
    window.addEventListener('storage', onStorage)
    return () => {
      window.removeEventListener(RECEIPT_VOUCHERS_CHANGE_EVENT, onChange)
      window.removeEventListener('storage', onStorage)
    }
  }, [refresh])

  return { vouchers, refresh }
}

/** @deprecated use useReceiptVouchers */
export function useChequeReceiptVouchers() {
  return useReceiptVouchers()
}
