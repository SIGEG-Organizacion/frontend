// src/modules/interests/types/interest.ts

/**
 * Interés marcado por el usuario en una oportunidad.
 */
export interface Interest {
  /** UUID de la oportunidad */
  uuid: string
  /** Nombre de la empresa que publicó la oportunidad */
  companyName: string
  /** Fecha límite en formato ISO */
  deadline: string
  /** Descripción de la oportunidad */
  description: string
  /** Modalidad: "remote" | "on-site" | "hybrid" */
  mode: 'remote' | 'on-site' | 'hybrid'
  /** Nombre del usuario que marcó interés */
  userName: string
  /** Correo electrónico del usuario que marcó interés */
  userEmail: string
  /** Rol del usuario: "student" | "graduate" */
  userRole: 'student' | 'graduate'
}
