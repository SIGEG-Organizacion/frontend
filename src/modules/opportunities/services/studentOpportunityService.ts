// src/modules/opportunities/services/studentOpportunityService.ts
import axios from 'axios'
import type { Opportunity } from '../types/opportunity'

// Base URL de tu API de oportunidades
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const api = axios.create({
  baseURL: `${API_URL}/opportunities`
})

// Interceptor para añadir el token JWT
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

/**
 * Lista todas las oportunidades disponibles.
 * GET /api/opportunities/list
 * Respuesta: { opportunities: Opportunity[] }
 */
export const listAllOpportunities = async (): Promise<Opportunity[]> => {
  const { data } = await api.get<{ opportunities: Opportunity[] }>('/list')
  return data.opportunities
}

/**
 * Obtiene una oportunidad por su UUID.
 * GET /api/opportunities/:uuid
 * Respuesta: Opportunity
 */
export const getOpportunityByUuid = async (
  uuid: string
): Promise<Opportunity> => {
  const { data } = await api.get<{ opportunity: Opportunity }>(`/${uuid}`)
  return data.opportunity 
}
