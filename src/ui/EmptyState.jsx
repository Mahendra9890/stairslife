import { SearchX } from 'lucide-react'

export function EmptyState({
  title = 'Belum ada data',
  description = 'Coba ubah filter atau cari kata kunci lain.',
  action,
}) {
  return (
    <div className="card p-10 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
        <SearchX className="h-5 w-5" />
      </div>
      <div className="mt-4 text-sm font-semibold text-slate-900">{title}</div>
      <div className="mt-2 text-sm text-slate-600">{description}</div>
      {action ? <div className="mt-5 flex justify-center">{action}</div> : null}
    </div>
  )
}

