// src/modules/company/components/MetricsCards.tsx
import React from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
  views: number
  publications: number
}

const MetricsCards: React.FC<Props> = ({ views, publications }) => {
  const { t } = useTranslation()
  const cards = [
    { label: t('company.dashboard.cards.views'), value: views },
    { label: t('company.dashboard.cards.publications'), value: publications },
  ]
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {cards.map((c, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-start"
        >
          <span className="text-gray-500 mb-2">{c.label}</span>
          <span className="text-4xl font-bold">{c.value}</span>
        </div>
      ))}
    </div>
  )
}

export default MetricsCards
