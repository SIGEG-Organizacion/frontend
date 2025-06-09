// src/modules/company/services/interestService.ts
import axios from 'axios'

export interface Interest {
  uuid: string
  companyName: string
  deadline: string
  description: string
  mode: 'on-site' | 'remote' | 'hybrid'
  contact: string
  userName: string
  userEmail: string
  userRole: 'student' | 'graduate'
}

const API = axios.create({ baseURL: '/api/interests' })
API.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token')
  if (token && cfg.headers) cfg.headers.Authorization = `Bearer ${token}`
  return cfg
})

/**
 * Obtiene la lista de intereses (vistas) para una oportunidad
 */
export const getInterestsByOpportunity = async (
  uuid: string
): Promise<Interest[]> => {
  const { data } = await API.get<{ interests: Interest[] }>(
    `/opportunity/${uuid}`
  )
  return data.interests
}
