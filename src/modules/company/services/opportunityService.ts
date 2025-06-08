// src/modules/company/services/opportunityService.ts

import axios from 'axios'
import type { Opportunity } from '../types/opportunity'

// Apunta a donde montas opportunityRoutes en tu servidor:
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const api = axios.create({
  baseURL: API_URL + '/opportunity',
})

/**
 * Obtiene las oportunidades de la empresa actual.
 * Si recibe companyName, la envía como query param `company_name`.
 */
const listByCompany = async (
  companyName?: string
): Promise<Opportunity[]> => {
  const params: Record<string, string> = {}
  if (companyName) params.company_name = companyName

  const { data } = await api.get<Opportunity[]>('/listByCompany', { params })
  return data
}

/**
 * Obtiene todas las oportunidades (sin filtrar por empresa).
 */
const list = async (): Promise<Opportunity[]> => {
  const { data } = await api.get<Opportunity[]>('/list')
  return data
}

/**
 * Filtra oportunidades según criterios pasados como query params.
 * Las claves deben coincidir con lo que espera tu controlador (e.g. title, dateFrom, dateTo).
 */
const filterOpportunities = async (filters: {
  title?: string
  dateFrom?: string
  dateTo?: string
}): Promise<Opportunity[]> => {
  const params: Record<string, string> = {}
  if (filters.title) params.title = filters.title
  if (filters.dateFrom) params.dateFrom = filters.dateFrom
  if (filters.dateTo) params.dateTo = filters.dateTo

  const { data } = await api.get<Opportunity[]>('/filter', { params })
  return data
}

/**
 * Obtiene una oportunidad por su UUID.
 */
const getByUuid = async (uuid: string): Promise<Opportunity> => {
  const { data } = await api.get<Opportunity>(`/${uuid}`)
  return data
}

/**
 * Crea una nueva oportunidad.
 */
const createOpportunity = async (
  payload: Omit<Opportunity, '_id' | 'createdAt'>
): Promise<Opportunity> => {
  const { data } = await api.post<Opportunity>('/create', payload)
  return data
}

/**
 * Actualiza una oportunidad existente.
 */
const updateOpportunity = async (
  uuid: string,
  payload: Partial<Opportunity>
): Promise<Opportunity> => {
  const { data } = await api.put<Opportunity>(`/update/${uuid}`, payload)
  return data
}

/**
 * Elimina una oportunidad por UUID.
 */
const deleteOpportunity = async (uuid: string): Promise<void> => {
  await api.delete(`/delete/${uuid}`)
}

export default {
  listByCompany,
  list,
  filterOpportunities,
  getByUuid,
  createOpportunity,
  updateOpportunity,
  deleteOpportunity,
}
