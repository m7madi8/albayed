import type { ReactNode } from 'react'

export default function SectionHead({ title, intro, action }: { title: string; intro?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-start justify-between gap-4">
        <h2 className="display text-[1.5rem] text-foreground lg:text-[1.85rem] xl:text-[2rem]">{title}</h2>
        {action}
      </div>
      {intro && <p className="text-[15px] leading-7 text-foreground-muted">{intro}</p>}
    </div>
  )
}
