// src/modules/admin/dashboard/components/AllOpportunitiesFilters.tsx
import React from 'react'
import { useTranslation } from 'react-i18next'

interface Filters {
  description: string
  companyName: string
  dateFrom: string
  dateTo: string
  status: string
}

interface Props {
  filters: Filters
  onChange: (changes: Partial<Filters>) => void
}

const AllOpportunitiesFilters: React.FC<Props> = ({ filters, onChange }) => {
  const { t } = useTranslation()

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('admin.dashboard.filters.descriptionLabel')}
          </label>
          <input
            type="text"
            value={filters.description}
            onChange={e => onChange({ description: e.target.value })}
            placeholder={t('admin.dashboard.filters.descriptionPlaceholder')}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('admin.dashboard.filters.companyLabel')}
          </label>
          <input
            type="text"
            value={filters.companyName}
            onChange={e => onChange({ companyName: e.target.value })}
            placeholder={t('admin.dashboard.filters.companyPlaceholder')}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('admin.dashboard.filters.dateFromLabel')}
          </label>
          <input
            type="date"
            value={filters.dateFrom}
            onChange={e => onChange({ dateFrom: e.target.value })}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('admin.dashboard.filters.dateToLabel')}
          </label>
          <input
            type="date"
            value={filters.dateTo}
            onChange={e => onChange({ dateTo: e.target.value })}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('admin.dashboard.filters.statusLabel')}
          </label>
          <select
            value={filters.status}
            onChange={e => onChange({ status: e.target.value })}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
          >
            <option value="">{t('admin.dashboard.filters.statusAll')}</option>
            <option value="open">{t('admin.dashboard.status.open')}</option>
            <option value="pending-approval">{t('admin.dashboard.status.pendingApproval')}</option>
            <option value="closed">{t('admin.dashboard.status.closed')}</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default AllOpportunitiesFilters
