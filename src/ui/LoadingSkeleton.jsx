export function ProjectCardSkeleton() {
  return (
    <div className="card p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="h-4 w-3/4 rounded bg-slate-100" />
          <div className="mt-3 flex items-center gap-2">
            <div className="h-8 w-8 rounded-2xl bg-slate-100" />
            <div className="h-3 w-40 rounded bg-slate-100" />
          </div>
        </div>
        <div className="h-7 w-24 rounded-full bg-slate-100" />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <div className="h-7 w-20 rounded-full bg-slate-100" />
        <div className="h-7 w-24 rounded-full bg-slate-100" />
        <div className="h-7 w-16 rounded-full bg-slate-100" />
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="h-10 rounded-xl bg-slate-50" />
        <div className="h-10 rounded-xl bg-slate-50" />
      </div>
      <div className="mt-5 h-10 rounded-xl bg-indigo-500/10" />
    </div>
  )
}

