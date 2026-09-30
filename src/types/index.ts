export type Role = 'GESTOR_GERAL' | 'GESTOR_PEDAGOGICO' | 'GESTOR_ADMINISTRATIVO' | 'PROFESSOR' | 'ALUNO'

export interface SessionUser {
  id: string
  name: string
  email: string
  role: Role
  initials: string
  description: string
}

export interface Student {
  id: string
  name: string
  initials: string
  registration: string
  className: string
  email: string
  status: 'Ativo' | 'Atenção' | 'Inativo'
  average: number
  attendance: number
  phone: string
  birthDate: string
  shift: 'Manhã' | 'Tarde'
  observations: string
}

export interface Teacher {
  id: string
  name: string
  initials: string
  registration: string
  email: string
  subjects: string[]
  classes: string[]
  status: 'Ativo' | 'Férias' | 'Inativo'
}

export interface Subject {
  id: string
  name: string
  code: string
  teacher: string
  classes: string[]
  description: string
  workload: number
  status: 'Ativa' | 'Arquivada'
}

export interface SchoolClass {
  id: string
  name: string
  grade: string
  course: string
  shift: string
  students: number
  teachers: string[]
  status: 'Ativa' | 'Encerrada'
  performance: number
  attendance: number
}

export interface Activity {
  id: string
  title: string
  subject: string
  teacher: string
  className: string
  dueDate: string
  type: string
  status: 'Pendente' | 'Entregue' | 'Atrasada'
  value: number
  submissions: number
  totalStudents: number
}

export interface Announcement {
  id: string
  title: string
  message: string
  audience: string
  date: string
  priority: 'Alta' | 'Média' | 'Baixa'
  author: string
}

export interface GradeRow {
  studentId: string
  studentName: string
  activity1: number | null
  activity2: number | null
  exam: number | null
}

export interface AttendanceRow {
  studentId: string
  studentName: string
  present: boolean
  justification?: string
}

export interface CalendarEvent {
  id: string
  title: string
  date: string
  time: string
  type: 'Aula' | 'Atividade' | 'Avaliação' | 'Reunião' | 'Evento'
  color: string
}
