import { useMemo, useState } from 'react'
import { Navbar } from '../components/Navbar.jsx'
import { Footer } from '../components/Footer.jsx'
import { StatusBadge } from '../ui/StatusBadge.jsx'
import { Dropzone } from '../ui/Dropzone.jsx'
import { ShieldCheck, Info } from 'lucide-react'

export function VerificationPage() {
  const [status, setStatus] = useState('pending') // pending | verified | rejected
  const [docType, setDocType] = useState('KTM')
  const [file, setFile] = useState(null)

  const statusCopy = useMemo(() => {
    if (status === 'verified') {
      return {
        title: 'Terverifikasi',
        desc: 'Akun kamu sudah terverifikasi. Kamu bisa melamar project dengan badge verified.',
        badge: <StatusBadge variant="verified">Verified</StatusBadge>,
      }
    }
    if (status === 'rejected') {
      return {
        title: 'Ditolak',
        desc: 'Dokumen kamu ditolak. Silakan upload ulang dokumen yang jelas dan valid.',
        badge: <StatusBadge variant="rejected">Rejected</StatusBadge>,
      }
    }
    return {
      title: 'Menunggu review',
      desc: 'Pengajuan verifikasi sedang diproses admin. Biasanya 1–2 hari kerja (dummy).',
      badge: <StatusBadge variant="pending">Pending</StatusBadge>,
    }
  }, [status])

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar variant="app" />
      <main className="container-app py-10">
        <div className="mx-auto w-full max-w-3xl">
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Verifikasi</h1>
              <p className="mt-2 text-sm text-slate-600">
                Verifikasi meningkatkan trust bisnis dan mengurangi risiko fraud/ghosting.
              </p>
            </div>
            <div>{statusCopy.badge}</div>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="card p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-slate-900">{statusCopy.title}</div>
                    <div className="mt-2 text-sm text-slate-600">{statusCopy.desc}</div>
                  </div>
                  <div className="rounded-2xl bg-indigo-500/10 p-3 text-indigo-600">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                </div>

                <div className="mt-6 grid gap-4">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Tipe dokumen
                    </label>
                    <select
                      value={docType}
                      onChange={(e) => setDocType(e.target.value)}
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/20"
                    >
                      <option value="KTM">KTM</option>
                      <option value="Email Kampus">Email Kampus</option>
                    </select>
                  </div>

                  <Dropzone
                    label="Upload bukti"
                    accept={docType === 'KTM' ? 'image/*,.pdf' : 'image/*,.pdf'}
                    hint="Format: JPG/PNG/PDF. Pastikan terlihat jelas."
                    onFile={(f) => setFile(f)}
                  />

                  {file ? (
                    <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm">
                      <div className="font-semibold text-slate-900">File terpilih</div>
                      <div className="mt-1 text-slate-600">
                        {file.name} · {(file.size / 1024 / 1024).toFixed(2)} MB
                      </div>
                    </div>
                  ) : null}

                  <button
                    className="btn-primary w-full"
                    onClick={() => {
                      if (!file) {
                        alert('Pilih file dulu.')
                        return
                      }
                      setStatus('pending')
                      alert('Pengajuan verifikasi terkirim (dummy).')
                    }}
                    type="button"
                  >
                    Submit verifikasi
                  </button>

                  <div className="grid gap-2 text-xs text-slate-500">
                    <div className="flex items-start gap-2">
                      <Info className="mt-0.5 h-4 w-4 text-slate-400" />
                      <span>
                        Data ini hanya untuk demo UI. Tidak ada file yang benar-benar diunggah.
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-medium text-slate-700">Demo:</span>
                      <button
                        className="text-indigo-600 hover:text-indigo-700"
                        type="button"
                        onClick={() => setStatus('verified')}
                      >
                        set Verified
                      </button>
                      <span className="text-slate-300">|</span>
                      <button
                        className="text-indigo-600 hover:text-indigo-700"
                        type="button"
                        onClick={() => setStatus('rejected')}
                      >
                        set Rejected
                      </button>
                      <span className="text-slate-300">|</span>
                      <button
                        className="text-indigo-600 hover:text-indigo-700"
                        type="button"
                        onClick={() => setStatus('pending')}
                      >
                        set Pending
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="card p-6">
                <div className="text-sm font-semibold text-slate-900">Kenapa verifikasi penting?</div>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  <li className="rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="font-semibold text-slate-900">Meningkatkan trust</div>
                    <div className="mt-1 text-sm text-slate-600">
                      Bisnis lebih yakin bahwa talent adalah mahasiswa aktif yang akuntabel.
                    </div>
                  </li>
                  <li className="rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="font-semibold text-slate-900">Mengurangi fraud</div>
                    <div className="mt-1 text-sm text-slate-600">
                      Mengurangi risiko akun anonim yang kabur saat proyek berjalan.
                    </div>
                  </li>
                  <li className="rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="font-semibold text-slate-900">Proses escrow lebih kredibel</div>
                    <div className="mt-1 text-sm text-slate-600">
                      Verifikasi + escrow membuat kolaborasi terasa profesional untuk kedua pihak.
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

