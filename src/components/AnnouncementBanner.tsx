import { AlertCircle, CalendarDays, Megaphone } from 'lucide-react'
import { announcements } from '@/data/mocks'
import { isAnnouncementVisible } from '@/lib/date'
import { Badge, Card } from '@/components/ui'

export default function AnnouncementBanner({ compact = false }: { compact?: boolean }) {
  const visible = announcements.filter((item) => isAnnouncementVisible(item.date)).slice(0, compact ? 2 : 3)
  if (!visible.length) return null
  return <section aria-label="Comunicados ativos" className={compact ? 'mb-6' : 'mb-6'}>
    <div className="mb-3 flex items-center gap-2"><Megaphone size={17} className="text-teal" /><h2 className="text-sm font-bold text-ink dark:text-white">Comunicados importantes</h2><Badge tone="info">Até hoje</Badge></div>
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">{visible.map((item) => <Card key={item.id} className="border-teal/20 bg-teal/5 p-4 dark:bg-teal/10"><div className="flex items-start gap-3"><div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-teal shadow-sm dark:bg-white/10"><AlertCircle size={17} /></div><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><p className="text-sm font-bold text-ink dark:text-white">{item.title}</p><Badge tone={item.priority === 'Alta' ? 'danger' : item.priority === 'Média' ? 'warning' : 'neutral'}>{item.priority}</Badge></div><p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-300">{item.message}</p><p className="mt-2 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-teal"><CalendarDays size={12} /> {item.date} · {item.audience}</p></div></div></Card>)}</div>
  </section>
}
