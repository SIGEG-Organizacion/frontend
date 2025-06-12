// src/modules/admin/dashboard/pages/AdminDashboardPage.tsx
import React, { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import StatsCards from '../components/StatsCards'
import AllOpportunitiesFilters from '../components/AllOpportunitiesFilters'
import AllOpportunitiesTable from '../components/AllOpportunitiesTable'
import { useAdminDashboard } from '../hooks/useAdminDashboard'
import type { Opportunity } from '../../../opportunities/types/opportunity'
import { updateOpportunityStatus } from '../services/adminDashboardService'

const AdminDashboardPage: React.FC = () => {
  const { t } = useTranslation()
  const {
    totalOpportunities,
    pendingOpportunities,
    usersByRole,
    opportunities,
    loading,
    error,
    refresh,
  } = useAdminDashboard()

  const [filters, setFilters] = useState({
    description: '',
    companyName: '',
    dateFrom: '',
    dateTo: '',
    status: '',
  })

  // Filtrado en memoria
  const filtered = useMemo<Opportunity[]>(() => {
    return opportunities.filter(op => {
      const descOk = filters.description
        ? op.description.toLowerCase().includes(filters.description.toLowerCase())
        : true
      const compOk = filters.companyName
        ? (typeof op.companyId === 'object'
            ? op.companyId.userId.name
            : (op as any).companyName
          )
            .toLowerCase()
            .includes(filters.companyName.toLowerCase())
        : true
      const d = new Date(op.deadline)
      const fromOk = filters.dateFrom ? d >= new Date(filters.dateFrom) : true
      const toOk   = filters.dateTo   ? d <= new Date(filters.dateTo)   : true
      const statusOk = filters.status ? op.status === filters.status : true
      return descOk && compOk && fromOk && toOk && statusOk
    })
  }, [opportunities, filters])

  const handleApprove = async (uuid: string) => {
    await updateOpportunityStatus(uuid, 'open')
    await refresh()
  }
  const handleReject = async (uuid: string) => {
    await updateOpportunityStatus(uuid, 'closed')
    await refresh()
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4">
      <div className="bg-white shadow rounded-lg p-6 space-y-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{t('admin.dashboard.title')}</h1>
        {error && <div className="text-red-600 mb-4">{error}</div>}

        <StatsCards
          totalOpportunities={totalOpportunities}
          pendingOpportunities={pendingOpportunities}
          usersByRole={usersByRole}
        />

        <h2 className="text-2xl font-semibold mb-4">
            {t('admin.dashboard.opportunitiesTitle')}
        </h2>

        <AllOpportunitiesFilters
          filters={filters}
          onChange={changes => setFilters(prev => ({ ...prev, ...changes }))}
        />

        <AllOpportunitiesTable
          opportunities={filtered}
          loading={loading}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      </div>
    </div>
    </div>
  )
}

export default AdminDashboardPage
