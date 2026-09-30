import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
})

export const futureApiContract = {
  auth: '/auth',
  students: '/students',
  teachers: '/teachers',
  classes: '/classes',
  subjects: '/subjects',
  activities: '/activities',
  grades: '/grades',
  attendance: '/attendance',
  announcements: '/announcements',
  ai: '/ai',
} as const

export default api
