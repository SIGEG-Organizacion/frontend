import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  getOpportunitiesNumbersReport,
  getOpportunitiesStatusReport,
  getInterestReport,
  getUsersReport,
  downloadReport
} from '../services/reportsService'

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

type ReportFormat = 'excel' | 'pdf'

const Reports: React.FC = () => {
  const { t } = useTranslation()
  const [loading, setLoading] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [format, setFormat] = useState<ReportFormat>('excel')
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  })

  const handleGenerateReport = async (
    type: 'numbers' | 'status' | 'interest' | 'users'
  ) => {
    setLoading(type)
    setError(null)
    try {
      const filters: ReportFilters = {
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        groupBy: 'day' // Podemos hacer esto configurable en el futuro
      }

      let data
      let reportTypeId: 'opportunities-numbers' | 'status-opportunities' | 'interest' | 'users'

      switch (type) {
        case 'numbers':
          data = await getOpportunitiesNumbersReport(filters)
          reportTypeId = 'opportunities-numbers'
          downloadReport(data, 'oportunidades-creadas', reportTypeId, format)
          break
        case 'status':
          data = await getOpportunitiesStatusReport(filters)
          reportTypeId = 'status-opportunities'
          downloadReport(data, 'estado-oportunidades', reportTypeId, format)
          break
        case 'interest':
          data = await getInterestReport(filters)
          reportTypeId = 'interest'
          downloadReport(data, 'intereses', reportTypeId, format)
          break
        case 'users':
          data = await getUsersReport(filters)
          reportTypeId = 'users'
          downloadReport(data, 'usuarios', reportTypeId, format)
          break
      }
    } catch (err) {
      console.error('Error generating report:', err)
      setError(t('admin.reports.error'))
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-semibold">{t('admin.reports.title')}</h2>
        <p className="text-gray-500 mt-1">{t('admin.reports.description')}</p>
      </div>

      {/* Configuración de reportes */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Rango de fechas */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Fecha inicial</label>
            <input
              type="date"
              value={dateRange.startDate}
              onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Fecha final</label>
            <input
              type="date"
              value={dateRange.endDate}
              onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          {/* Selector de formato */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Formato</label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value as ReportFormat)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="excel">Excel</option>
              <option value="pdf">PDF</option>
            </select>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Reporte de Oportunidades Creadas */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold mb-4">{t('admin.reports.opportunitiesNumbers')}</h3>
          <p className="text-gray-500 text-sm mb-4">{t('admin.reports.opportunitiesNumbersDesc')}</p>
          <button
            onClick={() => handleGenerateReport('numbers')}
            disabled={!!loading}
            className="inline-flex items-center px-4 py-2 border border-green-600 text-sm font-medium rounded-md text-green-600 bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 w-full justify-center"
          >
            {loading === 'numbers' ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-green-600" />
            ) : (
              `Descargar ${format.toUpperCase()}`
            )}
          </button>
        </div>

        {/* Reporte de Estado de Oportunidades */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold mb-4">{t('admin.reports.opportunitiesStatus')}</h3>
          <p className="text-gray-500 text-sm mb-4">{t('admin.reports.opportunitiesStatusDesc')}</p>
          <button
            onClick={() => handleGenerateReport('status')}
            disabled={!!loading}
            className="inline-flex items-center px-4 py-2 border border-green-600 text-sm font-medium rounded-md text-green-600 bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 w-full justify-center"
          >
            {loading === 'status' ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-green-600" />
            ) : (
              `Descargar ${format.toUpperCase()}`
            )}
          </button>
        </div>

        {/* Reporte de Intereses */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold mb-4">{t('admin.reports.interests')}</h3>
          <p className="text-gray-500 text-sm mb-4">{t('admin.reports.interestsDesc')}</p>
          <button
            onClick={() => handleGenerateReport('interest')}
            disabled={!!loading}
            className="inline-flex items-center px-4 py-2 border border-green-600 text-sm font-medium rounded-md text-green-600 bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 w-full justify-center"
          >
            {loading === 'interest' ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-green-600" />
            ) : (
              `Descargar ${format.toUpperCase()}`
            )}
          </button>
        </div>

        {/* Reporte de Usuarios */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold mb-4">{t('admin.reports.users')}</h3>
          <p className="text-gray-500 text-sm mb-4">{t('admin.reports.usersDesc')}</p>
          <button
            onClick={() => handleGenerateReport('users')}
            disabled={!!loading}
            className="inline-flex items-center px-4 py-2 border border-green-600 text-sm font-medium rounded-md text-green-600 bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 w-full justify-center"
          >
            {loading === 'users' ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-green-600" />
            ) : (
              `Descargar ${format.toUpperCase()}`
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Reports
