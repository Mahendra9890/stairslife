import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  BadgeCheck,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  FileLock2,
  Layers3,
  Lock,
  ShieldCheck,
  Sparkles,
  WalletMinimal,
  X,
} from 'lucide-react'
import { Navbar } from '../components/Navbar.jsx'
import { Footer } from '../components/Footer.jsx'
import { cn } from '../lib/cn.js'
import { StatusBadge } from '../ui/StatusBadge.jsx'

function SectionHeading({ kicker, title, subtitle, align = 'left' }) {
  return (
    <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center')}>
      {kicker ? (
        <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {kicker}
        </div>
      ) : null}
      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
        {title}
      </h2>
      {subtitle ? <p className="mt-3 text-slate-600">{subtitle}</p> : null}
    </div>
  )
}

function FeatureCard({ icon: Icon, title, desc }) {
  return (
    <div className="card p-6 transition hover:border-slate-300">
      <div className="flex items-start gap-4">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-slate-900">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <div className="text-sm font-semibold text-slate-900">{title}</div>
          <div className="mt-2 text-sm leading-relaxed text-slate-600">{desc}</div>
        </div>
      </div>
    </div>
  )
}

function Step({ n, title, desc }) {
  return (
    <div className="card-muted p-5">
      <div className="flex items-start gap-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-sm font-semibold text-white">
          {n}
        </div>
        <div>
          <div className="text-sm font-semibold text-slate-900">{title}</div>
          <div className="mt-1 text-sm text-slate-600">{desc}</div>
        </div>
      </div>
    </div>
  )
}

function DashboardMock() {
  return (
    <div className="relative">
      <div className="absolute -inset-6 -z-10 rounded-[28px] bg-gradient-to-b from-indigo-500/10 to-slate-900/0 blur-2xl" />
      <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_1px_0_rgba(15,23,42,0.04)]">
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-3">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-slate-300" />
            <div className="h-2.5 w-2.5 rounded-full bg-slate-300" />
            <div className="h-2.5 w-2.5 rounded-full bg-slate-300" />
          </div>
          <div className="hidden text-xs font-medium text-slate-500 sm:block">
            Dashboard · Mahasiswa
          </div>
          <div className="h-8 w-24 rounded-xl bg-white" />
        </div>
        <div className="grid gap-4 p-5 sm:grid-cols-12">
          <div className="sm:col-span-4">
            <div className="space-y-3">
              <div className="h-9 rounded-xl bg-slate-100" />
              <div className="h-9 rounded-xl bg-slate-100" />
              <div className="h-9 rounded-xl bg-slate-100" />
              <div className="h-9 rounded-xl bg-slate-100" />
              <div className="h-9 rounded-xl bg-slate-100" />
            </div>
          </div>
          <div className="sm:col-span-8">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="h-24 rounded-2xl border border-slate-200 bg-white p-4">
                <div className="h-3 w-28 rounded bg-slate-100" />
                <div className="mt-3 h-7 w-16 rounded bg-slate-200" />
              </div>
              <div className="h-24 rounded-2xl border border-slate-200 bg-white p-4">
                <div className="h-3 w-24 rounded bg-slate-100" />
                <div className="mt-3 h-7 w-20 rounded bg-slate-200" />
              </div>
              <div className="h-24 rounded-2xl border border-slate-200 bg-white p-4">
                <div className="h-3 w-32 rounded bg-slate-100" />
                <div className="mt-3 h-7 w-14 rounded bg-slate-200" />
              </div>
              <div className="h-24 rounded-2xl border border-slate-200 bg-white p-4">
                <div className="h-3 w-20 rounded bg-slate-100" />
                <div className="mt-3 h-7 w-24 rounded bg-slate-200" />
              </div>
            </div>
            <div className="mt-3 rounded-2xl border border-slate-200 bg-white p-4">
              <div className="flex items-center justify-between">
                <div className="h-3 w-40 rounded bg-slate-100" />
                <div className="h-7 w-24 rounded-xl bg-indigo-500/10" />
              </div>
              <div className="mt-4 space-y-2">
                <div className="h-10 rounded-xl bg-slate-50" />
                <div className="h-10 rounded-xl bg-slate-50" />
                <div className="h-10 rounded-xl bg-slate-50" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function LandingPage() {
  const [howTab, setHowTab] = useState('student')

  const features = useMemo(
    () => [
      {
        icon: BadgeCheck,
        title: 'Verifikasi Mahasiswa via KTM',
        desc: 'Talent yang kamu hire benar mahasiswa aktif—lebih akuntabel dan aman untuk kerja micro-task.',
      },
      {
        icon: WalletMinimal,
        title: 'Sistem Pembayaran Escrow',
        desc: 'Dana ditahan platform sampai hasil disetujui. Mahasiswa terlindungi dari non-payment, bisnis terlindungi dari fraud.',
      },
      {
        icon: FileLock2,
        title: 'Kontrak Digital & Scope Terkunci',
        desc: 'Cakupan kerja, output, deadline, dan budget dikunci di awal agar tidak ada scope creep sepihak.',
      },
      {
        icon: Layers3,
        title: 'Micro-task / Project-Based',
        desc: 'Pekerjaan kecil dengan deadline jelas—pas untuk jadwal kuliah dan kebutuhan operasional UMKM.',
      },
      {
        icon: ShieldCheck,
        title: 'Tiered Skill System',
        desc: 'Beginner · Intermediate · Advanced. Pilih talent sesuai budget dan ekspektasi kualitas.',
      },
      {
        icon: Sparkles,
        title: 'Auto-Portfolio Generator',
        desc: 'Setiap project selesai otomatis jadi portofolio terverifikasi—bukti kerja nyata yang rapi.',
      },
    ],
    [],
  )

  const comparisonRows = useMemo(
    () => [
      { label: 'Verifikasi mahasiswa aktif', stairs: true, upwork: false, fiverr: false, freelancer: false, social: false },
      { label: 'Escrow bawaan', stairs: true, upwork: true, fiverr: true, freelancer: true, social: false },
      { label: 'Scope terkunci via kontrak', stairs: true, upwork: true, fiverr: false, freelancer: false, social: false },
      { label: 'Ramah pemula (entry-level)', stairs: true, upwork: false, fiverr: false, freelancer: false, social: true },
      { label: 'Fokus UMKM lokal', stairs: true, upwork: false, fiverr: false, freelancer: false, social: true },
      { label: 'Auto portofolio terverifikasi', stairs: true, upwork: false, fiverr: false, freelancer: false, social: false },
    ],
    [],
  )

  const testimonials = useMemo(
    () => [
      {
        name: 'Rian Pratama',
        role: 'Mahasiswa DKV (Semester 5)',
        quote:
          'Enaknya StairsLife itu scope-nya jelas dan pembayarannya aman. Aku bisa fokus ngerjain task tanpa takut “ghosting”.',
      },
      {
        name: 'Sarah Wijaya',
        role: 'Owner UMKM Online Shop',
        quote:
          'Aku butuh bantuan cepat buat kerjaan kecil. Di sini bisa cari mahasiswa sesuai level, budget-nya masuk, dan prosesnya rapi.',
      },
      {
        name: 'Dimas Alamsyah',
        role: 'Mahasiswa Ilmu Komputer',
        quote:
          'Portofolioku jadi lebih tertata karena project yang selesai otomatis masuk profil. Tinggal share link-nya saat butuh.',
      },
    ],
    [],
  )

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute -top-24 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-gradient-to-b from-indigo-500/12 to-transparent blur-3xl" />
          </div>

          <div className="container-app py-14 md:py-20">
            <div className="grid items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700">
                  <Lock className="h-3.5 w-3.5 text-indigo-500" />
                  Escrow · Verifikasi · Scope terkunci
                </div>
                <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
                  Freelance micro-task yang aman untuk mahasiswa aktif dan UMKM.
                </h1>
                <p className="mt-4 text-lg leading-relaxed text-slate-600">
                  StairsLife menghubungkan mahasiswa dengan UMKM/startup untuk project kecil berbasis
                  deadline—dengan verifikasi mahasiswa, escrow, dan kontrak digital agar kolaborasi
                  terasa profesional.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link className="btn-primary" to="/projects">
                    Cari Project <ChevronRight className="h-4 w-4" />
                  </Link>
                  <Link className="btn-secondary" to="/post-project">
                    Posting Project
                  </Link>
                </div>
                <div className="mt-7 flex flex-wrap items-center gap-3 text-sm text-slate-600">
                  <StatusBadge variant="verified">Mahasiswa terverifikasi</StatusBadge>
                  <StatusBadge variant="active">Kontrak aktif</StatusBadge>
                  <span className="text-slate-400">•</span>
                  <span>UI copy 100% Indonesia</span>
                </div>
              </div>

              <div className="lg:col-span-6">
                <DashboardMock />
              </div>
            </div>
          </div>
        </section>

        <section id="cara-kerja" className="border-t border-slate-200/70 bg-white">
          <div className="container-app py-14 md:py-20">
            <SectionHeading
              kicker="Cara kerja"
              title="Dua alur sederhana. Satu standar keamanan."
              subtitle="Mahasiswa fokus berkarya. Bisnis fokus bertumbuh. Platform yang mengunci scope dan melindungi pembayaran."
            />

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                className={cn(
                  'btn',
                  howTab === 'student'
                    ? 'bg-slate-900 text-white hover:bg-slate-900'
                    : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50',
                )}
                onClick={() => setHowTab('student')}
              >
                <BriefcaseBusiness className="h-4 w-4" />
                Untuk Mahasiswa
              </button>
              <button
                className={cn(
                  'btn',
                  howTab === 'business'
                    ? 'bg-slate-900 text-white hover:bg-slate-900'
                    : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50',
                )}
                onClick={() => setHowTab('business')}
              >
                <ShieldCheck className="h-4 w-4" />
                Untuk Bisnis
              </button>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {howTab === 'student' ? (
                <>
                  <Step
                    n={1}
                    title="Verifikasi mahasiswa"
                    desc="Upload KTM atau email kampus untuk menaikkan trust dan akses project."
                  />
                  <Step
                    n={2}
                    title="Browse & apply micro-task"
                    desc="Pilih project sesuai tier skill, budget, dan deadline. Kirim lamaran singkat."
                  />
                  <Step
                    n={3}
                    title="Kerjakan, submit, cair"
                    desc="Scope terkunci lewat kontrak. Setelah disetujui, escrow otomatis dicairkan."
                  />
                </>
              ) : (
                <>
                  <Step
                    n={1}
                    title="Posting project"
                    desc="Tulis scope, output, deadline, dan budget. Tentukan tier skill yang dibutuhkan."
                  />
                  <Step
                    n={2}
                    title="Pilih kandidat"
                    desc="Review lamaran, shortlist, dan setujui kontrak digital untuk mengunci scope."
                  />
                  <Step
                    n={3}
                    title="Deposit escrow & approve hasil"
                    desc="Dana aman di escrow. Cair hanya setelah deliverable diterima."
                  />
                </>
              )}
            </div>

            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              <div id="untuk-mahasiswa" className="card p-6">
                <div className="text-sm font-semibold text-slate-900">Untuk Mahasiswa</div>
                <div className="mt-2 text-sm text-slate-600">
                  Penghasilan tambahan, pengalaman riil, dan portofolio terverifikasi—tanpa mengganggu
                  jadwal kuliah.
                </div>
                <div className="mt-4">
                  <Link className="btn-secondary" to="/register">
                    Daftar sebagai Mahasiswa <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
              <div id="untuk-bisnis" className="card p-6">
                <div className="text-sm font-semibold text-slate-900">Untuk Bisnis</div>
                <div className="mt-2 text-sm text-slate-600">
                  Selesaikan tugas operasional kecil dengan biaya terjangkau—dengan mekanisme trust
                  yang jelas.
                </div>
                <div className="mt-4">
                  <Link className="btn-primary" to="/post-project">
                    Posting project pertama <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
              <div id="tentang" className="card-muted p-6">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <Lock className="h-4 w-4 text-indigo-500" />
                  Standar keamanan StairsLife
                </div>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 text-indigo-500" />
                    Verifikasi mahasiswa (KTM / email kampus)
                  </li>
                  <li className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 text-indigo-500" />
                    Escrow + kontrak digital (scope terkunci)
                  </li>
                  <li className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 text-indigo-500" />
                    Tier skill & portofolio otomatis
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-slate-200/70 bg-slate-50">
          <div className="container-app py-14 md:py-20">
            <SectionHeading
              kicker="Fitur utama"
              title="Dirancang untuk kredibilitas, bukan gimmick."
              subtitle="UI minimal, alur jelas, dan detail keamanan yang terasa nyata untuk kedua sisi."
            />

            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {features.map((f) => (
                <FeatureCard key={f.title} icon={f.icon} title={f.title} desc={f.desc} />
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-slate-200/70 bg-white">
          <div className="container-app py-14 md:py-20">
            <SectionHeading
              kicker="Perbandingan"
              title="Kenapa StairsLife beda?"
              subtitle="Platform global bagus—tapi sering tidak ramah pemula, dan kurang relevan untuk kebutuhan UMKM lokal."
            />

            <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200">
              <div className="grid grid-cols-6 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <div className="col-span-2 px-4 py-3">Fitur</div>
                <div className="px-4 py-3 text-slate-900">StairsLife</div>
                <div className="px-4 py-3">Upwork</div>
                <div className="px-4 py-3">Fiverr</div>
                <div className="px-4 py-3">Freelancer</div>
                <div className="hidden px-4 py-3 lg:block">Sosial Media</div>
              </div>
              <div className="divide-y divide-slate-200">
                {comparisonRows.map((r) => (
                  <div key={r.label} className="grid grid-cols-6 items-center text-sm">
                    <div className="col-span-2 px-4 py-3 text-slate-700">{r.label}</div>
                    <div className="px-4 py-3">
                      {r.stairs ? (
                        <Check className="h-4 w-4 text-indigo-500" />
                      ) : (
                        <X className="h-4 w-4 text-slate-300" />
                      )}
                    </div>
                    <div className="px-4 py-3">
                      {r.upwork ? (
                        <Check className="h-4 w-4 text-slate-700" />
                      ) : (
                        <X className="h-4 w-4 text-slate-300" />
                      )}
                    </div>
                    <div className="px-4 py-3">
                      {r.fiverr ? (
                        <Check className="h-4 w-4 text-slate-700" />
                      ) : (
                        <X className="h-4 w-4 text-slate-300" />
                      )}
                    </div>
                    <div className="px-4 py-3">
                      {r.freelancer ? (
                        <Check className="h-4 w-4 text-slate-700" />
                      ) : (
                        <X className="h-4 w-4 text-slate-300" />
                      )}
                    </div>
                    <div className="hidden px-4 py-3 lg:block">
                      {r.social ? (
                        <Check className="h-4 w-4 text-slate-700" />
                      ) : (
                        <X className="h-4 w-4 text-slate-300" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 text-sm text-slate-500">
              Catatan: “Sosial media” mengacu pada channel informal (IG/FB/Telegram) yang minim escrow dan kontrak.
            </div>
          </div>
        </section>

        <section className="border-t border-slate-200/70 bg-slate-50">
          <div className="container-app py-14 md:py-20">
            <SectionHeading
              kicker="Testimoni"
              title="Pengalaman yang terasa profesional."
              subtitle="Dummy testimonial untuk menunjukkan tone yang kredibel (student & business)."
              align="center"
            />

            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {testimonials.map((t) => (
                <div key={t.name} className="card p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-sm font-semibold text-slate-900">{t.name}</div>
                      <div className="mt-1 text-sm text-slate-600">{t.role}</div>
                    </div>
                    <div className="rounded-xl bg-indigo-500/10 p-2 text-indigo-600">
                      <Sparkles className="h-4 w-4" />
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-slate-700">“{t.quote}”</p>
                </div>
              ))}
            </div>

            <div className="mt-10 card p-6">
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    Siap naik satu langkah? Mulai dari project kecil.
                  </div>
                  <div className="mt-1 text-sm text-slate-600">
                    Buat yang butuh hasil cepat, tanpa proses rekrut yang ribet.
                  </div>
                </div>
                <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                  <Link className="btn-secondary w-full sm:w-auto" to="/projects">
                    Lihat project
                  </Link>
                  <Link className="btn-primary w-full sm:w-auto" to="/register">
                    Buat akun
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

