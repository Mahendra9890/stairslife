import { useMemo, useState } from 'react'
import { X } from 'lucide-react'
import { cn } from '../lib/cn.js'

export function TagInput({
  label,
  placeholder = 'Ketik lalu Enter…',
  value,
  onChange,
  suggestions = [],
  hint,
}) {
  const [input, setInput] = useState('')

  const filteredSuggestions = useMemo(() => {
    const q = input.trim().toLowerCase()
    if (!q) return suggestions.slice(0, 6)
    return suggestions
      .filter((s) => s.toLowerCase().includes(q) && !value.includes(s))
      .slice(0, 6)
  }, [input, suggestions, value])

  function addTag(raw) {
    const t = raw.trim()
    if (!t) return
    if (value.includes(t)) return
    onChange([...value, t])
    setInput('')
  }

  function removeTag(t) {
    onChange(value.filter((x) => x !== t))
  }

  return (
    <div>
      {label ? (
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {label}
        </label>
      ) : null}
      <div className="mt-2 rounded-2xl border border-slate-200 bg-white p-2">
        <div className="flex flex-wrap gap-2">
          {value.map((t) => (
            <span
              key={t}
              className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700"
            >
              {t}
              <button
                type="button"
                className="rounded-full p-1 text-slate-500 hover:bg-white"
                onClick={() => removeTag(t)}
                aria-label={`Hapus ${t}`}
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                addTag(input)
              }
              if (e.key === ',' ) {
                e.preventDefault()
                addTag(input)
              }
              if (e.key === 'Backspace' && !input && value.length) {
                removeTag(value[value.length - 1])
              }
            }}
            placeholder={placeholder}
            className="min-w-[180px] flex-1 bg-transparent px-2 py-1 text-sm text-slate-900 outline-none placeholder:text-slate-400"
          />
        </div>
      </div>

      {filteredSuggestions.length ? (
        <div className="mt-2 flex flex-wrap gap-2">
          {filteredSuggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => addTag(s)}
              className={cn(
                'rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 transition hover:bg-slate-50',
              )}
            >
              + {s}
            </button>
          ))}
        </div>
      ) : null}

      {hint ? <div className="mt-2 text-xs text-slate-500">{hint}</div> : null}
    </div>
  )
}

