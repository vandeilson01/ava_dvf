import { useMemo, useState } from 'react'
import { ArrowLeft, CheckCircle2, GraduationCap, IdCard, Mail, Phone, Save, ShieldCheck, UserRound, Users, Volume2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '@/contexts/AppContext'
import { Badge, Button, Card, PageHeader, SectionTitle } from '@/components/ui'

type RegistrationKind = 'aluno' | 'professor'

type FormState = Record<string, string>

const teacherFields = [
  ['nomeCompleto', 'Nome completo', 'Ex.: Ana Paula Ferreira', 'text'],
  ['nomeSocial', 'Nome social', 'Como prefere ser chamado(a)', 'text'],
  ['cpf', 'CPF', '000.000.000-00', 'text'],
  ['matricula', 'Matrícula / operacional', 'Ex.: MAT-2026-001', 'text'],
  ['email', 'E-mail institucional', 'professor@escola.edu.br', 'email'],
  ['emailPessoal', 'E-mail pessoal', 'contato@email.com', 'email'],
  ['telefone', 'Telefone / WhatsApp', '(00) 00000-0000', 'tel'],
  ['dataNascimento', 'Data de nascimento', '', 'date'],
  ['formacao', 'Formação acadêmica', 'Licenciatura, especialização...', 'text'],
  ['registroProfissional', 'Registro profissional', 'Ex.: MEC / conselho / certificação', 'text'],
  ['escola', 'Escola / unidade', 'Centro Educa Mais Domingos Vieira Filho', 'text'],
  ['cargo', 'Cargo / função', 'Professor(a) de Matemática', 'text'],
  ['disciplinas', 'Disciplinas', 'Matemática, Projeto de Vida', 'text'],
  ['turmas', 'Turmas atribuídas', '100, 101, 200 ADM', 'text'],
  ['turno', 'Turno de trabalho', 'Manhã, tarde ou integral', 'text'],
  ['dataAdmissao', 'Data de admissão', '', 'date'],
  ['endereco', 'Endereço', 'Rua, número, bairro e cidade', 'text'],
  ['observacoes', 'Observações profissionais', 'Informações complementares', 'textarea'],
] as const

const studentFields = [
  ['nomeCompleto', 'Nome completo', 'Ex.: Lucas Ferreira', 'text'],
  ['nomeSocial', 'Nome social', 'Como prefere ser chamado(a)', 'text'],
  ['cpf', 'CPF', '000.000.000-00', 'text'],
  ['matricula', 'Matrícula escolar', 'Ex.: 2026-100-001', 'text'],
  ['email', 'E-mail do aluno', 'aluno@escola.edu.br', 'email'],
  ['telefone', 'Celular / WhatsApp', '(00) 00000-0000', 'tel'],
  ['dataNascimento', 'Data de nascimento', '', 'date'],
  ['turma', 'Turma', '100, 101, 102, 103, 104...', 'text'],
  ['serie', 'Série / etapa', '1º, 2º ou 3º ano do Ensino Médio', 'text'],
  ['curso', 'Curso / itinerário', 'MKT, ADM, INT ou formação geral', 'text'],
  ['turno', 'Turno', 'Manhã ou tarde', 'text'],
  ['dataMatricula', 'Data da matrícula', '', 'date'],
  ['responsavel', 'Responsável legal', 'Nome completo do responsável', 'text'],
  ['responsavelCpf', 'CPF do responsável', '000.000.000-00', 'text'],
  ['responsavelEmail', 'E-mail do responsável', 'familia@email.com', 'email'],
  ['responsavelTelefone', 'Telefone do responsável', '(00) 00000-0000', 'tel'],
  ['endereco', 'Endereço residencial', 'Rua, número, bairro e cidade', 'text'],
  ['necessidades', 'Necessidades educacionais', 'Apoios, adaptações ou observações', 'textarea'],
  ['observacoes', 'Observações', 'Informações importantes para a escola', 'textarea'],
] as const

const initialValues = (kind: RegistrationKind): FormState => kind === 'professor'
  ? { escola: 'Centro Educa Mais Domingos Vieira Filho', cargo: 'Professor(a)', turno: 'Manhã' }
  : { escola: 'Centro Educa Mais Domingos Vieira Filho', serie: 'Ensino Médio', turno: 'Manhã' }

export default function RegistrationPage({ kind }: { kind: RegistrationKind }) {
  const navigate = useNavigate()
  const { notify } = useApp()
  const [values, setValues] = useState<FormState>(() => initialValues(kind))
  const [step, setStep] = useState(1)
  const [saved, setSaved] = useState(false)
  const isTeacher = kind === 'professor'
  const fields = isTeacher ? teacherFields : studentFields
  const title = isTeacher ? 'Cadastro individual de professor' : 'Cadastro individual de aluno'
  const requiredKeys = isTeacher ? ['nomeCompleto', 'matricula', 'email', 'escola', 'disciplinas'] : ['nomeCompleto', 'matricula', 'turma', 'responsavel', 'responsavelTelefone']
  const missing = requiredKeys.filter((key) => !values[key]?.trim())
  const completion = useMemo(() => Math.round((Object.values(values).filter(Boolean).length / fields.length) * 100), [values, fields.length])
  const update = (key: string, value: string) => setValues((current) => ({ ...current, [key]: value }))
  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    if (missing.length) { setStep(1); notify({ title: 'Complete os campos obrigatórios', message: 'Preencha os campos marcados antes de concluir o cadastro.', tone: 'warning' }); return }
    setSaved(true)
    notify({ title: 'Cadastro salvo', message: `${isTeacher ? 'Professor' : 'Aluno'} cadastrado nos dados demonstrativos desta sessão.`, tone: 'success' })
  }
  return <div className="animate-page-in"><button onClick={() => navigate(isTeacher ? '/professores' : '/alunos')} className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:-translate-x-1 hover:text-teal"><ArrowLeft size={16} /> Voltar para {isTeacher ? 'professores' : 'alunos'}</button><PageHeader eyebrow="Núcleo escolar · cadastro individual" title={title} description="Registre os dados essenciais, vínculos acadêmicos, contato, responsável e necessidades de apoio em um único fluxo." action={<Badge tone="info"><ShieldCheck size={13} className="mr-1" /> Dados demonstrativos</Badge>} /><div className="mb-6 grid gap-4 md:grid-cols-3"><Card className="animate-float-soft p-5"><div className="flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal/10 text-teal">{isTeacher ? <Users size={21} /> : <GraduationCap size={21} />}</div><div><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Perfil</p><p className="font-display text-lg font-black text-ink dark:text-white">{isTeacher ? 'Docente' : 'Estudante'}</p></div></div></Card><Card className="p-5"><div className="flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-navy/10 text-navy dark:bg-blue-950/50 dark:text-blue-300"><IdCard size={21} /></div><div><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Preenchimento</p><p className="font-display text-lg font-black text-ink dark:text-white">{completion}%</p></div></div><div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10"><div className="h-full rounded-full bg-teal transition-all duration-500" style={{ width: `${completion}%` }} /></div></Card><Card className="p-5"><div className="flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-mint/20 text-[#2b877b]"><Volume2 size={21} /></div><div><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Apoio</p><p className="font-display text-lg font-black text-ink dark:text-white">Acessível</p></div></div></Card></div><Card className="overflow-hidden"><div className="flex border-b border-line/70 dark:border-white/10"><button type="button" onClick={() => setStep(1)} className={`flex-1 px-5 py-4 text-sm font-bold transition ${step === 1 ? 'border-b-2 border-teal text-teal' : 'text-slate-400 hover:text-teal'}`}>1. Dados e vínculo</button><button type="button" onClick={() => setStep(2)} className={`flex-1 px-5 py-4 text-sm font-bold transition ${step === 2 ? 'border-b-2 border-teal text-teal' : 'text-slate-400 hover:text-teal'}`}>2. Revisão e conclusão</button></div><form onSubmit={submit} className="p-5 sm:p-8">{step === 1 ? <><div className="mb-6 flex items-center gap-3 rounded-2xl bg-teal/5 p-4 text-sm text-slate-600 dark:bg-teal/10 dark:text-slate-300"><UserRound size={18} className="shrink-0 text-teal" /> Campos com <span className="font-black text-rose-500">*</span> são necessários para concluir o cadastro. Os demais enriquecem o prontuário demonstrativo.</div><div className="grid gap-5 md:grid-cols-2">{fields.map(([key, label, placeholder, type]) => <label key={key} className={type === 'textarea' ? 'block md:col-span-2' : 'block'}><span className="mb-2 block text-sm font-bold text-ink dark:text-white">{label}{requiredKeys.includes(key) && <span className="ml-1 text-rose-500">*</span>}</span>{type === 'textarea' ? <textarea value={values[key] || ''} onChange={(event) => update(key, event.target.value)} placeholder={placeholder} className="min-h-28 w-full rounded-xl border border-line bg-white px-3 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-teal focus:ring-4 focus:ring-teal/10 dark:border-white/10 dark:bg-white/5 dark:text-white" /> : <input type={type} value={values[key] || ''} onChange={(event) => update(key, event.target.value)} placeholder={placeholder} className="w-full rounded-xl border border-line bg-white px-3 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-teal focus:ring-4 focus:ring-teal/10 dark:border-white/10 dark:bg-white/5 dark:text-white" />}</label>)}</div><div className="mt-8 flex justify-end"><Button type="button" onClick={() => setStep(2)}>Revisar cadastro</Button></div></> : <div className="animate-slide-up"><SectionTitle title="Revise antes de concluir" description="Confirme os dados principais e salve o cadastro individual." /><div className="grid gap-3 sm:grid-cols-2">{Object.entries(values).filter(([, value]) => value).map(([key, value]) => <div key={key} className="rounded-2xl border border-line/70 bg-cream/60 p-4 dark:border-white/10 dark:bg-white/5"><p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{fields.find(([fieldKey]) => fieldKey === key)?.[1] || key}</p><p className="mt-1 text-sm font-bold text-ink dark:text-white">{value}</p></div>)}</div>{missing.length > 0 && <p className="mt-5 rounded-xl bg-amber-50 p-3 text-sm font-semibold text-amber-700 dark:bg-amber-950/30 dark:text-amber-300">Ainda faltam {missing.length} campos obrigatórios.</p>}<div className="mt-8 flex flex-wrap justify-end gap-2"><Button type="button" variant="secondary" onClick={() => setStep(1)}>Voltar e editar</Button><Button type="submit"><Save size={16} /> Concluir cadastro</Button></div></div>}</form></Card>{saved && <div className="mt-5 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-700 animate-slide-up dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-300"><CheckCircle2 size={18} /> Cadastro concluído para esta demonstração. Você pode voltar à lista e cadastrar outro perfil.</div>}</div>
}
