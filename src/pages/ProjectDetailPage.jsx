import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CalendarDays, ChevronLeft, Coins, Lock, Send } from 'lucide-react'
import { PageShell } from '../components/PageShell.jsx'
import { projects, projectsById } from '../data/projects.js'
import { SkillBadge } from '../ui/SkillBadge.jsx'
import { StatusBadge } from '../ui/StatusBadge.jsx'
import { formatDateID, formatIDRRange } from '../lib/format.js'
import { Modal } from '../ui/Modal.jsx'
import { ProjectCard } from '../components/ProjectCard.jsx'
import { EscrowInfoTooltip } from '../ui/EscrowInfoTooltip.jsx'

export function ProjectDetailPage() {
  const { id } = useParams()
  const project = projectsById[id]
  const [open, setOpen] = useState(false)

  const similar = useMemo(() => {
    if (!project) return []
    return projects
      .filter((p) => p.id !== project.id && p.category === project.category)
      .slice(0, 4)
  }, [project])

  if (!project) {
    return (
      <PageShell>
        <div className="card p-10">
          <div className="text-sm font-semibold text-slate-900">Project tidak ditemukan</div>
          <div className="mt-2 text-sm text-slate-600">
            Link mungkin salah atau project sudah tidak tersedia.
          </div>
          <div className="mt-5">
            <Link to="/projects" className="btn-secondary">
              <ChevronLeft className="h-4 w-4" /> Kembali ke daftar project
            </Link>
          </div>
        </div>
      </PageShell>
    )
  }

  return (
    <PageShell>
      <div className="mb-6">
        <Link to="/projects" className="btn-ghost">
          <ChevronLeft className="h-4 w-4" /> Kembali
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className="card p-6">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div className="min-w-0">
                <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                  {project.title}
                </h1>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-900">
                      {project.companyAvatar?.value ?? 'UM'}
                    </div>
                    <span className="font-medium text-slate-900">{project.companyName}</span>
                  </div>
                  <span className="text-slate-300">•</span>
                  <StatusBadge variant="active">{project.category}</StatusBadge>
                </div>
              </div>
              <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
                <EscrowInfoTooltip />
                <button className="btn-primary w-full sm:w-auto" onClick={() => setOpen(true)}>
                  Apply untuk project
                </button>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                  <Coins className="h-4 w-4" /> Budget
                </div>
                <div className="mt-2 text-sm font-semibold text-slate-900">
                  {formatIDRRange(project.budgetMin, project.budgetMax)}
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                  <CalendarDays className="h-4 w-4" /> Deadline
                </div>
                <div className="mt-2 text-sm font-semibold text-slate-900">
                  {formatDateID(project.deadline)}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="text-sm font-semibold text-slate-900">Deskripsi</div>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">{project.description}</p>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <Lock className="h-4 w-4 text-indigo-500" />
                Scope of work (terkunci)
              </div>
              <div className="mt-2 text-sm text-slate-700">{project.scope}</div>
              <div className="mt-3 text-xs text-slate-500">
                Scope dikunci lewat kontrak digital untuk mencegah penambahan tugas sepihak (scope
                creep).
              </div>
            </div>

            <div className="mt-6">
              <div className="text-sm font-semibold text-slate-900">Skill dibutuhkan</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.skills.map((s) => (
                  <SkillBadge key={s}>{s}</SkillBadge>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 card p-6">
            <div className="text-sm font-semibold text-slate-900">Tentang perusahaan</div>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">{project.aboutCompany}</p>
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="card p-6">
            <div className="text-sm font-semibold text-slate-900">Ringkasan deliverable</div>
            <div className="mt-2 text-sm text-slate-700">{project.deliverableSpec}</div>
            <div className="mt-5">
              <button className="btn-primary w-full" onClick={() => setOpen(true)}>
                Apply sekarang
              </button>
              <div className="mt-3 text-xs text-slate-500">
                Dengan apply, kamu akan diminta cover letter dan estimasi tanggal delivery.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold text-slate-900">Project serupa</div>
          <Link to="/projects" className="btn-ghost">
            Lihat semua
          </Link>
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {similar.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Apply untuk project"
        description="Kirim lamaran singkat dan estimasi kamu. Scope akan dikunci saat kontrak disetujui."
      >
        <form
          className="grid gap-4"
          onSubmit={(e) => {
            e.preventDefault()
            setOpen(false)
            alert('Lamaran terkirim (dummy).')
          }}
        >
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Cover letter
            </label>
            <textarea
              required
              rows={5}
              placeholder="Perkenalkan diri singkat, pengalaman relevan, dan bagaimana kamu akan menyelesaikan tugas ini…"
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Estimasi tanggal delivery
              </label>
              <input
                required
                type="date"
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Proposed budget (opsional)
              </label>
              <input
                type="number"
                min={0}
                placeholder="Contoh: 450000"
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>
          <button className="btn-primary w-full" type="submit">
            <Send className="h-4 w-4" /> Kirim lamaran
          </button>
        </form>
      </Modal>
    </PageShell>
  )
}

