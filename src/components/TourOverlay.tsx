import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Bell, CheckCircle2, Compass, GraduationCap, Search, Sparkles, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '@/contexts/AppContext'
import { Button, cn } from '@/components/ui'

const steps = [
  { icon: Compass, eyebrow: 'Passo 1 de 4', title: 'Conheça o seu painel', text: 'Aqui você acompanha rapidamente alunos, turmas, atividades, médias e frequência. Comece revisando os alertas que pedem uma próxima ação.', action: 'Ver alunos', route: '/alunos', accent: 'bg-teal/10 text-teal' },
  { icon: GraduationCap, eyebrow: 'Passo 2 de 4', title: 'Acompanhe cada turma', text: 'Use Alunos, Turmas e Notas para encontrar estudantes, filtrar por turma e registrar o progresso do ensino médio.', action: 'Abrir turmas', route: '/turmas', accent: 'bg-amber-50 text-amber-600' },
  { icon: Bell, eyebrow: 'Passo 3 de 4', title: 'Não perca nenhuma pendência', text: 'O sino no cabeçalho reúne atenção pedagógica, novas entregas e compromissos. Consulte as notificações antes de encerrar o dia.', action: 'Abrir frequência', route: '/frequencia', accent: 'bg-violet-50 text-violet-600' },
  { icon: Sparkles, eyebrow: 'Passo 4 de 4', title: 'Personalize sua experiência', text: 'Você pode alternar tema, contraste, tamanho da fonte e movimento reduzido em Configurações. O Assistente IA ajuda a organizar próximos passos, sem substituir decisões humanas.', action: 'Ir para configurações', route: '/configuracoes', accent: 'bg-emerald-50 text-emerald-600' },
]

export function TourOverlay() {
  const { tourOpen, tourStep, nextTourStep, previousTourStep, finishTour } = useApp()
  const navigate = useNavigate()
  const step = steps[tourStep]
  if (!step) return null
  const Icon = step.icon
  const go = () => { navigate(step.route); if (tourStep === steps.length - 1) finishTour(); else nextTourStep() }
  return <AnimatePresence>{tourOpen && <motion.div className="fixed inset-0 z-[70] flex items-end justify-center bg-ink/30 p-4 backdrop-blur-[2px] sm:items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><motion.div role="dialog" aria-modal="true" aria-labelledby="tour-title" className="w-full max-w-lg overflow-hidden rounded-3xl border border-white/50 bg-white shadow-2xl dark:border-white/10 dark:bg-[#132a3b]" initial={{ opacity: 0, y: 26, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 14, scale: 0.98 }} transition={{ type: 'spring', stiffness: 240, damping: 22 }}><div className="flex items-center justify-between border-b border-line/70 px-5 py-4 dark:border-white/10"><div className="flex items-center gap-2"><span className="flex h-8 w-8 items-center justify-center rounded-xl bg-navy text-white"><Compass size={16} /></span><p className="text-xs font-black uppercase tracking-[0.18em] text-teal">Tour guiado do AVA</p></div><button onClick={finishTour} aria-label="Fechar tour" className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-ink dark:hover:bg-white/10 dark:hover:text-white"><X size={17} /></button></div><div className="p-6 sm:p-7"><div className="mb-5 flex items-start gap-4"><div className={cn('flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl', step.accent)}><Icon size={27} /></div><div><p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">{step.eyebrow}</p><h2 id="tour-title" className="mt-1 font-display text-2xl font-black text-ink dark:text-white">{step.title}</h2></div></div><p className="text-sm leading-7 text-slate-600 dark:text-slate-300">{step.text}</p><div className="mt-5 flex gap-1.5" aria-label={`Etapa ${tourStep + 1} de ${steps.length}`}>{steps.map((item, index) => <span key={item.title} className={cn('h-1.5 flex-1 rounded-full transition-all', index <= tourStep ? 'bg-teal' : 'bg-slate-100 dark:bg-white/10')} />)}</div><div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between"><Button variant="ghost" size="sm" onClick={finishTour}>Pular tour</Button><div className="flex gap-2"><Button variant="secondary" size="sm" onClick={previousTourStep} disabled={tourStep === 0}><ArrowLeft size={15} /> Voltar</Button><Button size="sm" onClick={go}>{step.action} <ArrowRight size={15} /></Button></div></div></div></motion.div></motion.div>}</AnimatePresence>
}
