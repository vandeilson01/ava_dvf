import type { Activity, Announcement, AttendanceRow, CalendarEvent, GradeRow, SchoolClass, SessionUser, Student, Subject, Teacher } from '@/types'

export const mockUsers: SessionUser[] = [
  { id: 'u1', name: 'Mariana Costa', email: 'gestor@escola.local', role: 'GESTOR_GERAL', initials: 'MC', description: 'Gestora Geral' },
  { id: 'u2', name: 'Rafael Mendes', email: 'pedagogico@escola.local', role: 'GESTOR_PEDAGOGICO', initials: 'RM', description: 'Gestor Pedagógico' },
  { id: 'u3', name: 'Camila Rocha', email: 'administrativo@escola.local', role: 'GESTOR_ADMINISTRATIVO', initials: 'CR', description: 'Gestora Administrativa' },
  { id: 'u4', name: 'Prof. André Martins', email: 'professor@escola.local', role: 'PROFESSOR', initials: 'AM', description: 'Professor de Matemática' },
  { id: 'u5', name: 'João Pedro Almeida', email: 'aluno@escola.local', role: 'ALUNO', initials: 'JA', description: 'Aluno · turma 100' },
]

export const students: Student[] = [
  { id: 's1', name: 'João Pedro Almeida', initials: 'JA', registration: '2026-0182', className: '100', email: 'joao.almeida@aluno.local', status: 'Ativo', average: 8.2, attendance: 94, phone: '(98) 98821-3344', birthDate: '14/03/2010', shift: 'Manhã', observations: 'Participativo e com boa evolução em Ciências da Natureza.' },
  { id: 's2', name: 'Maria Eduarda Santos', initials: 'MS', registration: '2026-0214', className: '200 MKT', email: 'maria.santos@aluno.local', status: 'Ativo', average: 8.8, attendance: 97, phone: '(98) 98812-1122', birthDate: '27/07/2009', shift: 'Manhã', observations: 'Liderança positiva nas atividades de marketing.' },
  { id: 's3', name: 'Lucas Ferreira Lima', initials: 'LL', registration: '2026-0240', className: '201 ADM', email: 'lucas.lima@aluno.local', status: 'Atenção', average: 6.4, attendance: 82, phone: '(98) 98744-9901', birthDate: '02/11/2009', shift: 'Tarde', observations: 'Precisa de acompanhamento em Matemática e frequência.' },
  { id: 's4', name: 'Ana Clara Oliveira', initials: 'AO', registration: '2026-0197', className: '300 INT', email: 'ana.oliveira@aluno.local', status: 'Ativo', average: 9.1, attendance: 99, phone: '(98) 98675-2100', birthDate: '10/01/2008', shift: 'Tarde', observations: 'Excelente desempenho geral e participação nas eletivas.' },
  { id: 's5', name: 'Gabriel Sousa', initials: 'GS', registration: '2026-0308', className: '102', email: 'gabriel.sousa@aluno.local', status: 'Ativo', average: 7.5, attendance: 91, phone: '(98) 98522-6531', birthDate: '19/08/2010', shift: 'Manhã', observations: 'Evolução consistente nas últimas avaliações.' },
  { id: 's6', name: 'Beatriz Carvalho', initials: 'BC', registration: '2026-0319', className: '301 ADM', email: 'beatriz.carvalho@aluno.local', status: 'Atenção', average: 6.9, attendance: 86, phone: '(98) 98400-7788', birthDate: '21/09/2008', shift: 'Manhã', observations: 'Acompanhamento pedagógico iniciado neste bimestre.' },
]

export const teachers: Teacher[] = [
  { id: 't1', name: 'Prof. André Martins', initials: 'AM', registration: 'PROF-019', email: 'andre.martins@escola.local', subjects: ['Matemática', 'Projeto de Vida'], classes: ['100', '200 ADM', '300 ADM'], status: 'Ativo' },
  { id: 't2', name: 'Profa. Juliana Azevedo', initials: 'JA', registration: 'PROF-024', email: 'juliana.azevedo@escola.local', subjects: ['Língua Portuguesa', 'Redação'], classes: ['101', '200 MKT', '300 MKT'], status: 'Ativo' },
  { id: 't3', name: 'Prof. Thiago Nunes', initials: 'TN', registration: 'PROF-031', email: 'thiago.nunes@escola.local', subjects: ['Biologia', 'Química'], classes: ['102', '201 INT', '300 INT'], status: 'Ativo' },
  { id: 't4', name: 'Profa. Larissa Lima', initials: 'LL', registration: 'PROF-036', email: 'larissa.lima@escola.local', subjects: ['História', 'Geografia'], classes: ['103', '201 ADM', '301 ADM'], status: 'Ativo' },
]

export const subjects: Subject[] = [
  { id: 'd1', name: 'Matemática', code: 'MAT-EM', teacher: 'Prof. André Martins', classes: ['100', '200 ADM', '300 ADM'], description: 'Raciocínio lógico, álgebra, geometria e resolução de problemas no ensino médio.', workload: 120, status: 'Ativa' },
  { id: 'd2', name: 'Língua Portuguesa', code: 'POR-EM', teacher: 'Profa. Juliana Azevedo', classes: ['101', '200 MKT', '300 MKT'], description: 'Leitura, produção textual, gramática e repertório cultural.', workload: 160, status: 'Ativa' },
  { id: 'd3', name: 'Biologia', code: 'BIO-EM', teacher: 'Prof. Thiago Nunes', classes: ['102', '201 INT', '300 INT'], description: 'Vida, ambiente, saúde e investigação científica.', workload: 100, status: 'Ativa' },
  { id: 'd4', name: 'Projeto de Vida', code: 'PDV-EM', teacher: 'Prof. André Martins', classes: ['100', '101', '102', '103', '104'], description: 'Orientação, protagonismo juvenil e preparação para o futuro.', workload: 80, status: 'Ativa' },
]

export const schoolClasses: SchoolClass[] = [
  { id: 'c100', name: '100', grade: '1º ano', course: 'Formação Geral Básica', shift: 'Manhã', students: 20, teachers: ['Prof. André Martins'], status: 'Ativa', performance: 8.1, attendance: 94 },
  { id: 'c101', name: '101', grade: '1º ano', course: 'Formação Geral Básica', shift: 'Manhã', students: 20, teachers: ['Profa. Juliana Azevedo'], status: 'Ativa', performance: 8.0, attendance: 93 },
  { id: 'c102', name: '102', grade: '1º ano', course: 'Formação Geral Básica', shift: 'Manhã', students: 20, teachers: ['Prof. Thiago Nunes'], status: 'Ativa', performance: 7.8, attendance: 91 },
  { id: 'c103', name: '103', grade: '1º ano', course: 'Formação Geral Básica', shift: 'Tarde', students: 20, teachers: ['Profa. Larissa Lima'], status: 'Ativa', performance: 8.2, attendance: 95 },
  { id: 'c104', name: '104', grade: '1º ano', course: 'Formação Geral Básica', shift: 'Tarde', students: 20, teachers: ['Prof. André Martins'], status: 'Ativa', performance: 8.0, attendance: 92 },
  { id: 'c200mkt', name: '200 MKT', grade: '2º ano', course: 'Marketing', shift: 'Manhã', students: 20, teachers: ['Profa. Juliana Azevedo'], status: 'Ativa', performance: 8.4, attendance: 95 },
  { id: 'c200adm', name: '200 ADM', grade: '2º ano', course: 'Administração', shift: 'Manhã', students: 20, teachers: ['Prof. André Martins'], status: 'Ativa', performance: 8.1, attendance: 94 },
  { id: 'c201adm', name: '201 ADM', grade: '2º ano', course: 'Administração', shift: 'Tarde', students: 20, teachers: ['Profa. Larissa Lima'], status: 'Ativa', performance: 7.9, attendance: 90 },
  { id: 'c200int', name: '200 INT', grade: '2º ano', course: 'Informática', shift: 'Manhã', students: 20, teachers: ['Prof. Thiago Nunes'], status: 'Ativa', performance: 8.5, attendance: 96 },
  { id: 'c201int', name: '201 INT', grade: '2º ano', course: 'Informática', shift: 'Tarde', students: 20, teachers: ['Prof. Thiago Nunes'], status: 'Ativa', performance: 8.2, attendance: 93 },
  { id: 'c300mkt', name: '300 MKT', grade: '3º ano', course: 'Marketing / Eletivas', shift: 'Manhã', students: 20, teachers: ['Profa. Juliana Azevedo'], status: 'Ativa', performance: 8.6, attendance: 96 },
  { id: 'c300adm', name: '300 ADM', grade: '3º ano', course: 'Administração / Eletivas', shift: 'Manhã', students: 20, teachers: ['Prof. André Martins'], status: 'Ativa', performance: 8.3, attendance: 94 },
  { id: 'c301adm', name: '301 ADM', grade: '3º ano', course: 'Administração / Eletivas', shift: 'Tarde', students: 20, teachers: ['Profa. Larissa Lima'], status: 'Ativa', performance: 8.0, attendance: 92 },
  { id: 'c300int', name: '300 INT', grade: '3º ano', course: 'Informática / Eletivas', shift: 'Manhã', students: 20, teachers: ['Prof. Thiago Nunes'], status: 'Ativa', performance: 8.7, attendance: 97 },
  { id: 'c301int', name: '301 INT', grade: '3º ano', course: 'Informática / Eletivas', shift: 'Tarde', students: 20, teachers: ['Prof. Thiago Nunes'], status: 'Ativa', performance: 8.4, attendance: 95 },
]

export const activities: Activity[] = [
  { id: 'lesson-mat', title: 'Aula: Funções do 2º grau', subject: 'Matemática', teacher: 'Prof. André Martins', className: '100', dueDate: '01 out 2026', type: 'Aula', status: 'Pendente', value: 0, submissions: 0, totalStudents: 32 },
  { id: 'a2', title: 'Lista de funções do 2º grau', subject: 'Matemática', teacher: 'Prof. André Martins', className: '100', dueDate: '02 out 2026', type: 'Exercício', status: 'Entregue', value: 8, submissions: 29, totalStudents: 32, lessonId: 'lesson-mat', lessonTitle: 'Aula: Funções do 2º grau' },
  { id: 'lesson-science', title: 'Aula: Energia e sustentabilidade', subject: 'Ciências', teacher: 'Prof. Thiago Nunes', className: '200 ADM', dueDate: '01 out 2026', type: 'Aula', status: 'Pendente', value: 0, submissions: 0, totalStudents: 29 },
  { id: 'a1', title: 'Projeto: Energia e Sustentabilidade', subject: 'Ciências', teacher: 'Prof. Thiago Nunes', className: '200 ADM', dueDate: '04 out 2026', type: 'Projeto', status: 'Pendente', value: 10, submissions: 18, totalStudents: 29, lessonId: 'lesson-science', lessonTitle: 'Aula: Energia e sustentabilidade' },
  { id: 'lesson-history', title: 'Aula: Revolução Industrial', subject: 'História', teacher: 'Profa. Larissa Lima', className: '200 ADM', dueDate: '03 out 2026', type: 'Aula', status: 'Pendente', value: 0, submissions: 0, totalStudents: 29 },
  { id: 'a4', title: 'Revisão: Revolução Industrial', subject: 'História', teacher: 'Profa. Larissa Lima', className: '200 ADM', dueDate: '07 out 2026', type: 'Pesquisa', status: 'Pendente', value: 7, submissions: 11, totalStudents: 29, lessonId: 'lesson-history', lessonTitle: 'Aula: Revolução Industrial' },
  { id: 'lesson-portuguese', title: 'Aula: Crônica e cotidiano', subject: 'Língua Portuguesa', teacher: 'Profa. Juliana Azevedo', className: '300 MKT', dueDate: '26 set 2026', type: 'Aula', status: 'Pendente', value: 0, submissions: 0, totalStudents: 31 },
  { id: 'a3', title: 'Crônica do cotidiano', subject: 'Língua Portuguesa', teacher: 'Profa. Juliana Azevedo', className: '300 MKT', dueDate: '28 set 2026', type: 'Trabalho', status: 'Atrasada', value: 10, submissions: 22, totalStudents: 31, lessonId: 'lesson-portuguese', lessonTitle: 'Aula: Crônica e cotidiano' },
]

export const announcements: Announcement[] = [
  { id: 'm1', title: 'Reunião pedagógica de outubro', message: 'A reunião será realizada na próxima quarta-feira, às 14h, na sala multiuso.', audience: 'Professores', date: '30 set 2026', priority: 'Alta', author: 'Mariana Costa' },
  { id: 'm2', title: 'Semana da Ciência', message: 'As inscrições para as oficinas de ciência e tecnologia estão abertas até sexta.', audience: 'Todos', date: '29 set 2026', priority: 'Média', author: 'Rafael Mendes' },
  { id: 'm3', title: 'Atualização de calendário', message: 'O calendário escolar foi atualizado com os eventos do segundo semestre.', audience: 'Alunos e responsáveis', date: '27 set 2026', priority: 'Baixa', author: 'Camila Rocha' },
]

export const gradeRows: GradeRow[] = students.map((student, index) => ({
  studentId: student.id,
  studentName: student.name,
  activity1: [8, 9, 6, 10, 7, null][index],
  activity2: [9, 8.5, 5.5, 9.5, 8, null][index],
  exam: [7.5, 9, 6, 9, 7, null][index],
}))

export const attendanceRows: AttendanceRow[] = students.map((student, index) => ({
  studentId: student.id,
  studentName: student.name,
  present: index !== 2,
  justification: index === 2 ? 'Aguardando justificativa da família' : undefined,
}))

export const calendarEvents: CalendarEvent[] = [
  { id: 'e1', title: 'Aula de Matemática', date: '2026-10-01', time: '08:00', type: 'Aula', color: 'bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300' },
  { id: 'e2', title: 'Entrega: Energia e Sustentabilidade', date: '2026-10-04', time: '23:59', type: 'Atividade', color: 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300' },
  { id: 'e3', title: 'Avaliação bimestral', date: '2026-10-06', time: '09:30', type: 'Avaliação', color: 'bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300' },
  { id: 'e4', title: 'Reunião pedagógica', date: '2026-10-07', time: '14:00', type: 'Reunião', color: 'bg-violet-100 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300' },
  { id: 'e5', title: 'Feira da Ciência', date: '2026-10-10', time: '08:30', type: 'Evento', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300' },
]

export const performanceData = [
  { month: 'Mai', media: 7.4, frequencia: 89 },
  { month: 'Jun', media: 7.8, frequencia: 91 },
  { month: 'Jul', media: 7.7, frequencia: 90 },
  { month: 'Ago', media: 8.0, frequencia: 93 },
  { month: 'Set', media: 8.3, frequencia: 94 },
]

export const activityData = [
  { name: 'Entregues', value: 68, color: '#4fb3a4' },
  { name: 'Pendentes', value: 21, color: '#f3b562' },
  { name: 'Atrasadas', value: 11, color: '#e87979' },
]

export const faqResponses = [
  'Encontrei 3 atividades próximas do prazo. Priorize a lista de funções até amanhã e o projeto de Ciências até domingo.',
  'A média geral subiu 0,4 ponto no último bimestre. Continue acompanhando a frequência e as devolutivas das atividades.',
  'Posso ajudar a transformar esse conteúdo em um plano de estudos com blocos curtos, revisão ativa e exercícios de fixação.',
  'A turma tem 6 estudantes em atenção pedagógica. Recomendo olhar a combinação entre média, frequência e entregas antes de definir os próximos passos.',
]
