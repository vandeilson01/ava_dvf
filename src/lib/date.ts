export const SCHOOL_TODAY = '2026-10-01'

const weekday = new Intl.DateTimeFormat('pt-BR', { weekday: 'long' })
const longDate = new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })

export function formatSchoolDate(iso = SCHOOL_TODAY) {
  const [year, month, day] = iso.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  const dayName = weekday.format(date)
  return `${dayName.charAt(0).toUpperCase()}${dayName.slice(1)}, ${longDate.format(date)}`
}

export function formatShortSchoolDate(iso = SCHOOL_TODAY) {
  const [year, month, day] = iso.split('-').map(Number)
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(year, month - 1, day))
}

export function parseAnnouncementDate(value: string) {
  const months: Record<string, number> = { jan: 1, fev: 2, mar: 3, abr: 4, mai: 5, jun: 6, jul: 7, ago: 8, set: 9, out: 10, nov: 11, dez: 12 }
  const match = value.toLowerCase().match(/(\d{1,2})\s+([a-zç]{3})\s+(\d{4})/)
  if (!match) return SCHOOL_TODAY
  return `${match[3]}-${String(months[match[2]] || 10).padStart(2, '0')}-${match[1].padStart(2, '0')}`
}

export function isAnnouncementVisible(value: string) {
  return parseAnnouncementDate(value) <= SCHOOL_TODAY
}
