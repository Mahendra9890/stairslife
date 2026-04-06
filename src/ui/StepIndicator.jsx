import { cn } from '../lib/cn.js'

export function StepIndicator({ current, steps }) {
  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between text-xs font-medium text-slate-600">
        <span>
          Step {current} / {steps.length}
        </span>
        <span className="truncate">{steps[current - 1]}</span>
      </div>
      <div className="h-2 w-full rounded-full bg-slate-100">
        <div
          className="h-2 rounded-full bg-indigo-500 transition-[width]"
          style={{ width: `${Math.round((current / steps.length) * 100)}%` }}
        />
      </div>
      <div className="grid grid-cols-3 gap-2 text-xs text-slate-500 sm:grid-cols-6">
        {steps.map((s, idx) => {
          const n = idx + 1
          const active = n <= current
          return (
            <div key={s} className={cn('truncate', active && 'text-slate-900')}>
              {n}. {s}
            </div>
          )
        })}
      </div>
    </div>
  )
}

