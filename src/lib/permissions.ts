import type { Role } from '@/types'

export const permissions: Record<Role, string[]> = {
  GESTOR_GERAL: ['dashboard', 'alunos', 'professores', 'turmas', 'disciplinas', 'atividades', 'notas', 'frequencia', 'comunicados', 'calendario', 'ia', 'relatorios', 'configuracoes'],
  GESTOR_PEDAGOGICO: ['dashboard', 'alunos', 'professores', 'turmas', 'disciplinas', 'atividades', 'notas', 'frequencia', 'calendario', 'ia', 'relatorios'],
  GESTOR_ADMINISTRATIVO: ['dashboard', 'alunos', 'professores', 'turmas', 'comunicados', 'calendario', 'relatorios', 'configuracoes', 'ia'],
  PROFESSOR: ['dashboard', 'turmas', 'disciplinas', 'atividades', 'notas', 'frequencia', 'calendario', 'ia'],
  ALUNO: ['dashboard', 'disciplinas', 'atividades', 'notas', 'frequencia', 'calendario'],
}

export function hasPermission(role: Role, permission: string) {
  return permissions[role]?.includes(permission) ?? false
}
