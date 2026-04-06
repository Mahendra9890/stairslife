export function formatIDRRange(min, max) {
  if (min == null && max == null) return '-'
  const f = (n) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' })
      .format(n ?? 0)
      .replace(',00', '')
  if (min != null && max != null) return `${f(min)} – ${f(max)}`
  if (min != null) return `Mulai ${f(min)}`
  return `Sampai ${f(max)}`
}

export function formatIDR(value) {
  if (value == null) return '-'
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' })
    .format(value)
    .replace(',00', '')
}

export function formatDateID(dateLike) {
  if (!dateLike) return '-'
  const d = new Date(dateLike)
  if (Number.isNaN(d.getTime())) return '-'
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(d)
}

