// src/modules/admin/dashboard/components/AllOpportunitiesTable.tsx
import React from 'react'
import type { Opportunity } from '../../../opportunities/types/opportunity'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

interface Props {
  opportunities: Opportunity[]
  loading: boolean
  onApprove: (uuid: string) => void
  onReject: (uuid: string) => void
}

const AllOpportunitiesTable: React.FC<Props> = ({
  opportunities,
  loading,
  onApprove,
  onReject,
}) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  if (loading) {
    return <div className="p-4 text-center">{t('admin.dashboard.loadingOpps')}</div>
  }

  if (opportunities.length === 0) {
    return <div className="p-4 text-center">{t('admin.dashboard.noOpps')}</div>
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white divide-y divide-gray-200">
        <thead className="bg-gray-100 sticky top-0">
          <tr>
            <th className="px-4 py-2 text-left">{t('admin.dashboard.table.colDescription')}</th>
            <th className="px-4 py-2 text-left">{t('admin.dashboard.table.colCompany')}</th>
            <th className="px-4 py-2 text-left">{t('admin.dashboard.table.colDeadline')}</th>
            <th className="px-4 py-2 text-left">{t('admin.dashboard.table.colMode')}</th>
            <th className="px-4 py-2 text-left">{t('admin.dashboard.table.colStatus')}</th>
            <th className="px-4 py-2 text-center">{t('admin.dashboard.table.colActions')}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {opportunities.map(op => (
            <tr key={op.uuid} className="hover:bg-gray-50">
              <td className="px-4 py-2">
                {op.description.length > 80
                  ? `${op.description.substring(0, 80)}…`
                  : op.description}
              </td>
              <td className="px-4 py-2">
                {typeof op.companyId === 'object' && op.companyId?.userId?.name
                  ? op.companyId.userId.name
                  : (op as any).companyName}
              </td>
              <td className="px-4 py-2">{new Date(op.deadline).toLocaleDateString()}</td>
              <td className="px-4 py-2">{t(`opportunities.detail.modeList.${op.mode}`)}</td>
              <td className="px-4 py-2">{t(`opportunities.detail.statusList.${op.status}`)}</td>
              <td className="px-4 py-2 text-center space-x-2">
                <button
                  onClick={() => navigate(`/opportunities/${op.uuid}`)}
                  className="text-blue-600 hover:underline"
                >
                  {t('admin.dashboard.actions.view')}
                </button>
                {op.status === 'pending-approval' && (
                  <>
                    <button
                      onClick={() => onApprove(op.uuid)}
                      className="text-green-600 border border-green-600 px-2 py-1 rounded hover:bg-green-50 transition"
                    >
                      {t('admin.dashboard.actions.approve')}
                    </button>
                    <button
                      onClick={() => onReject(op.uuid)}
                      className="text-red-600 border border-red-600 px-2 py-1 rounded hover:bg-red-50 transition"
                    >
                      {t('admin.dashboard.actions.reject')}
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AllOpportunitiesTable
