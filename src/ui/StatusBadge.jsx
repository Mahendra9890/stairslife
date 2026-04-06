import { cn } from '../lib/cn.js'

const styles = {
  verified: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  pending: 'bg-amber-50 text-amber-800 ring-amber-600/25',
  rejected: 'bg-rose-50 text-rose-700 ring-rose-600/20',
  active: 'bg-indigo-50 text-indigo-700 ring-indigo-600/20',
  neutral: 'bg-slate-50 text-slate-700 ring-slate-600/15',
}

export function StatusBadge({ variant = 'neutral', className, children }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset',
        styles[variant] ?? styles.neutral,
        className,
      )}
    >
      {children}
    </span>
  )
}

