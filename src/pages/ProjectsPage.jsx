import { useEffect, useMemo, useState } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import { PageShell } from '../components/PageShell.jsx'
import { ProjectCard } from '../components/ProjectCard.jsx'
import { projects as allProjects } from '../data/projects.js'
import { EmptyState } from '../ui/EmptyState.jsx'
import { ProjectCardSkeleton } from '../ui/LoadingSkeleton.jsx'
import { cn } from '../lib/cn.js'

const tiers = ['Beginner', 'Intermediate', 'Advanced']
const categories = ['Desain', 'Administrasi', 'Copywriting', 'UI/UX', 'Data', 'Operasional', 'Web']
const deadlineOptions = [
  { label: 'Semua', value: 'all' },
  { label: '≤ 7 hari', value: '7' },
  { label: '≤ 14 hari', value: '14' },
  { label: '≤ 30 hari', value: '30' },
]
const budgetRanges = [
  { label: 'Semua', value: 'all' },
  { label: '≤ Rp 300rb', value: '300000' },
  { label: '≤ Rp 600rb', value: '600000' },
  { label: '≤ Rp 1.2jt', value: '1200000' },
]

function daysUntil(dateLike) {
  const d = new Date(dateLike)
  const now = new Date()
  const ms = d.getTime() - now.getTime()
  return Math.ceil(ms / (1000 * 60 * 60 * 24))
}

export function ProjectsPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [tier, setTier] = useState('all')
  const [budgetMax, setBudgetMax] = useState('all')
  const [deadlineInDays, setDeadlineInDays] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(t)
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return allProjects.filter((p) => {
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.companyName.toLowerCase().includes(q) ||
        p.skills.join(' ').toLowerCase().includes(q)
      const matchesCategory = category === 'all' || p.category === category
      const matchesTier = tier === 'all' || p.skillTier === tier
      const matchesBudget =
        budgetMax === 'all' || (p.budgetMax ?? p.budgetMin ?? 0) <= Number(budgetMax)
      const matchesDeadline =
        deadlineInDays === 'all' || daysUntil(p.deadline) <= Number(deadlineInDays)
      return matchesQuery && matchesCategory && matchesTier && matchesBudget && matchesDeadline
    })
  }, [query, category, tier, budgetMax, deadlineInDays])

  return (
    <PageShell>
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Browse Project
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Temukan micro-task yang sesuai skill, budget, dan deadline kamu.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-12">
        <div className="card p-4 lg:col-span-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-slate-900">Filter</div>
            <div className="rounded-xl bg-slate-50 p-2 text-slate-700">
              <SlidersHorizontal className="h-4 w-4" />
            </div>
          </div>

          <div className="mt-4">
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Pencarian
            </label>
            <div className="mt-2 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2">
              <Search className="h-4 w-4 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Judul project, UMKM, atau skill…"
                className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Kategori
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="all">Semua</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Skill tier
              </label>
              <select
                value={tier}
                onChange={(e) => setTier(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="all">Semua</option>
                {tiers.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Budget
              </label>
              <select
                value={budgetMax}
                onChange={(e) => setBudgetMax(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                {budgetRanges.map((b) => (
                  <option key={b.value} value={b.value}>
                    {b.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Deadline
              </label>
              <select
                value={deadlineInDays}
                onChange={(e) => setDeadlineInDays(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                {deadlineOptions.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            className={cn('btn-secondary mt-5 w-full', (query || category !== 'all' || tier !== 'all' || budgetMax !== 'all' || deadlineInDays !== 'all') ? '' : 'opacity-60')}
            onClick={() => {
              setQuery('')
              setCategory('all')
              setTier('all')
              setBudgetMax('all')
              setDeadlineInDays('all')
            }}
          >
            Reset filter
          </button>
        </div>

        <div className="lg:col-span-8">
          <div className="mb-4 flex items-center justify-between">
            <div className="text-sm text-slate-600">
              Menampilkan <span className="font-semibold text-slate-900">{filtered.length}</span>{' '}
              project
            </div>
          </div>

          {loading ? (
            <div className="grid gap-4 lg:grid-cols-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <ProjectCardSkeleton key={i} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <EmptyState
              title="Project tidak ditemukan"
              description="Coba gunakan kata kunci yang lebih umum atau longgarkan filter."
              action={
                <button
                  className="btn-secondary"
                  onClick={() => {
                    setQuery('')
                    setCategory('all')
                    setTier('all')
                    setBudgetMax('all')
                    setDeadlineInDays('all')
                  }}
                >
                  Reset filter
                </button>
              }
            />
          ) : (
            <div className="grid gap-4 lg:grid-cols-2">
              {filtered.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </PageShell>
  )
}

