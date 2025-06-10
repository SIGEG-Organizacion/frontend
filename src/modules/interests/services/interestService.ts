// src/modules/interests/services/interestService.ts
import axios from 'axios'
import type { Interest } from '../types/interest'

// Crea un cliente axios apuntando al endpoint de intereses
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const api = axios.create({
  baseURL: `${API_URL}/interests`,
})

// Interceptor para adjuntar el token JWT en cada petición
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

/**
 * Lista todas las oportunidades en las que el usuario actual marcó interés.
 * GET /api/interests/
 * Respuesta: { interests: Interest[] }
 */
export const getMyInterests = async (): Promise<Interest[]> => {
  const { data } = await api.get<Interest[]>('/')
  return data
}

/**
 * Marca interés en una oportunidad.
 * POST /api/interests/mark
 * Body: { uuid: string }
 * Respuesta 201
 */
export const markInterest = async (uuid: string): Promise<void> => {
  await api.post('/mark', { uuid })
}

/**
 * Quita interés de una oportunidad.
 * DELETE /api/interests/unmark/:uuid
 * Respuesta 200
 */
export const unmarkInterest = async (uuid: string): Promise<void> => {
  await api.delete(`/unmark/${uuid}`)
}
