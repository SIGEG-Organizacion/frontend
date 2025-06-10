// src/modules/opportunities/pages/OpportunityDetailPage.tsx
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../auth/hooks/useAuth'
import { getOpportunityByUuid } from '../services/studentOpportunityService'
import {
  getInterestsByOpportunity,
  markInterest,
  unmarkInterest,
} from '../services/interestService'
import type { Opportunity } from '../types/opportunity'
import type { Interest } from '../types/interest'

const OpportunityDetailPage: React.FC = () => {
  const { uuid } = useParams<{ uuid: string }>()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { user } = useAuth()

  const [opportunity, setOpportunity] = useState<Opportunity | null>(null)
  const [interests, setInterests] = useState<Interest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!uuid) {
      setError(t('opportunities.detail.error'))
      setLoading(false)
      return
    }
    Promise.all([
      getOpportunityByUuid(uuid),
      getInterestsByOpportunity(uuid),
    ])
      .then(([opp, ints]) => {
        setOpportunity(opp)
        setInterests(ints)
      })
      .catch(err => setError(err.message || t('opportunities.detail.error')))
      .finally(() => setLoading(false))
  }, [uuid, t])

  const toggleInterest = async () => {
    if (!uuid || !user?.email) return
    setSaving(true)
    try {
      const has = interests.some(i => i.userEmail === user.email)
      if (has) {
        await unmarkInterest(uuid)
      } else {
        await markInterest(uuid)
      }
      const updated = await getInterestsByOpportunity(uuid)
      setInterests(updated)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center py-8">
        {t('opportunities.detail.loading')}
      </div>
    )
  }

  if (error || !opportunity) {
    return (
      <div className="flex-1 flex items-center justify-center py-8 text-red-600">
        {error || t('opportunities.detail.error')}
      </div>
    )
  }

  const {
    companyId,
    description,
    deadline,
    mode,
    email,
    forStudents,
    status,
    requirements,
    benefits,
    flyerUrl,
    flyerFormat,
  } = opportunity

  // Company name extraction
  let companyName: string
  if (
    companyId &&
    typeof companyId === 'object' &&
    'userId' in companyId &&
    companyId.userId?.name
  ) {
    companyName = companyId.userId.name
  } else if ('companyName' in opportunity && (opportunity as any).companyName) {
    companyName = (opportunity as any).companyName
  } else {
    companyName = t('opportunities.detail.companyUnknown')
  }

  const sector =
    companyId && typeof companyId === 'object' && 'sector' in companyId
      ? (companyId as any).sector
      : undefined
  const address =
    companyId && typeof companyId === 'object' && 'address' in companyId
      ? (companyId as any).address
      : undefined

  // Determine if current user has marked interest
  const hasMarked = !!user?.email && interests.some(i => i.userEmail === user.email)

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-8 space-y-6">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:underline"
        >
          ← {t('opportunities.detail.back')}
        </button>

        <h1 className="text-2xl font-bold">{companyName}</h1>
        {sector && address && (
          <div className="text-sm text-gray-500">
            {sector} • {address}
          </div>
        )}

        <p className="text-gray-700">{description}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <span className="font-medium">{t('opportunities.detail.deadline')}:</span>{' '}
            {new Date(deadline).toLocaleString()}
          </div>
          <div>
            <span className="font-medium">{t('opportunities.detail.mode')}:</span>{' '}
            {t(`opportunities.detail.modeList.${mode}`)}
          </div>
          <div>
            <span className="font-medium">{t('opportunities.detail.forStudents')}:</span>{' '}
            {forStudents ? t('opportunities.detail.yes') : t('opportunities.detail.no')}
          </div>
          <div>
            <span className="font-medium">{t('opportunities.detail.status')}:</span>{' '}
            {t(`opportunities.detail.statusList.${status}`)}
          </div>
          <div>
            <span className="font-medium">{t('opportunities.detail.contact')}:</span>{' '}
              <a href={`mailto:${email}`} className="text-blue-600 hover:underline">
                {email}
              </a>
          </div>
        </div>

        {requirements && (
          <div>
            <h2 className="font-medium">{t('opportunities.detail.requirements')}</h2>
            <ul className="list-disc list-inside text-gray-700">
              {requirements.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
        )}

        {benefits && (
          <div>
            <h2 className="font-medium">{t('opportunities.detail.benefits')}</h2>
            <ul className="list-disc list-inside text-gray-700">
              {benefits.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
        )}

        {flyerUrl && (
          <div>
            <h2 className="font-medium">{t('opportunities.detail.flyer')}</h2>
            <a
              href={flyerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {t('opportunities.detail.viewFlyer')} {flyerFormat?.toUpperCase()}
            </a>
          </div>
        )}

        {(user?.role === 'student' || user?.role === 'graduate') && (
          <div className="mt-6">
            <button
              onClick={toggleInterest}
              disabled={saving}
              className={`px-4 py-2 rounded ${
                hasMarked
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              } transition`}
            >
              {saving
                ? '…'
                : hasMarked
                ? t('opportunities.detail.unmarkInterest')
                : t('opportunities.detail.markInterest')}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default OpportunityDetailPage
