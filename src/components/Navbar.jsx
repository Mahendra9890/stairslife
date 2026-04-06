import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { cn } from '../lib/cn.js'
import { StairsMark } from './StairsMark.jsx'

const landingLinks = [
  { label: 'Cara kerja', href: '#cara-kerja' },
  { label: 'Untuk Mahasiswa', href: '#untuk-mahasiswa' },
  { label: 'Untuk Bisnis', href: '#untuk-bisnis' },
  { label: 'Tentang', href: '#tentang' },
]

export function Navbar({ variant = 'landing' }) {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const links = useMemo(() => {
    if (variant === 'landing') return landingLinks
    return []
  }, [variant])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  function onAnchorClick(e, href) {
    if (!href?.startsWith('#')) return
    e.preventDefault()
    if (location.pathname !== '/') {
      navigate('/' + href)
      return
    }
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur">
      <div className="container-app flex h-16 items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-3">
          <StairsMark />
          <div className="leading-tight">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
              StairsLife <span className="text-xs text-slate-500">·</span>
              <span className="text-xs font-medium text-slate-600">
                Marketplace Freelance Mahasiswa
              </span>
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => onAnchorClick(e, l.href)}
              className="rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link to="/projects" className="btn-secondary">
            Cari Project
          </Link>
          <Link to="/post-project" className="btn-primary">
            Posting Project
          </Link>
        </div>

        <button
          className="btn-ghost md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Tutup menu' : 'Buka menu'}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={cn(
          'md:hidden',
          open ? 'block border-t border-slate-200/70 bg-white' : 'hidden',
        )}
      >
        <div className="container-app py-3">
          <div className="grid gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => onAnchorClick(e, l.href)}
                className="rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                {l.label}
              </a>
            ))}
          </div>
          <div className="mt-3 grid gap-2">
            <Link to="/projects" className="btn-secondary w-full">
              Cari Project
            </Link>
            <Link to="/post-project" className="btn-primary w-full">
              Posting Project
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

