// src/modules/opportunities/types/interest.ts

/**
 * Datos que devuelve el endpoint GET /api/interests/opportunity/:uuid
 */
export interface Interest {
  uuid: string
  companyName: string
  deadline: string       // ISO date
  description: string
  mode: 'remote' | 'on-site' | 'hybrid'
  userName: string
  userEmail: string
  userRole: 'student' | 'graduate'
}
