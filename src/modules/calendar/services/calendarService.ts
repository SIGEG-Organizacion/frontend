import axios from 'axios'

export type Provider = 'google' | 'microsoft'

// Cliente apuntando al endpoint /api/users/calendar
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL + '/calendar',
})
API.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token')
  if (token && cfg.headers) cfg.headers.Authorization = `Bearer ${token}`
  return cfg
})

// ==== OAuth + Eventos (ya tenías estos) ====
export const getAuthUrl = (provider: Provider): Promise<string> =>
  API.get<{ url: string }>(`/auth/${provider}`)
     .then(r => r.data.url)

export const handleCallback = (
  provider: Provider,
  code: string
): Promise<void> =>
  API.post(`/auth/${provider}/callback`, { code })
     .then(() => {})

export interface CalendarEvent {
  id: string
  title: string
  start: string
  end: string
}
export const fetchEvents = (): Promise<CalendarEvent[]> =>
  API.get<CalendarEvent[]>('/events').then(r => r.data)

export const resync = (): Promise<void> =>
  API.post('/resync').then(() => {})

// ==== Solicitudes de agenda ====
export interface Request {
  id: string
  date: string            // e.g. "2025-04-04"
  requester: string       // nombre o empresa
  email: string
  time: string            // e.g. "13:00"
  subject: string
  mode: 'Presencial' | 'Virtual'
}

export const getPendingRequests = async (): Promise<Request[]> => {
  const res = await API.get<{ requests: Request[] }>('/requests')
  return res.data.requests
}

export const approveRequest = async (id: string): Promise<void> => {
  await API.post(`/requests/${id}/approve`)
}

export const rejectRequest = async (id: string): Promise<void> => {
  await API.post(`/requests/${id}/reject`)
}
