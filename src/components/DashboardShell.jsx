import { Link, useLocation } from 'react-router-dom'
import { cn } from '../lib/cn.js'
import { StairsMark } from './StairsMark.jsx'

export function DashboardShell({ title, navItems, children }) {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="hidden border-b border-slate-200/70 bg-white md:block">
        <div className="container-app flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <StairsMark />
            <div className="text-sm font-semibold text-slate-900">StairsLife</div>
          </Link>
          <div className="text-sm font-medium text-slate-600">{title}</div>
        </div>
      </div>

      <div className="container-app grid gap-6 py-6 md:grid-cols-12 md:py-10">
        <aside className="hidden md:col-span-3 md:block">
          <div className="card p-3">
            <div className="px-3 pb-2 pt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Navigasi
            </div>
            <nav className="grid gap-1">
              {navItems.map((it) => {
                const active = location.pathname === it.to
                return (
                  <Link
                    key={it.to}
                    to={it.to}
                    className={cn(
                      'flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition',
                      active
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'text-slate-700 hover:bg-slate-50',
                    )}
                  >
                    <it.icon className={cn('h-4 w-4', active ? 'text-indigo-600' : 'text-slate-500')} />
                    {it.label}
                  </Link>
                )
              })}
            </nav>
          </div>
        </aside>

        <main className="md:col-span-9">{children}</main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white md:hidden">
        <div className="container-app grid grid-cols-5 gap-1 py-2">
          {navItems.slice(0, 5).map((it) => {
            const active = location.pathname === it.to
            return (
              <Link
                key={it.to}
                to={it.to}
                className={cn(
                  'flex flex-col items-center gap-1 rounded-xl px-2 py-2 text-[11px] font-medium',
                  active ? 'text-indigo-700' : 'text-slate-600',
                )}
              >
                <it.icon className={cn('h-5 w-5', active ? 'text-indigo-600' : 'text-slate-400')} />
                <span className="truncate">{it.shortLabel ?? it.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>

      <div className="h-20 md:hidden" />
    </div>
  )
}

