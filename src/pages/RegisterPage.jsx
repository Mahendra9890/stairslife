import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Building2, GraduationCap, ChevronLeft, ChevronRight, Check } from 'lucide-react'
import { Navbar } from '../components/Navbar.jsx'
import { Footer } from '../components/Footer.jsx'
import { StepIndicator } from '../ui/StepIndicator.jsx'
import { cn } from '../lib/cn.js'

export function RegisterPage() {
  const navigate = useNavigate()
  const steps = useMemo(() => ['Pilih peran', 'Data akun', 'Ringkasan'], [])

  const [step, setStep] = useState(1)
  const [role, setRole] = useState('student')
  const [form, setForm] = useState({
    // student
    fullName: '',
    university: '',
    major: '',
    // business
    companyName: '',
    ownerName: '',
    phone: '',
    address: '',
    // shared
    email: '',
    password: '',
  })

  function update(key, value) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function next() {
    setStep((s) => Math.min(3, s + 1))
  }
  function back() {
    setStep((s) => Math.max(1, s - 1))
  }

  function submit(e) {
    e.preventDefault()
    alert('Akun berhasil dibuat (dummy).')
    navigate('/login')
  }

  const requiredOk = useMemo(() => {
    if (step === 1) return true
    if (step === 2) {
      if (role === 'student') {
        return (
          form.fullName.trim() &&
          form.university.trim() &&
          form.major.trim() &&
          form.email.trim() &&
          form.password.trim()
        )
      }
      return (
        form.companyName.trim() &&
        form.ownerName.trim() &&
        form.email.trim() &&
        form.phone.trim() &&
        form.address.trim() &&
        form.password.trim()
      )
    }
    return true
  }, [role, step, form])

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar variant="app" />
      <main className="container-app py-10">
        <div className="mx-auto w-full max-w-2xl">
          <div className="card p-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                  Buat akun StairsLife
                </h1>
                <p className="mt-2 text-sm text-slate-600">
                  Multi-step form sesuai kebutuhan Mahasiswa dan Bisnis.
                </p>
              </div>
              <div className="sm:pt-1">
                <Link className="btn-ghost" to="/login">
                  Sudah punya akun?
                </Link>
              </div>
            </div>

            <div className="mt-6">
              <StepIndicator current={step} steps={steps} />
            </div>

            <form className="mt-6 grid gap-6" onSubmit={submit}>
              {step === 1 ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => setRole('student')}
                    className={cn(
                      'card p-5 text-left transition',
                      role === 'student'
                        ? 'border-indigo-200 bg-indigo-50'
                        : 'hover:border-slate-300',
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="rounded-2xl bg-white p-3 text-slate-900">
                        <GraduationCap className="h-5 w-5" />
                      </div>
                      {role === 'student' ? (
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-xl bg-indigo-500 text-white">
                          <Check className="h-4 w-4" />
                        </span>
                      ) : null}
                    </div>
                    <div className="mt-4 text-sm font-semibold text-slate-900">
                      Mahasiswa
                    </div>
                    <div className="mt-2 text-sm text-slate-600">
                      Cari micro-task, bangun portofolio, dan dapatkan penghasilan tambahan.
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRole('business')}
                    className={cn(
                      'card p-5 text-left transition',
                      role === 'business'
                        ? 'border-indigo-200 bg-indigo-50'
                        : 'hover:border-slate-300',
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="rounded-2xl bg-white p-3 text-slate-900">
                        <Building2 className="h-5 w-5" />
                      </div>
                      {role === 'business' ? (
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-xl bg-indigo-500 text-white">
                          <Check className="h-4 w-4" />
                        </span>
                      ) : null}
                    </div>
                    <div className="mt-4 text-sm font-semibold text-slate-900">
                      Business Owner
                    </div>
                    <div className="mt-2 text-sm text-slate-600">
                      Posting micro-task, pilih kandidat, dan bayar aman lewat escrow.
                    </div>
                  </button>
                </div>
              ) : null}

              {step === 2 ? (
                <div className="grid gap-4">
                  {role === 'student' ? (
                    <>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field
                          label="Nama lengkap"
                          value={form.fullName}
                          onChange={(v) => update('fullName', v)}
                          placeholder="Contoh: Rian Pratama"
                          required
                        />
                        <Field
                          label="Universitas"
                          value={form.university}
                          onChange={(v) => update('university', v)}
                          placeholder="Contoh: BINUS University"
                          required
                        />
                      </div>
                      <Field
                        label="Jurusan"
                        value={form.major}
                        onChange={(v) => update('major', v)}
                        placeholder="Contoh: Desain Komunikasi Visual"
                        required
                      />
                      <Field
                        label="Email"
                        hint="Disarankan gunakan email kampus (.ac.id) untuk mempercepat verifikasi."
                        value={form.email}
                        onChange={(v) => update('email', v)}
                        placeholder="nama@kampus.ac.id"
                        required
                        type="email"
                      />
                      <Field
                        label="Password"
                        value={form.password}
                        onChange={(v) => update('password', v)}
                        placeholder="Minimal 8 karakter"
                        required
                        type="password"
                      />
                    </>
                  ) : (
                    <>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field
                          label="Nama perusahaan"
                          value={form.companyName}
                          onChange={(v) => update('companyName', v)}
                          placeholder="Contoh: KueKita.id"
                          required
                        />
                        <Field
                          label="Nama pemilik"
                          value={form.ownerName}
                          onChange={(v) => update('ownerName', v)}
                          placeholder="Contoh: Sarah Wijaya"
                          required
                        />
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field
                          label="Email"
                          value={form.email}
                          onChange={(v) => update('email', v)}
                          placeholder="owner@perusahaan.com"
                          required
                          type="email"
                        />
                        <Field
                          label="Nomor HP"
                          value={form.phone}
                          onChange={(v) => update('phone', v)}
                          placeholder="Contoh: 08xxxxxxxxxx"
                          required
                        />
                      </div>
                      <Field
                        label="Alamat"
                        value={form.address}
                        onChange={(v) => update('address', v)}
                        placeholder="Alamat kantor / operasional"
                        required
                      />
                      <Field
                        label="Password"
                        value={form.password}
                        onChange={(v) => update('password', v)}
                        placeholder="Minimal 8 karakter"
                        required
                        type="password"
                      />
                    </>
                  )}
                </div>
              ) : null}

              {step === 3 ? (
                <div className="card-muted p-5">
                  <div className="text-sm font-semibold text-slate-900">Ringkasan</div>
                  <div className="mt-3 grid gap-2 text-sm text-slate-700">
                    <Row label="Peran" value={role === 'student' ? 'Mahasiswa' : 'Business Owner'} />
                    {role === 'student' ? (
                      <>
                        <Row label="Nama" value={form.fullName || '-'} />
                        <Row label="Universitas" value={form.university || '-'} />
                        <Row label="Jurusan" value={form.major || '-'} />
                      </>
                    ) : (
                      <>
                        <Row label="Perusahaan" value={form.companyName || '-'} />
                        <Row label="Pemilik" value={form.ownerName || '-'} />
                        <Row label="Telepon" value={form.phone || '-'} />
                        <Row label="Alamat" value={form.address || '-'} />
                      </>
                    )}
                    <Row label="Email" value={form.email || '-'} />
                  </div>
                  <div className="mt-4 text-xs text-slate-500">
                    Dengan membuat akun, kamu setuju pada Syarat & Ketentuan (dummy).
                  </div>
                </div>
              ) : null}

              <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-between">
                <button
                  type="button"
                  onClick={back}
                  className={cn('btn-secondary', step === 1 && 'invisible')}
                >
                  <ChevronLeft className="h-4 w-4" /> Kembali
                </button>
                {step < 3 ? (
                  <button
                    type="button"
                    onClick={next}
                    disabled={!requiredOk}
                    className={cn('btn-primary', !requiredOk && 'opacity-60')}
                  >
                    Lanjut <ChevronRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button type="submit" className="btn-primary">
                    Submit
                  </button>
                )}
              </div>
            </form>

            <div className="mt-6 text-center text-sm text-slate-600">
              Sudah punya akun?{' '}
              <Link className="font-semibold text-indigo-600 hover:text-indigo-700" to="/login">
                Masuk
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

function Field({ label, hint, value, onChange, placeholder, required, type = 'text' }) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/20"
      />
      {hint ? <div className="mt-2 text-xs text-slate-500">{hint}</div> : null}
    </div>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="text-slate-500">{label}</div>
      <div className="font-medium text-slate-900">{value}</div>
    </div>
  )
}

