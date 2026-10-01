import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { mockUsers } from '@/data/mocks'
import type { Role, SessionUser } from '@/types'

interface Toast { id: number; title: string; message: string; tone: 'success' | 'info' | 'warning' }
export interface AccessibilitySettings { screenReader: boolean; visualAlerts: boolean; textCommunication: boolean; keyboardNavigation: boolean }
export interface AIConfig { provider: 'mock' | 'openai' | 'gemini'; apiKey: string; model: string }
export interface SystemBranding { systemName: string; primaryColor: string; secondaryColor: string; logoUrl: string }
interface AppContextValue {
  user: SessionUser | null
  login: (email: string, password: string, remember: boolean) => boolean
  adminAuthenticated: boolean
  adminLogin: (email: string, password: string) => boolean
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
  accessibility: AccessibilitySettings
  setAccessibility: (changes: Partial<AccessibilitySettings>) => void
  announce: (message: string) => void
  aiConfig: AIConfig
  setAIConfig: (changes: Partial<AIConfig>) => void
  branding: SystemBranding
  setBranding: (changes: Partial<SystemBranding>) => void
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
const ADMIN_KEY = 'ava-admin-session'
const BRANDING_KEY = 'ava-system-branding'
const defaultBranding: SystemBranding = { systemName: 'AVA — Centro Educa Mais', primaryColor: '#173f5f', secondaryColor: '#1f7a8c', logoUrl: '/logo.svg' }

export function AppProvider({ children }: { children: ReactNode }) {
  const [adminAuthenticated, setAdminAuthenticated] = useState(() => sessionStorage.getItem(ADMIN_KEY) === 'true')
  const [user, setUser] = useState<SessionUser | null>(() => { try { const saved = localStorage.getItem(STORAGE_KEY); return saved ? JSON.parse(saved) as SessionUser : null } catch { return null } })
  const [theme, setTheme] = useState<'light' | 'dark'>(() => (localStorage.getItem('ava-theme') as 'light' | 'dark') || 'light')
  const [highContrast, setHighContrast] = useState(() => localStorage.getItem('ava-contrast') === 'true')
  const [reducedMotion, setReducedMotion] = useState(() => localStorage.getItem('ava-motion') === 'true' || window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [fontScale, setFontScale] = useState(() => Number(localStorage.getItem('ava-font-scale')) || 1)
  const [aiConfig, setAIConfigState] = useState<AIConfig>({ provider: 'mock', apiKey: '', model: '' })
  const [branding, setBrandingState] = useState<SystemBranding>(() => { try { const saved = localStorage.getItem(BRANDING_KEY); return saved ? { ...defaultBranding, ...JSON.parse(saved) } : defaultBranding } catch { return defaultBranding } })
  const [accessibility, setAccessibilityState] = useState<AccessibilitySettings>(() => { try { return { screenReader: localStorage.getItem('ava-screen-reader') === 'true', visualAlerts: localStorage.getItem('ava-visual-alerts') !== 'false', textCommunication: localStorage.getItem('ava-text-communication') !== 'false', keyboardNavigation: localStorage.getItem('ava-keyboard-navigation') !== 'false' } } catch { return { screenReader: false, visualAlerts: true, textCommunication: true, keyboardNavigation: true } } })
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
    localStorage.setItem('ava-screen-reader', String(accessibility.screenReader)); localStorage.setItem('ava-visual-alerts', String(accessibility.visualAlerts)); localStorage.setItem('ava-text-communication', String(accessibility.textCommunication)); localStorage.setItem('ava-keyboard-navigation', String(accessibility.keyboardNavigation))
    document.documentElement.classList.toggle('assistive-focus', accessibility.keyboardNavigation)
  }, [accessibility])

  useEffect(() => {
    document.documentElement.style.setProperty('--ava-primary', branding.primaryColor)
    document.documentElement.style.setProperty('--ava-secondary', branding.secondaryColor)
    localStorage.setItem(BRANDING_KEY, JSON.stringify(branding))
    document.title = branding.systemName
  }, [branding])

  useEffect(() => {
    if (user) { try { const saved = sessionStorage.getItem(`ava-ai-config-${user.id}`); setAIConfigState(saved ? JSON.parse(saved) as AIConfig : { provider: 'mock', apiKey: '', model: '' }) } catch { setAIConfigState({ provider: 'mock', apiKey: '', model: '' }) } }
  }, [user])

  useEffect(() => {
    if (user && !localStorage.getItem(TOUR_KEY)) {
      const timer = window.setTimeout(() => setTourOpen(true), 700)
      return () => window.clearTimeout(timer)
    }
  }, [user])

  const adminLogin = (email: string, password: string) => { const valid = email.trim().toLowerCase() === 'admin@admin.com' && password === '123456'; if (valid) { setAdminAuthenticated(true); sessionStorage.setItem(ADMIN_KEY, 'true'); const adminUser: SessionUser = { id: 'admin', name: 'Administrador AVA', email: 'admin@admin.com', role: 'GESTOR_GERAL', initials: 'AD', description: 'Administrador do sistema' }; setUser(adminUser); localStorage.setItem(STORAGE_KEY, JSON.stringify(adminUser)) }; return valid }
  const login = (email: string, password: string, remember: boolean) => {
    const found = mockUsers.find((candidate) => candidate.email.toLowerCase() === email.trim().toLowerCase())
    if (!found || password !== '123456') return false
    setAdminAuthenticated(false); sessionStorage.removeItem(ADMIN_KEY); setUser(found)
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
  const logout = () => { setUser(null); setAdminAuthenticated(false); sessionStorage.removeItem(ADMIN_KEY); localStorage.removeItem(STORAGE_KEY) }
  const notify = (toast: Omit<Toast, 'id'>) => { const id = Date.now(); setToasts((current) => [...current, { ...toast, id }]); window.setTimeout(() => setToasts((current) => current.filter((item) => item.id !== id)), 4500) }
  const announce = (message: string) => { const region = document.getElementById('ava-live-region'); if (region) region.textContent = message; if (accessibility.screenReader && 'speechSynthesis' in window) window.speechSynthesis.speak(new SpeechSynthesisUtterance(message)) }
  const setAccessibility = (changes: Partial<AccessibilitySettings>) => setAccessibilityState((current) => ({ ...current, ...changes }))
  const setAIConfig = (changes: Partial<AIConfig>) => setAIConfigState((current) => { const updated = { ...current, ...changes }; if (user) sessionStorage.setItem(`ava-ai-config-${user.id}`, JSON.stringify(updated)); return updated })
  const setBranding = (changes: Partial<SystemBranding>) => setBrandingState((current) => ({ ...current, ...changes }))
  const finishTour = () => { setTourOpen(false); setTourStep(0); localStorage.setItem(TOUR_KEY, 'true') }

  const value = useMemo<AppContextValue>(() => ({
    user, login, adminAuthenticated, adminLogin, updateProfile, logout, theme, toggleTheme: () => setTheme((current) => current === 'light' ? 'dark' : 'light'), highContrast, setHighContrast, reducedMotion, setReducedMotion, fontScale, setFontScale,
    resetAccessibility: () => { setTheme('light'); setHighContrast(false); setReducedMotion(false); setFontScale(1); setAccessibilityState({ screenReader: false, visualAlerts: true, textCommunication: true, keyboardNavigation: true }) }, accessibility, setAccessibility, announce, aiConfig, setAIConfig, branding, setBranding, toasts, notify, dismissToast: (id) => setToasts((current) => current.filter((item) => item.id !== id)), can: (roles) => Boolean(user && roles.includes(user.role)),
    tourOpen, tourStep, startTour: () => { setTourStep(0); setTourOpen(true) }, nextTourStep: () => setTourStep((step) => step + 1), previousTourStep: () => setTourStep((step) => Math.max(0, step - 1)), finishTour,
  }), [user, adminAuthenticated, theme, highContrast, reducedMotion, fontScale, accessibility, aiConfig, branding, toasts, tourOpen, tourStep])
  return <AppContext.Provider value={value}><div id="ava-live-region" className="sr-only" aria-live="polite" aria-atomic="true" />{children}</AppContext.Provider>
}

export function useApp() { const context = useContext(AppContext); if (!context) throw new Error('useApp deve ser usado dentro de AppProvider'); return context }
