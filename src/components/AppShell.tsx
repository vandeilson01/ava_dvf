import { useState, type ComponentType } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Bell, BookOpen, CalendarDays, ChevronLeft, ClipboardList, FileBarChart, GraduationCap, LayoutDashboard, LogOut, Menu, MessageSquareText, Moon, PanelLeft, Search, Settings, Sun, Users, UserRoundCog, X } from 'lucide-react'
import type { LucideProps } from 'lucide-react'
import { useApp } from '@/contexts/AppContext'
import { hasPermission } from '@/lib/permissions'
import { Avatar, cn, ToastViewport } from '@/components/ui'
import { TourOverlay } from '@/components/TourOverlay'
import { students, teachers } from '@/data/mocks'

type NavItem = { to: string; label: string; icon: ComponentType<LucideProps>; permission: string }

const primaryNav: NavItem[] = [
  { to: '/dashboard', label: 'Visão geral', icon: LayoutDashboard, permission: 'dashboard' },
  { to: '/alunos', label: 'Alunos', icon: GraduationCap, permission: 'alunos' },
  { to: '/professores', label: 'Professores', icon: Users, permission: 'professores' },
  { to: '/turmas', label: 'Turmas', icon: PanelLeft, permission: 'turmas' },
  { to: '/disciplinas', label: 'Disciplinas', icon: BookOpen, permission: 'disciplinas' },
]

const learningNav: NavItem[] = [
  { to: '/atividades', label: 'Atividades', icon: ClipboardList, permission: 'atividades' },
  { to: '/notas', label: 'Notas', icon: FileBarChart, permission: 'notas' },
  { to: '/frequencia', label: 'Frequência', icon: UserRoundCog, permission: 'frequencia' },
]

const supportNav: NavItem[] = [
  { to: '/comunicados', label: 'Comunicados', icon: MessageSquareText, permission: 'comunicados' },
  { to: '/calendario', label: 'Calendário', icon: CalendarDays, permission: 'calendario' },
  { to: '/ia', label: 'Assistente IA', icon: Bell, permission: 'ia' },
]

const bottomNav: NavItem[] = [
  { to: '/relatorios', label: 'Relatórios', icon: FileBarChart, permission: 'relatorios' },
  { to: '/configuracoes', label: 'Configurações', icon: Settings, permission: 'configuracoes' },
]

function NavSection({ label, items, onNavigate }: { label: string; items: NavItem[]; onNavigate: () => void }) {
  return <div className="mb-6"><p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">{label}</p><div className="space-y-1">{items.map(({ to, label: itemLabel, icon: Icon }) => <NavLink key={to} to={to} onClick={onNavigate} className={({ isActive }) => cn('group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition', isActive ? 'bg-white/12 text-white shadow-sm' : 'text-slate-300 hover:bg-white/8 hover:text-white')}><Icon size={17} strokeWidth={1.9} /><span>{itemLabel}</span>{itemLabel === 'Assistente IA' && <span className="ml-auto rounded-full bg-mint px-1.5 py-0.5 text-[9px] font-black text-ink">NOVO</span>}</NavLink>)}</div></div>
}

function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { user, logout, notify } = useApp()
  const navigate = useNavigate()
  const handleLogout = () => { logout(); notify({ title: 'Sessão encerrada', message: 'Até breve. Você saiu do ambiente com segurança.', tone: 'info' }); navigate('/login') }
  const visible = (items: NavItem[]) => items.filter((item) => !user || hasPermission(user.role, item.permission))
  return <aside data-tour="sidebar" className={cn('fixed inset-y-0 left-0 z-40 flex w-[270px] flex-col bg-navy px-4 py-5 text-white transition-transform duration-300 lg:static lg:translate-x-0', open ? 'translate-x-0' : '-translate-x-full')}><div className="mb-8 flex items-center justify-between px-2"><img src="/logo.svg" alt="AVA — Centro Educa Mais" className="h-12 w-auto" /><button className="rounded-lg p-2 text-slate-300 hover:bg-white/10 lg:hidden" onClick={onClose} aria-label="Fechar menu"><X size={18} /></button></div><div className="mb-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/8 p-3"><button onClick={() => navigate('/perfil')} aria-label="Abrir gerenciamento de perfil" className="rounded-xl focus:outline-none focus:ring-4 focus:ring-teal/20"><Avatar initials={user?.initials || 'AV'} /></button><div className="min-w-0"><p className="truncate text-sm font-bold">{user?.name}</p><p className="truncate text-[11px] text-slate-300">{user?.description}</p></div></div><nav className="min-h-0 flex-1 overflow-y-auto"><NavSection label="Núcleo escolar" items={visible(primaryNav)} onNavigate={onClose} /><NavSection label="Acompanhamento" items={visible(learningNav)} onNavigate={onClose} /><NavSection label="Comunicação" items={visible(supportNav)} onNavigate={onClose} /><NavSection label="Gestão" items={visible(bottomNav)} onNavigate={onClose} /></nav><div className="mt-4 border-t border-white/10 pt-4"><button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"><LogOut size={17} /> Sair do sistema</button></div></aside>
}

export default function AppShell() {
  const { user, theme, toggleTheme } = useApp()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const location = useLocation()
  const pageName = location.pathname === '/dashboard' ? 'Visão geral' : location.pathname.split('/')[1]?.replace('-', ' ') || 'Visão geral'
  const searchItems = [...primaryNav, ...learningNav, ...supportNav, ...bottomNav].filter((item) => !user || hasPermission(user.role, item.permission)).concat(user && hasPermission(user.role, 'alunos') ? students.map((item) => ({ to: `/alunos/${item.id}`, label: item.name, icon: GraduationCap, permission: 'alunos' })) : [], user && hasPermission(user.role, 'professores') ? teachers.map((item) => ({ to: `/professores/${item.id}`, label: item.name, icon: Users, permission: 'professores' })) : [])
  const searchResults = searchQuery.trim() ? searchItems.filter((item) => item.label.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5) : []
  const goToSearchResult = (to: string) => { setSearchQuery(''); navigate(to) }
  return <div className="min-h-screen bg-cream text-ink dark:bg-[#0b1f2d] dark:text-white"><div className="flex min-h-screen"><Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} /><div className="min-w-0 flex-1"><header data-tour="header" className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-line/70 bg-cream/90 px-4 backdrop-blur-md dark:border-white/10 dark:bg-[#0b1f2d]/90 sm:px-8"><div className="flex min-w-0 items-center gap-3"><button className="rounded-xl p-2 text-slate-500 hover:bg-white lg:hidden dark:text-slate-300 dark:hover:bg-white/10" onClick={() => setSidebarOpen(true)} aria-label="Abrir menu"><Menu size={21} /></button><div className="hidden items-center gap-2 text-sm text-slate-400 sm:flex"><span>AVA</span><ChevronLeft size={14} className="rotate-180" /><span className="font-semibold capitalize text-ink dark:text-white">{pageName}</span></div><div className="relative ml-1 hidden w-64 md:block"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input data-tour="search" aria-label="Buscar no sistema" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && searchResults[0]) goToSearchResult(searchResults[0].to) }} placeholder="Buscar alunos, turmas, notas..." className="w-full rounded-xl border border-transparent bg-white py-2.5 pl-9 pr-3 text-xs outline-none ring-1 ring-line/50 transition placeholder:text-slate-400 focus:ring-2 focus:ring-teal/40 dark:bg-white/5 dark:ring-white/10" />{searchResults.length > 0 && <div className="absolute left-0 right-0 top-11 z-50 overflow-hidden rounded-2xl border border-line bg-white p-1 shadow-2xl dark:border-white/10 dark:bg-[#132a3b]">{searchResults.map((item) => <button key={item.to} onClick={() => goToSearchResult(item.to)} className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-xs font-semibold text-ink hover:bg-cream dark:text-white dark:hover:bg-white/10"><item.icon size={15} className="text-teal" />{item.label}</button>)}</div>}</div></div><div className="relative flex items-center gap-2 sm:gap-3"><button data-tour="notifications" onClick={() => setNotificationsOpen((current) => !current)} className="relative rounded-xl p-2.5 text-slate-500 hover:bg-white dark:text-slate-300 dark:hover:bg-white/10" aria-label="Abrir notificações" aria-expanded={notificationsOpen}><Bell size={18} /><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-rose-400" /></button>{notificationsOpen && <div className="absolute right-16 top-12 w-80 rounded-2xl border border-line bg-white p-4 shadow-2xl dark:border-white/10 dark:bg-[#132a3b]"><div className="mb-3 flex items-center justify-between"><p className="text-sm font-bold text-ink dark:text-white">Notificações</p><span className="rounded-full bg-rose-50 px-2 py-1 text-[10px] font-bold text-rose-600 dark:bg-rose-950/40 dark:text-rose-300">3 novas</span></div><div className="space-y-3"><NotificationItem title="Atenção pedagógica" detail="Lucas Ferreira está abaixo do limite de frequência." tone="danger" /><NotificationItem title="Nova entrega" detail="29 estudantes entregaram a lista de funções." tone="success" /><NotificationItem title="Reunião amanhã" detail="Reunião pedagógica às 14h na sala multiuso." tone="warning" /></div><button className="mt-4 w-full rounded-xl bg-cream py-2 text-xs font-bold text-teal dark:bg-white/5" onClick={() => setNotificationsOpen(false)}>Marcar como lidas</button></div>}<button className="rounded-xl p-2.5 text-slate-500 hover:bg-white dark:text-slate-300 dark:hover:bg-white/10" onClick={toggleTheme} aria-label={theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'}>{theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}</button><div className="hidden h-8 w-px bg-line dark:bg-white/10 sm:block" /><div className="hidden text-right sm:block"><p className="text-xs font-bold text-ink dark:text-white">{user?.name}</p><p className="text-[10px] text-slate-400">{user?.description}</p></div><button onClick={() => navigate('/perfil')} aria-label="Abrir gerenciamento de perfil" className="rounded-xl focus:outline-none focus:ring-4 focus:ring-teal/20"><Avatar initials={user?.initials || 'AV'} className="h-9 w-9" /></button></div></header><main className="mx-auto max-w-[1600px] p-4 sm:p-8"><Outlet /></main></div></div><ToastViewport /><TourOverlay /></div>
}

function NotificationItem({ title, detail, tone }: { title: string; detail: string; tone: 'danger' | 'success' | 'warning' }) { return <div className="flex gap-3"><span className={cn('mt-1 h-2.5 w-2.5 shrink-0 rounded-full', tone === 'danger' ? 'bg-rose-400' : tone === 'success' ? 'bg-emerald-400' : 'bg-amber-400')} /><div><p className="text-xs font-bold text-ink dark:text-white">{title}</p><p className="mt-0.5 text-[11px] leading-4 text-slate-400">{detail}</p></div></div> }
