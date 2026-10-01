import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AppShell from '@/components/AppShell'
import { AppProvider, useApp } from '@/contexts/AppContext'
import DashboardPage from '@/pages/DashboardPage'
import { EntityDetailPage, EntityDirectoryPage } from '@/pages/EntityPages'
import { ActivitiesPage, ActivityDetailPage, AnnouncementsPage, AssistantPage, AttendancePage, CalendarPage, GradesPage, ReportsPage, SettingsPage } from '@/pages/OperationsPages'
import LoginPage from '@/pages/LoginPage'
import ProfilePage from '@/pages/ProfilePage'
import { RoleAreaPage } from '@/pages/UserAreaPages'
import RegistrationPage from '@/pages/RegistrationPages'
import ForgotPasswordPage from '@/pages/ForgotPasswordPage'
import AdminPage from '@/pages/AdminPage'
import AdminLoginPage from '@/pages/AdminLoginPage'
import { hasPermission } from '@/lib/permissions'
import '@/styles.css'

function ProtectedRoute() {
  const { user } = useApp()
  if (!user) return <Navigate to="/login" replace />
  return <AppShell />
}

function AdminRoute() { const { adminAuthenticated } = useApp(); if (!adminAuthenticated) return <Navigate to="/admin-login" replace />; return <AppShell /> }

function PermissionRoute({ permission, children }: { permission: string; children: React.ReactNode }) {
  const { user } = useApp()
  if (!user) return <Navigate to="/login" replace />
  return hasPermission(user.role, permission) ? <>{children}</> : <Navigate to="/dashboard" replace />
}

function AppRouter() {
  return <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/esqueci-senha" element={<ForgotPasswordPage />} />
    <Route path="/admin-login" element={<AdminLoginPage />} />
    <Route element={<AdminRoute />}><Route path="/admin" element={<AdminPage />} /></Route>
    <Route element={<ProtectedRoute />}>
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/minha-area" element={<RoleAreaPage />} />
      <Route path="/cadastro/aluno" element={<PermissionRoute permission="alunos"><RegistrationPage kind="aluno" /></PermissionRoute>} />
      <Route path="/cadastro/professor" element={<PermissionRoute permission="professores"><RegistrationPage kind="professor" /></PermissionRoute>} />
      <Route path="/alunos" element={<PermissionRoute permission="alunos"><EntityDirectoryPage kind="alunos" /></PermissionRoute>} />
      <Route path="/alunos/:id" element={<PermissionRoute permission="alunos"><EntityDetailPage kind="alunos" /></PermissionRoute>} />
      <Route path="/professores" element={<PermissionRoute permission="professores"><EntityDirectoryPage kind="professores" /></PermissionRoute>} />
      <Route path="/professores/:id" element={<PermissionRoute permission="professores"><EntityDetailPage kind="professores" /></PermissionRoute>} />
      <Route path="/disciplinas" element={<PermissionRoute permission="disciplinas"><EntityDirectoryPage kind="disciplinas" /></PermissionRoute>} />
      <Route path="/disciplinas/:id" element={<PermissionRoute permission="disciplinas"><EntityDetailPage kind="disciplinas" /></PermissionRoute>} />
      <Route path="/turmas" element={<PermissionRoute permission="turmas"><EntityDirectoryPage kind="turmas" /></PermissionRoute>} />
      <Route path="/turmas/:id" element={<PermissionRoute permission="turmas"><EntityDetailPage kind="turmas" /></PermissionRoute>} />
      <Route path="/atividades" element={<PermissionRoute permission="atividades"><ActivitiesPage /></PermissionRoute>} />
      <Route path="/atividades/:id" element={<PermissionRoute permission="atividades"><ActivityDetailPage /></PermissionRoute>} />
      <Route path="/notas" element={<PermissionRoute permission="notas"><GradesPage /></PermissionRoute>} />
      <Route path="/frequencia" element={<PermissionRoute permission="frequencia"><AttendancePage /></PermissionRoute>} />
      <Route path="/comunicados" element={<PermissionRoute permission="comunicados"><AnnouncementsPage /></PermissionRoute>} />
      <Route path="/calendario" element={<PermissionRoute permission="calendario"><CalendarPage /></PermissionRoute>} />
      <Route path="/ia" element={<PermissionRoute permission="ia"><AssistantPage /></PermissionRoute>} />
      <Route path="/relatorios" element={<PermissionRoute permission="relatorios"><ReportsPage /></PermissionRoute>} />
      <Route path="/configuracoes" element={<PermissionRoute permission="configuracoes"><SettingsPage /></PermissionRoute>} />
      <Route path="/perfil" element={<ProfilePage />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Route>
    <Route path="/" element={<Navigate to="/dashboard" replace />} />
  </Routes>
}

ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><BrowserRouter><AppProvider><AppRouter /></AppProvider></BrowserRouter></React.StrictMode>)
