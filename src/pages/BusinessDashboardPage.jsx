import {
  CreditCard,
  FileText,
  Gauge,
  LayoutGrid,
  Settings,
  Users,
  FolderKanban,
  Plus,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { DashboardShell } from '../components/DashboardShell.jsx'
import { StatusBadge } from '../ui/StatusBadge.jsx'
import { businesses, students } from '../data/users.js'
import { projects } from '../data/projects.js'
import { formatIDR } from '../lib/format.js'

const navItems = [
  { label: 'Dashboard', shortLabel: 'Home', to: '/dashboard/business', icon: Gauge },
  { label: 'Project Saya', shortLabel: 'Project', to: '/dashboard/business?tab=projects', icon: LayoutGrid },
  { label: 'Lamaran Masuk', shortLabel: 'Lamaran', to: '/dashboard/business?tab=applications', icon: Users },
  { label: 'Kontrak Aktif', shortLabel: 'Kontrak', to: '/dashboard/business?tab=contracts', icon: FolderKanban },
  { label: 'Pembayaran', shortLabel: 'Bayar', to: '/dashboard/business?tab=payments', icon: CreditCard },
  { label: 'Pengaturan', shortLabel: 'Setting', to: '/dashboard/business?tab=settings', icon: Settings },
]

const statusVariant = {
  Submitted: 'pending',
  Shortlisted: 'active',
  Accepted: 'verified',
  Rejected: 'rejected',
}

export function BusinessDashboardPage() {
  const me = businesses[0]

  const recentApplications = [
    { id: 'app_1', studentId: students[0].id, projectId: projects[0].id, date: '2026-04-02', status: 'Submitted' },
    { id: 'app_2', studentId: students[2].id, projectId: projects[1].id, date: '2026-04-01', status: 'Shortlisted' },
    { id: 'app_3', studentId: students[1].id, projectId: projects[4].id, date: '2026-03-28', status: 'Accepted' },
    { id: 'app_4', studentId: students[0].id, projectId: projects[9].id, date: '2026-03-21', status: 'Rejected' },
  ]

  const stats = {
    activeProjects: 3,
    totalApplicants: 18,
    completedProjects: 11,
    totalSpent: 18500000,
  }

  return (
    <DashboardShell title="Dashboard Bisnis" navItems={navItems}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <div className="text-sm text-slate-600">Halo,</div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              {me.companyName}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-600">
              <span className="font-medium text-slate-900">{me.ownerName}</span>
              <span className="text-slate-300">•</span>
              <span>{me.location}</span>
              <span className="text-slate-300">•</span>
              <StatusBadge variant="active">UMKM / Startup</StatusBadge>
            </div>
          </div>
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
            <Link to="/post-project" className="btn-primary w-full sm:w-auto">
              <Plus className="h-4 w-4" /> Post New Project
            </Link>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-4">
          <StatCard label="Project aktif" value={String(stats.activeProjects)} icon={FolderKanban} />
          <StatCard label="Total pelamar" value={String(stats.totalApplicants)} icon={Users} />
          <StatCard label="Project selesai" value={String(stats.completedProjects)} icon={LayoutGrid} />
          <StatCard label="Total spent" value={formatIDR(stats.totalSpent)} icon={CreditCard} />
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-sm font-semibold text-slate-900">Lamaran terbaru</div>
              <div className="mt-1 text-sm text-slate-600">
                Snapshot dummy untuk menunjukkan tabel dan status badge.
              </div>
            </div>
            <StatusBadge variant="neutral">14 hari</StatusBadge>
          </div>

          <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="grid grid-cols-12 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <div className="col-span-4">Mahasiswa</div>
              <div className="col-span-4">Project</div>
              <div className="col-span-2">Tanggal</div>
              <div className="col-span-2 text-right">Status</div>
            </div>
            <div className="divide-y divide-slate-200">
              {recentApplications.map((a) => {
                const stu = students.find((s) => s.id === a.studentId)
                const prj = projects.find((p) => p.id === a.projectId)
                return (
                  <div key={a.id} className="grid grid-cols-12 items-center px-4 py-3 text-sm">
                    <div className="col-span-4">
                      <div className="font-semibold text-slate-900">{stu?.name ?? '-'}</div>
                      <div className="mt-0.5 text-xs text-slate-600">
                        {stu?.university ?? '-'}
                      </div>
                    </div>
                    <div className="col-span-4">
                      <div className="font-medium text-slate-900">{prj?.title ?? '-'}</div>
                      <div className="mt-0.5 text-xs text-slate-600">{prj?.category ?? '-'}</div>
                    </div>
                    <div className="col-span-2 text-slate-600">{a.date}</div>
                    <div className="col-span-2 flex justify-end">
                      <StatusBadge variant={statusVariant[a.status] ?? 'neutral'}>{a.status}</StatusBadge>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between">
            <Link className="btn-ghost" to="/projects">
              <FileText className="h-4 w-4" /> Lihat browse project
            </Link>
            <Link className="btn-secondary" to="/post-project">
              Posting project baru
            </Link>
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}

function StatCard({ label, value, icon: Icon }) {
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {label}
          </div>
          <div className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{value}</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-slate-900">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  )
}

