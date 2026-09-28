import type { ReactNode } from 'react'

export default function EmptyState({
  title,
  body,
  action,
}: {
  title: string
  body?: string
  action?: ReactNode
}) {
  return (
    <div className="catalog-empty" role="status">
      <p className="catalog-empty__title">{title}</p>
      {body ? <p className="catalog-empty__body">{body}</p> : null}
      {action ? <div className="catalog-empty__action">{action}</div> : null}
    </div>
  )
}
