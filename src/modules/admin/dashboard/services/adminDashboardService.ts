// src/modules/admin/dashboard/services/adminDashboardService.ts
import axios from 'axios'
import type { Opportunity } from '../../../opportunities/types/opportunity'
import type { User } from '../../../auth/types/auth'

// Apunta a donde montas userRoutes en tu servidor:
const API_URL = import.meta.env.VITE_API_URL
                 || 'http://localhost:5000/api'

// Axios client for opportunities
const apiOpp = axios.create({ baseURL: API_URL + '/opportunities' })
apiOpp.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token')
  if (token && cfg.headers) cfg.headers.Authorization = `Bearer ${token}`
  return cfg
})

// Axios client for users
const apiUsers = axios.create({ baseURL: API_URL + '/users' })
apiUsers.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token')
  if (token && cfg.headers) cfg.headers.Authorization = `Bearer ${token}`
  return cfg
})

/**
 * Lista todas las oportunidades de la plataforma.
 */
export const listAllOpportunities = async (): Promise<Opportunity[]> => {
  const { data } = await apiOpp.get<{ opportunities: Opportunity[] }>('/list')
  return data.opportunities
}

/**
 * Cambia sólo el estado de una oportunidad.
 * PUT /api/opportunities/update/:uuid
 * Body: { status: 'open' | 'closed' | 'pending-approval' }
 */
export const updateOpportunityStatus = async (
  uuid: string,
  status: 'open' | 'closed' | 'pending-approval'
): Promise<void> => {
  await apiOpp.put(`/update/${uuid}`, { status })
}

/**
 * Lista todos los usuarios de la plataforma.
 */
export const listAllUsers = async (): Promise<User[]> => {
  const { data } = await apiUsers.get<{ users: User[] }>('/')
  return data.users
}
