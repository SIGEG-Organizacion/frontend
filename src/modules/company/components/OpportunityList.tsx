// src/modules/company/components/OpportunityList.tsx
import React from 'react'
import type { Opportunity } from '../types/opportunity'
import { useTranslation } from 'react-i18next'

interface Props {
  opportunities: Opportunity[]
  loading: boolean
  error: string | null

  // filtros controlados
  descriptionFilter: string
  dateFrom: string
  dateTo: string
  onDescriptionFilter: (val: string) => void
  onDateFrom: (val: string) => void
  onDateTo: (val: string) => void

  onEdit: (op: Opportunity) => void
  onDelete: (uuid: string) => void
}

const OpportunityList: React.FC<Props> = ({
  opportunities,
  loading,
  error,
  descriptionFilter,
  dateFrom,
  dateTo,
  onDescriptionFilter,
  onDateFrom,
  onDateTo,
  onEdit,
  onDelete,
}) => {
  const { t } = useTranslation()

  return (
    <div className="space-y-4">
      {/* Opportunidades */}
      <h2 className="text-2xl font-semibold mb-4">
        {t('company.list.title')}
      </h2>

      {/* Filtros en cliente con labels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('company.list.filterDescriptionLabel')}
          </label>
          <input
            type="text"
            placeholder={t('company.list.filterDescription')}
            value={descriptionFilter}
            onChange={e => onDescriptionFilter(e.target.value)}
            className="border rounded px-3 py-2 focus:outline-none focus:ring w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('company.list.filterDateFromLabel')}
          </label>
          <input
            type="date"
            value={dateFrom}
            onChange={e => onDateFrom(e.target.value)}
            className="border rounded px-3 py-2 focus:outline-none focus:ring w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('company.list.filterDateToLabel')}
          </label>
          <input
            type="date"
            value={dateTo}
            onChange={e => onDateTo(e.target.value)}
            className="border rounded px-3 py-2 focus:outline-none focus:ring w-full"
          />
        </div>
      </div>

      {/* Mensajes */}
      {error && <div className="text-red-600">{error}</div>}
      {loading && <div>{t('company.list.loading')}</div>}

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th className="px-4 py-2 text-left">
                {t('company.list.colDescription')}
              </th>
              <th className="px-4 py-2 text-left">
                {t('company.list.colDeadline')}
              </th>
              <th className="px-4 py-2 text-center">
                {t('company.list.colActions')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {opportunities.map(op => (
              <tr key={op.uuid} className="hover:bg-gray-50">
                <td className="px-4 py-2">
                  {op.description.length > 100
                    ? `${op.description.substring(0, 100)}...`
                    : op.description}
                </td>
                <td className="px-4 py-2">
                  {new Date(op.deadline).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 text-center space-x-2">
                  <button
                    onClick={() => onEdit(op)}
                    className="text-green-600 border border-green-600 px-2 py-1 rounded hover:bg-green-50 transition"
                  >
                    {t('company.list.edit')}
                  </button>
                  <button
                    onClick={() => onDelete(op.uuid)}
                    className="text-red-600 border border-red-600 px-2 py-1 rounded hover:bg-red-50 transition"
                  >
                    {t('company.list.delete')}
                  </button>
                </td>
              </tr>
            ))}
            {opportunities.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-6 text-center text-gray-500">
                  {t('company.list.noData')}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OpportunityList
