import { cn } from '../lib/cn.js'

export function SkillBadge({ children, className }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700',
        className,
      )}
    >
      {children}
    </span>
  )
}

