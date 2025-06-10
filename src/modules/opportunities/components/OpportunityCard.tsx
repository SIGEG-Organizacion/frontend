// src/modules/opportunities/components/OpportunityCard.tsx
import React from 'react'
import { useNavigate } from 'react-router-dom'
import type { Opportunity } from '../types/opportunity'
import { useTranslation } from 'react-i18next'

interface Props {
  opportunity: Opportunity
}

const OpportunityCard: React.FC<Props> = ({ opportunity }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const companyName = opportunity.companyId.userId.name

  return (
    <div
      onClick={() => navigate(`/opportunities/${opportunity.uuid}`)}
      className="cursor-pointer bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition flex flex-col justify-between"
    >
      <div>
        <h3 className="text-lg font-semibold mb-2">{companyName}</h3>
        <p className="text-gray-700 mb-4">
          {opportunity.description.length > 50
            ? `${opportunity.description.substring(0, 50)}…`
            : opportunity.description}
        </p>
      </div>
      <div className="mt-auto flex items-center justify-between text-sm text-gray-500">
        <span>{new Date(opportunity.deadline).toLocaleDateString()}</span>
        <button
          onClick={e => { e.stopPropagation(); navigate(`/opportunities/${opportunity.uuid}`) }}
          className="text-blue-600 hover:underline focus:outline-none"
        >
          {t('opportunities.cards.viewDetails')}
        </button>
      </div>
    </div>
  )
}

export default OpportunityCard
