import { useRef, useState } from 'react'
import { UploadCloud } from 'lucide-react'
import { cn } from '../lib/cn.js'

export function Dropzone({ onFile, accept, label = 'Upload file', hint }) {
  const inputRef = useRef(null)
  const [dragOver, setDragOver] = useState(false)

  function pick() {
    inputRef.current?.click()
  }

  function handleFiles(files) {
    const file = files?.[0]
    if (file) onFile(file)
  }

  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </div>
      <div
        className={cn(
          'mt-2 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed bg-white px-4 py-8 text-center transition',
          dragOver ? 'border-indigo-300 bg-indigo-50' : 'border-slate-200 hover:bg-slate-50',
        )}
        role="button"
        tabIndex={0}
        onClick={pick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') pick()
        }}
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragOver(false)
          handleFiles(e.dataTransfer.files)
        }}
      >
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-slate-900">
          <UploadCloud className="h-5 w-5" />
        </div>
        <div className="text-sm font-semibold text-slate-900">Drag & drop</div>
        <div className="text-sm text-slate-600">atau klik untuk memilih file</div>
        {hint ? <div className="mt-1 text-xs text-slate-500">{hint}</div> : null}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  )
}

