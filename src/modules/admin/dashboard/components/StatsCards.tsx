// src/modules/admin/dashboard/components/StatsCards.tsx
import React from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
  totalOpportunities: number
  pendingOpportunities: number
  usersByRole: Record<string, number>
}

const StatsCards: React.FC<Props> = ({
  totalOpportunities,
  pendingOpportunities,
  usersByRole,
}) => {
  const { t } = useTranslation()

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="text-gray-500">{t('admin.dashboard.totalOpportunities')}</div>
        <div className="mt-4 text-3xl font-bold">{totalOpportunities}</div>
      </div>
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="text-gray-500">{t('admin.dashboard.pendingOpportunities')}</div>
        <div className="mt-4 text-3xl font-bold">{pendingOpportunities}</div>
      </div>
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="text-gray-500">{t('admin.dashboard.usersByRole')}</div>
        <div className="mt-4 space-y-1">
          {Object.entries(usersByRole).map(([role, count]) => (
            <div key={role} className="flex justify-between text-lg">
              <span>{t(`admin.dashboard.roles.${role}`, { defaultValue: role })}</span>
              <span className="font-semibold">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StatsCards
