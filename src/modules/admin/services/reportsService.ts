import axios from 'axios'
import {
  exportOpportunityNumbersExcelBrowser,
  exportOpportunityStatsPDFBrowser,
  exportOpportunityStatsExcelBrowser,
  exportOpportunityNumbersPDFBrowser,
  exportUserStatsExcelBrowser,
  exportUserStatsPDFBrowser,
  exportInterestNumbersExcelBrowser,
  exportInterestNumbersPDFBrowser
} from '../utils/reportExporter'

const API_URL = import.meta.env.VITE_API_URL + '/reports'
const api = axios.create({ baseURL: API_URL })

// Interceptor para adjuntar el token JWT
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Tipos específicos para cada reporte
interface ReportFilters {
  startDate?: string
  endDate?: string
  companyName?: string
  groupBy?: 'day' | 'month'
  status?: string
  forStudents?: boolean
  uuid?: string
  role?: 'student' | 'company' | 'adminLink' | 'vadminTFG'
  validated?: boolean
}

// Funciones de API con tipos específicos
export const getOpportunitiesNumbersReport = async (filters: ReportFilters) => {
  const res = await api.get('/numberOpportunitiesCreated', { params: filters })
  return res.data
}

export const getOpportunitiesStatusReport = async (filters: ReportFilters) => {
  const res = await api.get('/statusOpportunities', { params: filters })
  return res.data
}

export const getInterestReport = async (filters: ReportFilters) => {
  const res = await api.get('/interest', { params: filters })
  return res.data
}

export const getUsersReport = async (filters: ReportFilters) => {
  const res = await api.get('/users', { params: filters })
  return res.data
}

export const downloadReport = async (
  data: unknown,
  filename: string,
  reportType: 'opportunities-numbers' | 'status-opportunities' | 'interest' | 'users',
  format: 'excel' | 'pdf' = 'excel'
): Promise<void> => {
  switch (reportType) {
    case 'opportunities-numbers':
      if (format === 'pdf') {
        exportOpportunityNumbersPDFBrowser(data)
      } else {
        exportOpportunityNumbersExcelBrowser(data)
      }
      break
    case 'status-opportunities':
      if (format === 'pdf') {
        exportOpportunityStatsPDFBrowser(data)
      } else {
        exportOpportunityStatsExcelBrowser(data)
      }
      break
    case 'interest':
      if (format === 'pdf') {
        exportInterestNumbersPDFBrowser(data)
      } else {
        exportInterestNumbersExcelBrowser(data)
      }
      break
    case 'users':
      if (format === 'pdf') {
        exportUserStatsPDFBrowser(data)
      } else {
        exportUserStatsExcelBrowser(data)
      }
      break
    default:
      throw new Error('Tipo de reporte no soportado')
  }
}
