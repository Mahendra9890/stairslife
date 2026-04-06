import { Star } from 'lucide-react'
import { cn } from '../lib/cn.js'

export function AvatarWithRating({ avatar, name, rating, className }) {
  const initials = avatar?.type === 'initials' ? avatar.value : (name || '?').slice(0, 2).toUpperCase()
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-900">
        {initials}
      </div>
      <div className="min-w-0">
        <div className="truncate text-sm font-semibold text-slate-900">{name}</div>
        {rating != null ? (
          <div className="mt-1 flex items-center gap-1 text-xs text-slate-600">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span className="font-medium">{rating.toFixed(1)}</span>
          </div>
        ) : null}
      </div>
    </div>
  )
}

