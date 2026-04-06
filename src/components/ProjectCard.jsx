import { Link } from 'react-router-dom'
import { CalendarDays, ChevronRight, Coins } from 'lucide-react'
import { SkillBadge } from '../ui/SkillBadge.jsx'
import { StatusBadge } from '../ui/StatusBadge.jsx'
import { formatDateID, formatIDRRange } from '../lib/format.js'
import { cn } from '../lib/cn.js'

function TierBadge({ tier }) {
  const map = {
    Beginner: 'bg-slate-50 text-slate-700 ring-slate-600/15',
    Intermediate: 'bg-indigo-50 text-indigo-700 ring-indigo-600/20',
    Advanced: 'bg-slate-900 text-white ring-slate-900/30',
  }
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset',
        map[tier] ?? map.Beginner,
      )}
    >
      {tier}
    </span>
  )
}

export function ProjectCard({ project }) {
  return (
    <div className="card p-6 transition hover:border-slate-300">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-slate-900">
            {project.title}
          </div>
          <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
            <div className="flex h-8 w-8 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-900">
              {project.companyAvatar?.value ?? 'UM'}
            </div>
            <div className="truncate">{project.companyName}</div>
          </div>
        </div>
        <TierBadge tier={project.skillTier} />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.skills.slice(0, 4).map((s) => (
          <SkillBadge key={s}>{s}</SkillBadge>
        ))}
        {project.skills.length > 4 ? (
          <StatusBadge variant="neutral">+{project.skills.length - 4}</StatusBadge>
        ) : null}
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-3">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <Coins className="h-4 w-4" /> Budget
          </div>
          <div className="mt-2 text-sm font-semibold text-slate-900">
            {formatIDRRange(project.budgetMin, project.budgetMax)}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-3">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <CalendarDays className="h-4 w-4" /> Deadline
          </div>
          <div className="mt-2 text-sm font-semibold text-slate-900">
            {formatDateID(project.deadline)}
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <StatusBadge variant="active">{project.category}</StatusBadge>
        <Link className="btn-primary" to={`/projects/${project.id}`}>
          Apply sekarang <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}

