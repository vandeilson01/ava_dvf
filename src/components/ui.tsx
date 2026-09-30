import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Info, TriangleAlert, X } from 'lucide-react'
import type { ReactNode } from 'react'
import { useApp } from '@/contexts/AppContext'

export const cn = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' ')

export function Button({ children, variant = 'primary', size = 'md', className, type = 'button', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'ghost' | 'danger'; size?: 'sm' | 'md' | 'lg' }) {
  return <button type={type} className={cn('inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition focus:outline-none focus:ring-4 focus:ring-teal/20 disabled:cursor-not-allowed disabled:opacity-50', variant === 'primary' && 'bg-navy text-white shadow-soft hover:bg-[#0f314b]', variant === 'secondary' && 'border border-line bg-white text-ink hover:border-teal hover:text-teal dark:border-white/10 dark:bg-white/5 dark:text-white', variant === 'ghost' && 'text-slate-500 hover:bg-slate-100 hover:text-ink dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white', variant === 'danger' && 'bg-rose-50 text-rose-700 hover:bg-rose-100 dark:bg-rose-950/40 dark:text-rose-300', size === 'sm' ? 'px-3 py-2 text-xs' : size === 'lg' ? 'px-5 py-3.5 text-sm' : 'px-4 py-2.5 text-sm', className)} {...props}>{children}</button>
}

export function Card({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('rounded-2xl border border-line/80 bg-white shadow-soft dark:border-white/10 dark:bg-[#132a3b]', className)} {...props}>{children}</div>
}

export function Badge({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'neutral' | 'success' | 'warning' | 'danger' | 'info' | 'purple' }) {
  const styles = { neutral: 'bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300', success: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300', warning: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300', danger: 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300', info: 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300', purple: 'bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:text-violet-300' }
  return <span className={cn('inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold', styles[tone])}>{children}</span>
}

export function Avatar({ initials, className }: { initials: string; className?: string }) {
  return <div className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-teal to-navy text-xs font-bold text-white', className)}>{initials}</div>
}

export function PageHeader({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description?: string; action?: ReactNode }) {
  return <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-teal">{eyebrow || 'Gestão escolar'}</p><h1 className="font-display text-3xl font-extrabold tracking-tight text-ink dark:text-white">{title}</h1>{description && <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-300">{description}</p>}</div>{action && <div className="shrink-0">{action}</div>}</div>
}

export function StatCard({ label, value, detail, icon: Icon, tone = 'navy' }: { label: string; value: string; detail: string; icon: React.ElementType; tone?: 'navy' | 'teal' | 'mint' | 'amber' }) {
  const tones = { navy: 'bg-navy/10 text-navy dark:bg-blue-950/50 dark:text-blue-300', teal: 'bg-teal/10 text-teal dark:bg-cyan-950/50 dark:text-cyan-300', mint: 'bg-mint/15 text-[#2b877b] dark:bg-emerald-950/50 dark:text-emerald-300', amber: 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300' }
  return <Card className="p-5"><div className="flex items-start justify-between gap-3"><div><p className="text-sm font-medium text-slate-500 dark:text-slate-300">{label}</p><p className="mt-2 text-3xl font-black tracking-tight text-ink dark:text-white">{value}</p></div><div className={cn('flex h-11 w-11 items-center justify-center rounded-2xl', tones[tone])}><Icon size={21} /></div></div><p className="mt-4 text-xs font-semibold text-slate-400">{detail}</p></Card>
}

export function SectionTitle({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return <div className="mb-4 flex items-start justify-between gap-3"><div><h2 className="font-display text-lg font-bold text-ink dark:text-white">{title}</h2>{description && <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{description}</p>}</div>{action}</div>
}

export function EmptyState({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return <div className="flex min-h-48 flex-col items-center justify-center rounded-2xl border border-dashed border-line px-6 text-center dark:border-white/10"><div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-teal/10 text-teal"><Info size={22} /></div><h3 className="font-bold text-ink dark:text-white">{title}</h3><p className="mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">{description}</p>{action && <div className="mt-4">{action}</div>}</div>
}

export function Modal({ open, onClose, title, description, children }: { open: boolean; onClose: () => void; title: string; description?: string; children: ReactNode }) {
  return <AnimatePresence>{open && <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => event.target === event.currentTarget && onClose()}><motion.div role="dialog" aria-modal="true" aria-labelledby="modal-title" className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl dark:bg-[#132a3b]" initial={{ opacity: 0, y: 14, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.98 }}><div className="mb-6 flex items-start justify-between gap-4"><div><h2 id="modal-title" className="font-display text-xl font-bold text-ink dark:text-white">{title}</h2>{description && <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">{description}</p>}</div><Button variant="ghost" size="sm" onClick={onClose} aria-label="Fechar"><X size={18} /></Button></div>{children}</motion.div></motion.div>}</AnimatePresence>
}

export function ToastViewport() {
  const { toasts, dismissToast } = useApp()
  return <div className="fixed right-4 top-4 z-[60] flex w-[min(380px,calc(100vw-2rem))] flex-col gap-3">{toasts.map((toast) => <motion.div key={toast.id} layout initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="rounded-2xl border border-line bg-white p-4 shadow-2xl dark:border-white/10 dark:bg-[#173f5f]"><div className="flex gap-3"><div className={cn('mt-0.5', toast.tone === 'success' ? 'text-emerald-500' : toast.tone === 'warning' ? 'text-amber-500' : 'text-cyan-300')}>{toast.tone === 'success' ? <CheckCircle2 size={18} /> : toast.tone === 'warning' ? <TriangleAlert size={18} /> : <Info size={18} />}</div><div className="min-w-0 flex-1"><p className="text-sm font-bold text-ink dark:text-white">{toast.title}</p><p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-300">{toast.message}</p></div><button className="text-slate-400 hover:text-ink dark:hover:text-white" onClick={() => dismissToast(toast.id)} aria-label="Dispensar notificação"><X size={15} /></button></div></motion.div>)}</div>
}

export function ProgressBar({ value, color = 'bg-teal' }: { value: number; color?: string }) {
  return <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10"><div className={cn('h-full rounded-full transition-all', color)} style={{ width: `${Math.min(100, Math.max(0, value))}%` }} /></div>
}
