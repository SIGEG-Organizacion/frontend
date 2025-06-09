// src/modules/company/services/metricsService.ts
import axios from 'axios'

export interface Metrics {
  views: number
  applications: number
  publications: number
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const api = axios.create({
  baseURL: `${API_URL}/opportunities`,
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`
  return config
})

/**
 * Obtiene las métricas de la empresa actual.
 * Si se le pasa companyName, se añade como query param `company_name`.
 */
export const getMetrics = async (
  companyName?: string
): Promise<Metrics> => {
  const params: Record<string, string> = {}
  if (companyName) params.company_name = companyName

  const { data } = await api.get<Metrics>('/metrics', { params })
  return data
}
