import {
  BadgeCheck,
  Briefcase,
  FileText,
  FolderKanban,
  Gauge,
  LayoutGrid,
  Settings,
  ShieldAlert,
  User,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { DashboardShell } from '../components/DashboardShell.jsx'
import { students } from '../data/users.js'
import { StatusBadge } from '../ui/StatusBadge.jsx'
import { formatIDR } from '../lib/format.js'

const navItems = [
  { label: 'Dashboard', shortLabel: 'Home', to: '/dashboard/student', icon: Gauge },
  { label: 'Browse Project', shortLabel: 'Project', to: '/projects', icon: LayoutGrid },
  { label: 'Lamaran Saya', shortLabel: 'Lamaran', to: '/dashboard/student?tab=applications', icon: FileText },
  { label: 'Project Aktif', shortLabel: 'Aktif', to: '/dashboard/student?tab=active', icon: FolderKanban },
  { label: 'Portofolio', shortLabel: 'Profil', to: '/profile/stu_rian', icon: User },
  { label: 'Verifikasi', shortLabel: 'Verify', to: '/verification', icon: BadgeCheck },
  { label: 'Pengaturan', shortLabel: 'Setting', to: '/dashboard/student?tab=settings', icon: Settings },
]

export function StudentDashboardPage() {
  const me = students[0]
  const isVerified = me.verifiedStatus === 'verified'

  const activity = [
    { id: 1, title: 'Lamaran terkirim', detail: 'Desain Feed Instagram 12 Post', time: 'Hari ini' },
    { id: 2, title: 'Deliverable diterima', detail: 'Template Balasan CS (WhatsApp)', time: '3 hari lalu' },
    { id: 3, title: 'Review masuk', detail: 'Rating 5 dari KueKita.id', time: '1 minggu lalu' },
  ]

  return (
    <DashboardShell title="Dashboard Mahasiswa" navItems={navItems}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <div className="text-sm text-slate-600">Halo,</div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              {me.name}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-600">
              <span className="font-medium text-slate-900">{me.university}</span>
              <span className="text-slate-300">•</span>
              <span>{me.major}</span>
              <span className="text-slate-300">•</span>
              <StatusBadge variant={isVerified ? 'verified' : 'pending'}>
                {isVerified ? 'Terverifikasi' : 'Belum terverifikasi'}
              </StatusBadge>
            </div>
          </div>
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
            <Link to="/projects" className="btn-secondary w-full sm:w-auto">
              Browse project
            </Link>
            <Link to={`/profile/${me.id}`} className="btn-primary w-full sm:w-auto">
              Lihat profil
            </Link>
          </div>
        </div>

        {!isVerified ? (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-2xl bg-amber-100 p-2 text-amber-800">
                  <ShieldAlert className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-amber-900">
                    Verifikasi dibutuhkan untuk melamar project tertentu.
                  </div>
                  <div className="mt-1 text-sm text-amber-900/80">
                    Upload KTM atau email kampus agar bisnis lebih percaya dan proses escrow lebih aman.
                  </div>
                </div>
              </div>
              <Link to="/verification" className="btn-secondary w-full border-amber-200 bg-white text-amber-900 hover:bg-amber-50 sm:w-auto">
                Verifikasi sekarang
              </Link>
            </div>
          </div>
        ) : null}

        <div className="grid gap-4 lg:grid-cols-4">
          <StatCard label="Project selesai" value={String(me.completedProjects)} icon={Briefcase} />
          <StatCard label="Penghasilan" value={formatIDR(me.earnings)} icon={LayoutGrid} />
          <StatCard label="Rating" value={me.ratingAvg.toFixed(1)} icon={BadgeCheck} />
          <StatCard label="Project aktif" value={String(me.activeProjects)} icon={FolderKanban} />
        </div>

        <div className="grid gap-4 lg:grid-cols-12">
          <div className="card p-6 lg:col-span-7">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-slate-900">Aktivitas terbaru</div>
              <StatusBadge variant="neutral">7 hari</StatusBadge>
            </div>
            <div className="mt-4 grid gap-2">
              {activity.map((a) => (
                <div key={a.id} className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold text-slate-900">{a.title}</div>
                      <div className="mt-1 text-sm text-slate-600">{a.detail}</div>
                    </div>
                    <div className="text-xs font-medium text-slate-500">{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-6 lg:col-span-5">
            <div className="text-sm font-semibold text-slate-900">Quick links</div>
            <div className="mt-4 grid gap-2">
              <QuickLink
                to="/projects"
                title="Browse project"
                desc="Temukan micro-task sesuai tier dan deadline."
              />
              <QuickLink
                to={`/profile/${me.id}`}
                title="Bangun portofolio"
                desc="Tampilkan work yang selesai sebagai verified work."
              />
              <QuickLink
                to="/verification"
                title="Verifikasi akun"
                desc="Naikkan trust lewat KTM/email kampus."
              />
            </div>
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

function QuickLink({ to, title, desc }) {
  return (
    <Link to={to} className="rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-slate-300">
      <div className="text-sm font-semibold text-slate-900">{title}</div>
      <div className="mt-1 text-sm text-slate-600">{desc}</div>
    </Link>
  )
}

