import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Globe } from 'lucide-react'
import { Navbar } from '../components/Navbar.jsx'
import { Footer } from '../components/Footer.jsx'
import { cn } from '../lib/cn.js'

export function LoginPage() {
  const [role, setRole] = useState('student')
  const navigate = useNavigate()

  function onSubmit(e) {
    e.preventDefault()
    if (role === 'student') navigate('/dashboard/student')
    else navigate('/dashboard/business')
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar variant="app" />
      <main className="container-app flex min-h-[calc(100vh-4rem)] items-center py-10">
        <div className="mx-auto w-full max-w-md">
          <div className="card p-6">
            <div className="text-center">
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Masuk</h1>
              <p className="mt-2 text-sm text-slate-600">
                Pilih peran akun kamu, lalu login untuk lanjut.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-2 rounded-2xl bg-slate-100 p-1">
              <button
                className={cn(
                  'btn',
                  role === 'student'
                    ? 'bg-white text-slate-900 shadow-[0_1px_0_rgba(15,23,42,0.04)]'
                    : 'bg-transparent text-slate-600 hover:bg-white/60',
                )}
                onClick={() => setRole('student')}
                type="button"
              >
                Mahasiswa
              </button>
              <button
                className={cn(
                  'btn',
                  role === 'business'
                    ? 'bg-white text-slate-900 shadow-[0_1px_0_rgba(15,23,42,0.04)]'
                    : 'bg-transparent text-slate-600 hover:bg-white/60',
                )}
                onClick={() => setRole('business')}
                type="button"
              >
                Bisnis
              </button>
            </div>

            <form className="mt-5 grid gap-4" onSubmit={onSubmit}>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Email
                </label>
                <div className="mt-2 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2">
                  <Mail className="h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder={role === 'student' ? 'nama@kampus.ac.id' : 'owner@perusahaan.com'}
                    className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Password
                </label>
                <div className="mt-2 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2">
                  <Lock className="h-4 w-4 text-slate-400" />
                  <input
                    type="password"
                    required
                    placeholder="Minimal 8 karakter"
                    className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </div>
                <div className="mt-2 text-right">
                  <a className="text-sm font-medium text-indigo-600 hover:text-indigo-700" href="#">
                    Lupa password?
                  </a>
                </div>
              </div>

              <button className="btn-primary w-full" type="submit">
                Masuk
              </button>

              <div className="relative py-2">
                <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-slate-200" />
                <div className="relative mx-auto w-fit bg-white px-3 text-xs font-medium text-slate-500">
                  atau
                </div>
              </div>

              <button className="btn-secondary w-full" type="button" onClick={() => alert('Login Google (dummy).')}>
                <Globe className="h-4 w-4" /> Lanjutkan dengan Google
              </button>
            </form>

            <div className="mt-5 text-center text-sm text-slate-600">
              Belum punya akun?{' '}
              <Link className="font-semibold text-indigo-600 hover:text-indigo-700" to="/register">
                Daftar
              </Link>
            </div>
          </div>

          <div className="mt-4 text-center text-xs text-slate-500">
            Ini adalah demo UI tanpa backend. Tombol “Masuk” akan membuka dashboard dummy.
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

