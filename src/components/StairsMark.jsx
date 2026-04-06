import { cn } from '../lib/cn.js'

export function StairsMark({ className }) {
  return (
    <span
      className={cn(
        'inline-flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900 text-white',
        className,
      )}
      aria-hidden="true"
      title="StairsLife"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
        <path
          d="M5 17h4v-3h4v-3h4V7h2v12H5v-2Z"
          fill="currentColor"
          opacity="0.95"
        />
      </svg>
    </span>
  )
}

