import { ButtonLink } from '../components/ui/Button'

export default function NotFound() {
  return (
    <div className="container-x flex flex-col items-center justify-center py-32 text-center">
      <p className="display text-[15px] text-accent">404</p>
      <h1 className="display mt-4 text-[clamp(2rem,4vw,3rem)] text-foreground">هذه الصفحة غير موجودة</h1>
      <p className="mt-4 max-w-sm text-[15.5px] text-foreground-muted">قد يكون الرابط غير صحيح أو تم نقل الصفحة.</p>
      <ButtonLink to="/" variant="primary" className="mt-8">العودة للرئيسية</ButtonLink>
    </div>
  )
}
