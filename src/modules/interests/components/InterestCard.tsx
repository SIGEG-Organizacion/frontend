// src/modules/interests/components/InterestCard.tsx
import React from 'react'
import { useNavigate } from 'react-router-dom'
import type { Interest } from '../types/interest'
import { useTranslation } from 'react-i18next'

interface Props {
  interest: Interest
  onRemove: (uuid: string) => void
  removing: boolean
}

const InterestCard: React.FC<Props> = ({ interest, onRemove, removing }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleView = () => {
    navigate(`/opportunities/${interest.uuid}`)
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between">
      <div onClick={handleView} className="cursor-pointer">
        <h3 className="text-lg font-semibold mb-2">{interest.companyName}</h3>
        <p className="text-gray-700 mb-4">
          {interest.description.length > 50
            ? `${interest.description.substring(0, 50)}…`
            : interest.description}
        </p>
      </div>
      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <span>{new Date(interest.deadline).toLocaleDateString()}</span>
        <button
          onClick={handleView}
          className="text-blue-600 hover:underline focus:outline-none"
        >
          {t('interests.card.view')}
        </button>
      </div>
      <button
        onClick={() => onRemove(interest.uuid)}
        disabled={removing}
        className={`mt-auto px-4 py-2 rounded transition ${
          removing
            ? 'bg-gray-400 text-white'
            : 'bg-red-600 text-white hover:bg-red-700'
        }`}
      >
        {removing ? t('interests.card.removing') : t('interests.card.remove')}
      </button>
    </div>
  )
}

export default InterestCard
