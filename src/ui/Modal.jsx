import { X } from 'lucide-react'
import { cn } from '../lib/cn.js'

export function Modal({ open, title, description, children, onClose, widthClass = 'max-w-lg' }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-[60]">
      <div
        className="absolute inset-0 bg-slate-900/30 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="absolute inset-0 overflow-y-auto p-4">
        <div className={cn('mx-auto w-full rounded-2xl border border-slate-200 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.18)]', widthClass)}>
          <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-4">
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold text-slate-900">{title}</div>
              {description ? (
                <div className="mt-1 text-sm text-slate-600">{description}</div>
              ) : null}
            </div>
            <button className="btn-ghost -mr-1 -mt-1" onClick={onClose} aria-label="Tutup">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="px-5 py-4">{children}</div>
        </div>
      </div>
    </div>
  )
}

