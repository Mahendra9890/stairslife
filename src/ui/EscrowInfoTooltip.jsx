import { Info } from 'lucide-react'

export function EscrowInfoTooltip() {
  return (
    <span className="group relative inline-flex">
      <span
        className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50"
        aria-label="Info escrow"
      >
        <Info className="h-4 w-4" />
      </span>
      <span className="pointer-events-none absolute right-0 top-10 z-20 w-72 translate-y-1 rounded-2xl border border-slate-200 bg-white p-3 text-xs leading-relaxed text-slate-700 opacity-0 shadow-[0_12px_30px_rgba(15,23,42,0.08)] transition group-hover:translate-y-0 group-hover:opacity-100">
        <span className="font-semibold text-slate-900">Escrow</span> berarti dana project ditahan oleh
        platform sampai deliverable disetujui. Ini melindungi mahasiswa dari{' '}
        <span className="font-medium">non-payment</span> dan melindungi bisnis dari{' '}
        <span className="font-medium">fraud</span>.
      </span>
    </span>
  )
}

