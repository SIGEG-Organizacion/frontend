// src/modules/opportunities/components/OpportunityFilters.tsx
import React from 'react'
import { useTranslation } from 'react-i18next'

interface Filters {
  description: string
  companyName: string
  dateFrom: string
  dateTo: string
  forStudents: boolean
}

interface Props {
  filters: Filters
  onChange: (newFilters: Partial<Filters>) => void
}

const OpportunityFilters: React.FC<Props> = ({ filters, onChange }) => {
  const { t } = useTranslation()

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Descripción */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('opportunities.filters.descriptionLabel')}
          </label>
          <input
            type="text"
            value={filters.description}
            onChange={e => onChange({ description: e.target.value })}
            placeholder={t('opportunities.filters.descriptionPlaceholder')}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
          />
        </div>

        {/* Empresa */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('opportunities.filters.companyLabel')}
          </label>
          <input
            type="text"
            value={filters.companyName}
            onChange={e => onChange({ companyName: e.target.value })}
            placeholder={t('opportunities.filters.companyPlaceholder')}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
          />
        </div>

        {/* Fecha desde */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('opportunities.filters.dateFromLabel')}
          </label>
          <input
            type="date"
            value={filters.dateFrom}
            onChange={e => onChange({ dateFrom: e.target.value })}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
          />
        </div>

        {/* Fecha hasta */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('opportunities.filters.dateToLabel')}
          </label>
          <input
            type="date"
            value={filters.dateTo}
            onChange={e => onChange({ dateTo: e.target.value })}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
          />
        </div>

        {/* Solo para estudiantes */}
        <div className="flex items-center mt-6">
          <input
            id="forStudents"
            type="checkbox"
            checked={filters.forStudents}
            onChange={e => onChange({ forStudents: e.target.checked })}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
          <label htmlFor="forStudents" className="ml-2 text-sm text-gray-700">
            {t('opportunities.filters.forStudentsLabel')}
          </label>
        </div>
      </div>
    </div>
  )
}

export default OpportunityFilters
