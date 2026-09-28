import { ButtonLink } from '../ui/Button'
import Reveal from '../ui/Reveal'

export default function ContactCTA() {
  return (
    <section className="hairline-t bg-surface py-20 md:py-28">
      <div className="container-x">
        <Reveal className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-lg">
            <h2 className="display text-[clamp(2rem,4vw,3rem)] text-foreground">تبحث عن منتج محدد؟</h2>
            <p className="mt-4 text-[16.5px] leading-8 text-foreground-muted">
              فريقنا جاهز لمساعدتك في إيجاد المنتج المناسب من بين آلاف الأصناف، أو توفير ما تحتاجه لمشروعك خصيصًا.
            </p>
          </div>
          <ButtonLink to="/contact" variant="light" className="shrink-0">
            تواصل معنا
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  )
}
