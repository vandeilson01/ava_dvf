import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { mockUsers } from '@/data/mocks'
import type { Role, SessionUser } from '@/types'

interface Toast { id: number; title: string; message: string; tone: 'success' | 'info' | 'warning' }
interface AppContextValue {
  user: SessionUser | null
  login: (email: string, password: string, remember: boolean) => boolean
  updateProfile: (changes: Partial<Pick<SessionUser, 'name' | 'email' | 'description' | 'initials'>>) => void
  logout: () => void
  theme: 'light' | 'dark'
  toggleTheme: () => void
  highContrast: boolean
  setHighContrast: (value: boolean) => void
  reducedMotion: boolean
  setReducedMotion: (value: boolean) => void
  fontScale: number
  setFontScale: (value: number) => void
  resetAccessibility: () => void
  toasts: Toast[]
  notify: (toast: Omit<Toast, 'id'>) => void
  dismissToast: (id: number) => void
  can: (roles: Role[]) => boolean
  tourOpen: boolean
  tourStep: number
  startTour: () => void
  nextTourStep: () => void
  previousTourStep: () => void
  finishTour: () => void
}

const AppContext = createContext<AppContextValue | null>(null)
const STORAGE_KEY = 'ava-edu-session'
const TOUR_KEY = 'ava-edu-tour-complete'

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(() => { try { const saved = localStorage.getItem(STORAGE_KEY); return saved ? JSON.parse(saved) as SessionUser : null } catch { return null } })
  const [theme, setTheme] = useState<'light' | 'dark'>(() => (localStorage.getItem('ava-theme') as 'light' | 'dark') || 'light')
  const [highContrast, setHighContrast] = useState(() => localStorage.getItem('ava-contrast') === 'true')
  const [reducedMotion, setReducedMotion] = useState(() => localStorage.getItem('ava-motion') === 'true' || window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [fontScale, setFontScale] = useState(() => Number(localStorage.getItem('ava-font-scale')) || 1)
  const [toasts, setToasts] = useState<Toast[]>([])
  const [tourOpen, setTourOpen] = useState(false)
  const [tourStep, setTourStep] = useState(0)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document.documentElement.classList.toggle('high-contrast', highContrast)
    document.documentElement.classList.toggle('reduced-motion', reducedMotion)
    document.documentElement.style.setProperty('--font-scale', String(fontScale))
    localStorage.setItem('ava-theme', theme)
    localStorage.setItem('ava-contrast', String(highContrast))
    localStorage.setItem('ava-motion', String(reducedMotion))
    localStorage.setItem('ava-font-scale', String(fontScale))
  }, [theme, highContrast, reducedMotion, fontScale])

  useEffect(() => {
    if (user && !localStorage.getItem(TOUR_KEY)) {
      const timer = window.setTimeout(() => setTourOpen(true), 700)
      return () => window.clearTimeout(timer)
    }
  }, [user])

  const login = (email: string, password: string, remember: boolean) => {
    const found = mockUsers.find((candidate) => candidate.email.toLowerCase() === email.trim().toLowerCase())
    if (!found || password !== '123456') return false
    setUser(found)
    if (remember) localStorage.setItem(STORAGE_KEY, JSON.stringify(found)); else localStorage.removeItem(STORAGE_KEY)
    return true
  }
  const updateProfile = (changes: Partial<Pick<SessionUser, 'name' | 'email' | 'description' | 'initials'>>) => {
    setUser((current) => {
      if (!current) return current
      const updated = { ...current, ...changes }
      if (localStorage.getItem(STORAGE_KEY)) localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }
  const logout = () => { setUser(null); localStorage.removeItem(STORAGE_KEY) }
  const notify = (toast: Omit<Toast, 'id'>) => { const id = Date.now(); setToasts((current) => [...current, { ...toast, id }]); window.setTimeout(() => setToasts((current) => current.filter((item) => item.id !== id)), 4500) }
  const finishTour = () => { setTourOpen(false); setTourStep(0); localStorage.setItem(TOUR_KEY, 'true') }

  const value = useMemo<AppContextValue>(() => ({
    user, login, updateProfile, logout, theme, toggleTheme: () => setTheme((current) => current === 'light' ? 'dark' : 'light'), highContrast, setHighContrast, reducedMotion, setReducedMotion, fontScale, setFontScale,
    resetAccessibility: () => { setTheme('light'); setHighContrast(false); setReducedMotion(false); setFontScale(1) }, toasts, notify, dismissToast: (id) => setToasts((current) => current.filter((item) => item.id !== id)), can: (roles) => Boolean(user && roles.includes(user.role)),
    tourOpen, tourStep, startTour: () => { setTourStep(0); setTourOpen(true) }, nextTourStep: () => setTourStep((step) => step + 1), previousTourStep: () => setTourStep((step) => Math.max(0, step - 1)), finishTour,
  }), [user, theme, highContrast, reducedMotion, fontScale, toasts, tourOpen, tourStep])
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() { const context = useContext(AppContext); if (!context) throw new Error('useApp deve ser usado dentro de AppProvider'); return context }
