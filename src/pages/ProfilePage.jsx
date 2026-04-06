import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { BadgeCheck, Star } from 'lucide-react'
import { PageShell } from '../components/PageShell.jsx'
import { usersById } from '../data/users.js'
import { reviews } from '../data/reviews.js'
import { projectsById } from '../data/projects.js'
import { SkillBadge } from '../ui/SkillBadge.jsx'
import { StatusBadge } from '../ui/StatusBadge.jsx'
import { formatDateID, formatIDRRange } from '../lib/format.js'

export function ProfilePage() {
  const { id } = useParams()
  const user = usersById[id]

  const portfolioItems = useMemo(() => {
    // dummy mapping to some projects
    const picks = ['prj_ig_kue', 'prj_excel_cleanup', 'prj_cs_template', 'prj_figma_components']
    return picks
      .map((pid) => projectsById[pid])
      .filter(Boolean)
      .map((p) => ({ ...p, verifiedWork: true }))
  }, [])

  const userReviews = useMemo(() => reviews.filter((r) => r.studentId === id), [id])

  if (!user || user.role !== 'student') {
    return (
      <PageShell>
        <div className="card p-10">
          <div className="text-sm font-semibold text-slate-900">Profil tidak ditemukan</div>
          <div className="mt-2 text-sm text-slate-600">
            Halaman ini hanya menampilkan profil mahasiswa (dummy).
          </div>
          <div className="mt-5">
            <Link className="btn-secondary" to="/dashboard/student">
              Kembali ke dashboard
            </Link>
          </div>
        </div>
      </PageShell>
    )
  }

  const verified = user.verifiedStatus === 'verified'

  const skills = user.skillTier === 'Advanced'
    ? ['UI/UX', 'Figma', 'Auto layout', 'Copy micro', 'Design system']
    : user.skillTier === 'Intermediate'
      ? ['Canva', 'Desain Konten', 'Copywriting ringan', 'Branding']
      : ['Google Sheets', 'Data entry', 'Teliti', 'Komunikasi']

  return (
    <PageShell>
      <div className="grid gap-6">
        <div className="card p-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-lg font-semibold text-slate-900">
                {user.avatar?.value ?? user.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-semibold tracking-tight text-slate-900">{user.name}</h1>
                  {verified ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                      <BadgeCheck className="h-3.5 w-3.5" /> Verified
                    </span>
                  ) : (
                    <StatusBadge variant="pending">Pending verification</StatusBadge>
                  )}
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-600">
                  <span className="font-medium text-slate-900">{user.university}</span>
                  <span className="text-slate-300">•</span>
                  <span>{user.major}</span>
                  <span className="text-slate-300">•</span>
                  <StatusBadge variant="active">{user.skillTier}</StatusBadge>
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm text-slate-700">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="font-semibold text-slate-900">{user.ratingAvg.toFixed(1)}</span>
                  <span className="text-slate-500">rating</span>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
              <Link className="btn-secondary w-full sm:w-auto" to="/projects">
                Browse project
              </Link>
              <Link className="btn-primary w-full sm:w-auto" to="/verification">
                Verifikasi
              </Link>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="text-sm font-semibold text-slate-900">Skills</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {skills.map((s) => (
              <SkillBadge key={s}>{s}</SkillBadge>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="card p-6">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-slate-900">Portofolio</div>
                <StatusBadge variant="neutral">Verified work</StatusBadge>
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {portfolioItems.map((p) => (
                  <Link key={p.id} to={`/projects/${p.id}`} className="rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-slate-300">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="truncate text-sm font-semibold text-slate-900">{p.title}</div>
                        <div className="mt-1 text-sm text-slate-600">{p.companyName}</div>
                      </div>
                      <span className="inline-flex rounded-full bg-slate-900 px-3 py-1 text-xs font-medium text-white">
                        Verified
                      </span>
                    </div>
                    <div className="mt-3 text-xs text-slate-500">
                      Budget: <span className="font-medium text-slate-700">{formatIDRRange(p.budgetMin, p.budgetMax)}</span>
                    </div>
                    <div className="mt-1 text-xs text-slate-500">
                      Deadline: <span className="font-medium text-slate-700">{formatDateID(p.deadline)}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="card p-6">
              <div className="text-sm font-semibold text-slate-900">Review dari bisnis</div>
              <div className="mt-4 grid gap-3">
                {userReviews.length ? (
                  userReviews.map((r) => (
                    <div key={r.id} className="rounded-2xl border border-slate-200 bg-white p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div className="text-sm font-semibold text-slate-900">
                          {projectsById[r.projectId]?.companyName ?? 'Bisnis'}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-slate-600">
                          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                          <span className="font-medium">{r.rating}</span>
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-slate-700">“{r.comment}”</div>
                      <div className="mt-2 text-xs text-slate-500">{formatDateID(r.createdAt)}</div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
                    Belum ada review.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  )
}

