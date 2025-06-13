// src/modules/admin/calendar/services/calendarService.ts
import axios from 'axios'

// Cliente Axios con baseURL para calendario
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const api = axios.create({
  baseURL: `${API_URL}/calendar`,
})
api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token')
  if (token && cfg.headers) {
    cfg.headers.Authorization = `Bearer ${token}`
  }
  return cfg
})

/** Evento de Google Calendar */
export interface GoogleEvent {
  summary: string
  start: { dateTime: string }
  end: { dateTime: string }
  [key: string]: any
}

/** Slot de disponibilidad */
export interface AvailabilitySlot {
  id: string
  date: string        // "YYYY-MM-DD"
  startTime: string   // "HH:MM"
  endTime: string     // "HH:MM"
  createdAt: string
  updatedAt: string
}

/** Detalles de solicitud aprobada */
export interface ApprovalDetails {
  eventId: string
  summary: string
  start: string      // ISODate
  end: string        // ISODate
}

/** Solicitud de reunión */
export interface MeetingRequest {
  id: string
  requestDate: string     // "YYYY-MM-DD"
  startTime: string
  endTime: string
  calendarProvider: string
  description: string
  createdAt: string
  updatedAt: string
  admin: { name: string; email: string }
  company: { name: string; email: string }
}

/**
 * Inicia el flujo OAuth2 redirigiendo al endpoint de Google.
 */
export const connectGoogleCalendar = async (): Promise<void> => {
  const token = localStorage.getItem('token')
  const res = await fetch(`${API_URL}/calendar/google/auth`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    redirect: 'manual',      // NO seguir el redirect automáticamente
  })

  if (res.status === 302) {
    const googleUrl = res.headers.get('Location')
    if (googleUrl) {
      window.location.href = googleUrl
    } else {
      throw new Error('Missing redirect URL from backend')
    }
  } else {
    // parsea el body de error (si viene JSON) y lanza
    let errMsg = `Error ${res.status}`
    try {
      const err = await res.json()
      if (err.message) errMsg = err.message
    } catch {}
    throw new Error(errMsg)
  }
}

/**
 * Maneja el callback de Google OAuth.
 * @returns true si se conectó exitosamente.
 */
export const handleGoogleCallback = async (
  code: string,
  state?: string
): Promise<boolean> => {
  const params: Record<string,string> = { code }
  if (state) params.state = state
  const { data } = await api.get<string>('/google/callback', { params })
  return data === 'connected'
}

/** Lista los próximos 50 eventos del calendario de Google */
export const listGoogleEvents = async (): Promise<GoogleEvent[]> => {
  const { data } = await api.get<GoogleEvent[]>('/google/events')
  return data
}

/** Slots disponibles para un admin (por email) */
export const listAvailabilitySlots = async (
  email: string
): Promise<AvailabilitySlot[]> => {
  const { data } = await api.get<{ slots: AvailabilitySlot[] }>(
    '/availabilitySlots',
    { params: { email } }
  )
  return data.slots
}

/** Crea un nuevo slot de disponibilidad */
export const createAvailabilitySlot = async (
  slot: Omit<AvailabilitySlot,'id'|'createdAt'|'updatedAt'>
): Promise<AvailabilitySlot> => {
  const { data } = await api.post<{ slot: AvailabilitySlot }>(
    '/availabilitySlots',
    slot
  )
  return data.slot
}

/** Actualiza un slot existente */
export const updateAvailabilitySlot = async (
  slotId: string,
  slot: Omit<AvailabilitySlot,'id'|'createdAt'|'updatedAt'>
): Promise<AvailabilitySlot> => {
  const { data } = await api.put<{ slot: AvailabilitySlot }>(
    `/availabilitySlots/${slotId}`,
    slot
  )
  return data.slot
}

/** Elimina un slot */
export const deleteAvailabilitySlot = async (
  slotId: string
): Promise<void> => {
  await api.delete(`/availabilitySlots/${slotId}`)
}

/** Crea una solicitud de reunión */
export const createMeetingRequest = async (
  req: Omit<MeetingRequest,'id'|'createdAt'|'updatedAt'|'admin'|'company'>
): Promise<MeetingRequest> => {
  const { data } = await api.post<{ request: MeetingRequest }>(
    '/request',
    req
  )
  return data.request
}

/** Rechaza (elimina) una solicitud */
export const denyMeetingRequest = async (
  requestId: string
): Promise<void> => {
  await api.delete(`/request/${requestId}`)
}

/** Aprueba una solicitud y crea el evento en Google Calendar */
export const approveMeetingRequest = async (
  requestId: string
): Promise<ApprovalDetails> => {
  const { data } = await api.put<{
    message: string
    details: ApprovalDetails
  }>(`/request/${requestId}/approve`)
  return data.details
}

/** Lista todas las solicitudes del usuario autenticado */
export const listMeetingRequests = async (): Promise<MeetingRequest[]> => {
  const { data } = await api.get<{ requests: MeetingRequest[] }>('/request')
  return data.requests
}
