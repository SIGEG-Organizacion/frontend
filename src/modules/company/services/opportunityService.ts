// src/modules/company/services/opportunityService.ts

import axios from 'axios'
import type { Opportunity } from '../types/opportunity'

// Base URL de tu API (Vite)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: `${API_URL}/opportunities`,
})

// Interceptor para añadir el Bearer token en cada petición
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => Promise.reject(error)
)

/**
 * Obtiene las oportunidades de la empresa del usuario autenticado.
 * Si recibe companyName, la envía como query param `company_name`.
 */
export const listByCompany = async (
  companyName?: string
): Promise<Opportunity[]> => {
  const params: Record<string, string> = {}
  if (companyName) params.company_name = companyName

  const { data } = await api.get<{ opportunities: Opportunity[] }>('/listByCompany', { params })
  return data.opportunities
}

/**
 * Obtiene todas las oportunidades (sin filtrar por empresa).
 */
export const list = async (): Promise<Opportunity[]> => {
  const { data } = await api.get<Opportunity[]>('/list')
  return data
}

/**
 * Filtra oportunidades según criterios pasados como query params.
 */
export const filterOpportunities = async (filters: {
  description?: string
  deadline?: string
}): Promise<Opportunity[]> => {
  const params: Record<string, string> = {}
  if (filters.description) params.description = filters.description
  if (filters.deadline) params.deadline = filters.deadline

  const { data } = await api.get<Opportunity[]>('/filter', { params })
  return data
}

/**
 * Obtiene una oportunidad por su UUID.
 */
export const getByUuid = async (uuid: string): Promise<Opportunity> => {
  const { data } = await api.get<Opportunity>(`/${uuid}`)
  return data
}

/**
 * Crea una nueva oportunidad.
 */
export const createOpportunity = async (
  payload: Omit<Opportunity, '_id' | 'createdAt' | 'uuid'> 
): Promise<Opportunity> => {
  const { data } = await api.post<Opportunity>('/create', payload)
  return data
}

/**
 * Actualiza una oportunidad existente.
 */
export const updateOpportunity = async (
  uuid: string,
  payload: Partial<Opportunity>
): Promise<Opportunity> => {
  const { data } = await api.put<Opportunity>(`/update/${uuid}`, payload)
  return data
}

/**
 * Elimina una oportunidad por UUID.
 */
export const deleteOpportunity = async (uuid: string): Promise<void> => {
  await api.delete(`/delete/${uuid}`)
}
