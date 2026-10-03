import type { ReactNode } from 'react'

export default function EmptyState({
  title,
  body,
  action,
  variant = 'default',
}: {
  title: string
  body?: string
  action?: ReactNode
  variant?: 'default' | 'catalog' | 'shelf'
}) {
  if (variant === 'shelf') {
    return (
      <div className="sh-empty" role="status">
        <p className="sh-empty__title">{title}</p>
        {body ? <p className="sh-empty__body">{body}</p> : null}
        {action ? <div className="mt-4">{action}</div> : null}
      </div>
    )
  }

  if (variant === 'catalog') {
    return (
      <div className="cp-empty" role="status">
        <p className="cp-empty__title">{title}</p>
        {body ? <p className="cp-empty__body">{body}</p> : null}
        {action ? <div className="cp-empty__action">{action}</div> : null}
      </div>
    )
  }

  return (
    <div className="catalog-empty" role="status">
      <p className="catalog-empty__title">{title}</p>
      {body ? <p className="catalog-empty__body">{body}</p> : null}
      {action ? <div className="catalog-empty__action">{action}</div> : null}
    </div>
  )
}
