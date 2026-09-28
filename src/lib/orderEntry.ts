/** عرض الزيارة داخل الكتالوج — بدون لوحة المبيعات أثناء الاجتماع */
export function buildOrderEntryPath(lineCount: number): string {
  return lineCount > 0 ? '/visit-order' : '/products'
}
