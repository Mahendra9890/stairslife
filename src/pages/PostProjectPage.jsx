import { useMemo, useState } from 'react'
import { Navbar } from '../components/Navbar.jsx'
import { Footer } from '../components/Footer.jsx'
import { StepIndicator } from '../ui/StepIndicator.jsx'
import { TagInput } from '../ui/TagInput.jsx'
import { cn } from '../lib/cn.js'
import { formatIDR } from '../lib/format.js'
import { Check, ChevronLeft, ChevronRight } from 'lucide-react'

const skillSuggestions = [
  'Canva',
  'Figma',
  'Google Sheets',
  'Excel',
  'Copywriting',
  'Data entry',
  'UI/UX',
  'Notion',
  'Content planning',
  'SEO dasar',
  'Auto layout',
]

export function PostProjectPage() {
  const steps = useMemo(() => ['Basic', 'Requirements', 'Timeline & Budget', 'Review'], [])
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    title: '',
    category: 'Desain',
    description: '',
    skills: [],
    tier: 'Beginner',
    deliverableSpec: '',
    deadline: '',
    budget: '',
  })

  function set(key, value) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  const budgetNumber = useMemo(() => {
    const n = Number(String(form.budget).replace(/[^\d]/g, ''))
    return Number.isFinite(n) && n > 0 ? n : null
  }, [form.budget])

  const canNext = useMemo(() => {
    if (step === 1) return form.title.trim() && form.description.trim()
    if (step === 2) return form.skills.length > 0 && form.deliverableSpec.trim()
    if (step === 3) return !!form.deadline && !!budgetNumber
    return true
  }, [step, form, budgetNumber])

  function next() {
    setStep((s) => Math.min(4, s + 1))
  }
  function back() {
    setStep((s) => Math.max(1, s - 1))
  }

  function publish(e) {
    e.preventDefault()
    alert('Project berhasil dipublish (dummy).')
    setStep(1)
    setForm({
      title: '',
      category: 'Desain',
      description: '',
      skills: [],
      tier: 'Beginner',
      deliverableSpec: '',
      deadline: '',
      budget: '',
    })
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar variant="app" />
      <main className="container-app py-10">
        <div className="mx-auto w-full max-w-3xl">
          <div className="card p-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                  Posting Project
                </h1>
                <p className="mt-2 text-sm text-slate-600">
                  Buat scope yang jelas—nanti akan dikunci lewat kontrak digital untuk mencegah scope creep.
                </p>
              </div>
              <div className="sm:pt-1">
                <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700">
                  Step {step}/4
                </span>
              </div>
            </div>

            <div className="mt-6">
              <StepIndicator current={step} steps={steps} />
            </div>

            <form className="mt-6 grid gap-6" onSubmit={publish}>
              {step === 1 ? (
                <div className="grid gap-4">
                  <Field
                    label="Judul project"
                    placeholder='Contoh: "Desain Feed Instagram untuk Toko Kue"'
                    value={form.title}
                    onChange={(v) => set('title', v)}
                    required
                  />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Select
                      label="Kategori"
                      value={form.category}
                      onChange={(v) => set('category', v)}
                      options={['Desain', 'Administrasi', 'Copywriting', 'UI/UX', 'Data', 'Operasional', 'Web']}
                    />
                    <Select
                      label="Tipe"
                      value="Micro-task / Project-based"
                      onChange={() => {}}
                      options={['Micro-task / Project-based']}
                      disabled
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Deskripsi (rich textarea)
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={form.description}
                      onChange={(e) => set('description', e.target.value)}
                      placeholder="Jelaskan konteks singkat, tujuan, dan referensi jika ada. Gunakan bahasa yang jelas dan profesional."
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/20"
                    />
                    <div className="mt-2 text-xs text-slate-500">
                      Tips: tulis output yang diharapkan dan apa yang tidak termasuk (jika ada).
                    </div>
                  </div>
                </div>
              ) : null}

              {step === 2 ? (
                <div className="grid gap-4">
                  <TagInput
                    label="Skill dibutuhkan"
                    value={form.skills}
                    onChange={(v) => set('skills', v)}
                    suggestions={skillSuggestions}
                    hint="Gunakan Enter/koma untuk menambah. Usahakan spesifik (mis. Canva, Google Sheets, Copywriting)."
                  />
                  <Select
                    label="Skill tier"
                    value={form.tier}
                    onChange={(v) => set('tier', v)}
                    options={['Beginner', 'Intermediate', 'Advanced']}
                  />
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Deliverable / Output spec
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={form.deliverableSpec}
                      onChange={(e) => set('deliverableSpec', e.target.value)}
                      placeholder="Contoh: Link Canva + export PNG 1080x1080, guideline singkat, dan folder Drive."
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </div>
                </div>
              ) : null}

              {step === 3 ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Deadline
                    </label>
                    <input
                      required
                      type="date"
                      value={form.deadline}
                      onChange={(e) => set('deadline', e.target.value)}
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Budget (IDR)
                    </label>
                    <input
                      required
                      inputMode="numeric"
                      value={form.budget}
                      onChange={(e) => set('budget', e.target.value)}
                      placeholder="Contoh: 750000"
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/20"
                    />
                    <div className="mt-2 text-xs text-slate-500">
                      Preview: <span className="font-medium text-slate-900">{budgetNumber ? formatIDR(budgetNumber) : '-'}</span>
                    </div>
                  </div>
                </div>
              ) : null}

              {step === 4 ? (
                <div className="card-muted p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold text-slate-900">Review & Publish</div>
                      <div className="mt-1 text-sm text-slate-600">
                        Pastikan scope jelas karena akan dikunci di kontrak.
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                      <Check className="h-3.5 w-3.5" /> Siap publish
                    </span>
                  </div>
                  <div className="mt-4 grid gap-2 text-sm text-slate-700">
                    <Row label="Judul" value={form.title || '-'} />
                    <Row label="Kategori" value={form.category || '-'} />
                    <Row label="Tier" value={form.tier || '-'} />
                    <Row label="Deadline" value={form.deadline || '-'} />
                    <Row label="Budget" value={budgetNumber ? formatIDR(budgetNumber) : '-'} />
                    <div className="mt-3">
                      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Skill</div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {form.skills.length ? (
                          form.skills.map((s) => (
                            <span key={s} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700">
                              {s}
                            </span>
                          ))
                        ) : (
                          <span className="text-sm text-slate-500">-</span>
                        )}
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Deskripsi</div>
                      <div className="mt-2 whitespace-pre-wrap text-sm text-slate-700">{form.description || '-'}</div>
                    </div>
                    <div className="mt-3">
                      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Deliverable</div>
                      <div className="mt-2 whitespace-pre-wrap text-sm text-slate-700">{form.deliverableSpec || '-'}</div>
                    </div>
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

                {step < 4 ? (
                  <button
                    type="button"
                    onClick={next}
                    disabled={!canNext}
                    className={cn('btn-primary', !canNext && 'opacity-60')}
                  >
                    Lanjut <ChevronRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button type="submit" className="btn-primary">
                    Publish
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

function Field({ label, value, onChange, placeholder, required }) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </label>
      <input
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/20"
      />
    </div>
  )
}

function Select({ label, value, onChange, options, disabled }) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={cn(
          'mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/20',
          disabled && 'opacity-70',
        )}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="text-slate-500">{label}</div>
      <div className="text-right font-medium text-slate-900">{value}</div>
    </div>
  )
}

