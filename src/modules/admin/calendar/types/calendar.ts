// src/modules/admin/calendar/types/calendar.ts

/**
 * Evento de Google Calendar
 */
export interface GoogleEvent {
  summary: string
  start: { dateTime: string }
  end: { dateTime: string }
  [key: string]: any
}

/**
 * Slot de disponibilidad de un administrador
 */
export interface AvailabilitySlot {
  id: string
  date: string        // formato "YYYY-MM-DD"
  startTime: string   // formato "HH:MM"
  endTime: string     // formato "HH:MM"
  createdAt: string   // ISODate
  updatedAt: string   // ISODate
}

/**
 * Solicitud de reunión pendiente o histórica
 */
export interface MeetingRequest {
  id: string
  requestDate: string         // formato "YYYY-MM-DD"
  startTime: string           // formato "HH:MM"
  endTime: string             // formato "HH:MM"
  calendarProvider: string
  description: string
  createdAt: string           // ISODate
  updatedAt: string           // ISODate
  admin: { name: string; email: string }
  company: { name: string; email: string }
}

/**
 * Resultado de aprobar una solicitud:
 * se crea un evento en Google Calendar
 */
export interface ApprovalDetails {
  eventId: string
  summary: string
  start: string  // ISODate
  end: string    // ISODate
}
