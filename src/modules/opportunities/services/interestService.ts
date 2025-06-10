// src/modules/opportunities/services/interestService.ts
import axios from 'axios'
import type { Interest } from '../types/interest'

// Base URL de tu API de oportunidades
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const api = axios.create({
  baseURL: `${API_URL}/interests`,
})

// Interceptor para añadir el token JWT
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

/** Marca interés en una oportunidad */
export const markInterest = async (uuid: string): Promise<void> => {
  await api.post('/mark', { uuid })
}

/** Quita interés de una oportunidad */
export const unmarkInterest = async (uuid: string): Promise<void> => {
  await api.delete(`/unmark/${uuid}`)
}

export const getInterestsByOpportunity = async (
  uuid: string
): Promise<Interest[]> => {
  const { data } = await api.get<{ interests: Interest[] }>(
    `/opportunity/${uuid}`
  )
  return data.interests
}