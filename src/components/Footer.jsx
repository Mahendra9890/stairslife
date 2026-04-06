import { Link } from 'react-router-dom'
import { StairsMark } from './StairsMark.jsx'

export function Footer() {
  return (
    <footer className="border-t border-slate-200/70 bg-white">
      <div className="container-app py-10">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <StairsMark />
              <div>
                <div className="text-sm font-semibold text-slate-900">
                  StairsLife
                </div>
                <div className="text-sm text-slate-600">
                  Marketplace micro-task yang aman untuk mahasiswa & UMKM.
                </div>
              </div>
            </div>
            <div className="mt-4 text-sm text-slate-500">
              Verifikasi mahasiswa, escrow, kontrak digital, dan portofolio otomatis—dibuat
              agar kolaborasi terasa kredibel dan bebas drama.
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3 lg:col-span-7">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Produk
              </div>
              <div className="mt-3 grid gap-2 text-sm">
                <Link className="text-slate-600 hover:text-slate-900" to="/projects">
                  Cari Project
                </Link>
                <Link className="text-slate-600 hover:text-slate-900" to="/post-project">
                  Posting Project
                </Link>
                <Link className="text-slate-600 hover:text-slate-900" to="/verification">
                  Verifikasi
                </Link>
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Akun
              </div>
              <div className="mt-3 grid gap-2 text-sm">
                <Link className="text-slate-600 hover:text-slate-900" to="/login">
                  Login
                </Link>
                <Link className="text-slate-600 hover:text-slate-900" to="/register">
                  Register
                </Link>
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Legal
              </div>
              <div className="mt-3 grid gap-2 text-sm">
                <a className="text-slate-600 hover:text-slate-900" href="#">
                  Kebijakan Privasi
                </a>
                <a className="text-slate-600 hover:text-slate-900" href="#">
                  Syarat & Ketentuan
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-slate-200/70 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} StairsLife. All rights reserved.</div>
          <div className="flex items-center gap-2">
            <span className="inline-flex h-2 w-2 rounded-full bg-indigo-500" />
            Dibangun untuk ekosistem mahasiswa–UMKM Indonesia
          </div>
        </div>
      </div>
    </footer>
  )
}

