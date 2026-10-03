import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { company } from '../data/company'
import Reveal from '../components/ui/Reveal'

const digitsOnly = (s: string) => s.replace(/[^\d]/g, '')

export default function ContactPage() {
  return (
    <div>
      <section className="hairline-b bg-surface-muted/60">
        <div className="container-x py-16 md:py-24">
          <Reveal className="max-w-xl">
            <p className="text-[13.5px] font-medium text-accent-text">تواصل معنا</p>
            <h1 className="display mt-4 text-[clamp(2.1rem,4.6vw,3.4rem)] text-foreground">نحن هنا لمساعدتك</h1>
            <p className="mt-6 text-[17px] leading-8 text-foreground-secondary/80">
              لأي استفسار عن منتج أو مشروع أو توفّر صنف معيّن، فريقنا جاهز للرد خلال ساعات العمل.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-x py-14 md:py-20">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Reveal>
            <a
              href={`tel:${digitsOnly(company.contact.phone)}`}
              className="group flex h-full flex-col gap-6 rounded-[var(--radius-card)] border border-border bg-surface p-7 transition-colors hover:border-ink/20"
            >
              <Phone size={22} strokeWidth={1.6} className="text-foreground-secondary" />
              <div>
                <p className="text-[13.5px] font-medium text-foreground-muted">اتصل بنا</p>
                <p dir="ltr" className="mt-1 text-right text-[16px] font-medium text-foreground">{company.contact.phone}</p>
              </div>
            </a>
          </Reveal>
          <Reveal>
            <a
              href={`https://wa.me/${digitsOnly(company.contact.whatsapp)}`}
              target="_blank"
              rel="noreferrer"
              className="group flex h-full flex-col gap-6 rounded-[var(--radius-card)] border border-border bg-surface p-7 transition-colors hover:border-ink/20"
            >
              <MessageCircle size={22} strokeWidth={1.6} className="text-foreground-secondary" />
              <div>
                <p className="text-[13.5px] font-medium text-foreground-muted">واتساب</p>
                <p dir="ltr" className="mt-1 text-right text-[16px] font-medium text-foreground">{company.contact.whatsapp}</p>
              </div>
            </a>
          </Reveal>
          <Reveal>
            <a
              href={`mailto:${company.contact.email}`}
              className="group flex h-full flex-col gap-6 rounded-[var(--radius-card)] border border-border bg-surface p-7 transition-colors hover:border-ink/20"
            >
              <Mail size={22} strokeWidth={1.6} className="text-foreground-secondary" />
              <div>
                <p className="text-[13.5px] font-medium text-foreground-muted">البريد الإلكتروني</p>
                <p className="mt-1 text-[16px] font-medium text-foreground">{company.contact.email}</p>
              </div>
            </a>
          </Reveal>
          <Reveal>
            <div className="flex h-full flex-col gap-6 rounded-[var(--radius-card)] border border-border bg-surface p-7">
              <Clock size={22} strokeWidth={1.6} className="text-foreground-secondary" />
              <div>
                <p className="text-[13.5px] font-medium text-foreground-muted">ساعات العمل</p>
                <p className="mt-1 text-[16px] font-medium text-foreground">{company.contact.hours}</p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-4">
          <div className="flex items-start gap-4 rounded-[var(--radius-card)] border border-border bg-surface p-7 sm:items-center">
            <MapPin size={22} strokeWidth={1.6} className="mt-0.5 shrink-0 text-foreground-secondary sm:mt-0" />
            <div>
              <p className="text-[13.5px] font-medium text-foreground-muted">العنوان</p>
              <p className="mt-1 text-[16px] font-medium text-foreground">{company.contact.address}</p>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
