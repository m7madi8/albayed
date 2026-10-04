/** Max size for cheque / receipt photos on payment & disbursement vouchers (localStorage). */
export const VOUCHER_ATTACHMENT_MAX_BYTES = 12 * 1024 * 1024

export const VOUCHER_ATTACHMENT_MAX_MB = VOUCHER_ATTACHMENT_MAX_BYTES / (1024 * 1024)

export function voucherAttachmentTooLargeMessage(): string {
  return `حجم الصورة كبير. استخدم صورة أقل من ${VOUCHER_ATTACHMENT_MAX_MB} ميغابايت.`
}

export function voucherAttachmentHintLine(): string {
  return `JPG أو PNG حتى ${VOUCHER_ATTACHMENT_MAX_MB} ميغابايت`
}
