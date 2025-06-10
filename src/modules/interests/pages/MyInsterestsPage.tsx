// src/modules/interests/pages/MyInterestsPage.tsx
import React, { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useInterests } from '../hooks/useInterests'
import InterestCard from '../components/InterestCard'
import type { Interest } from '../types/interest'

const MyInterestsPage: React.FC = () => {
  const { t } = useTranslation()
  const { interests, loading, error, removeInterest } = useInterests()
  const [removingUuid, setRemovingUuid] = useState<string | null>(null)

  // filtros de cliente
  const [descriptionFilter, setDescriptionFilter] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [modeFilter, setModeFilter] = useState<'remote'|'on-site'|'hybrid'|''>('')

  const filtered = useMemo(() => {
    return (interests ?? []).filter(i => {
      // descripción
      const descOk = descriptionFilter
        ? i.description.toLowerCase().includes(descriptionFilter.toLowerCase())
        : true
      // rango de fecha
      const d = new Date(i.deadline)
      const fromOk = dateFrom ? d >= new Date(dateFrom) : true
      const toOk   = dateTo   ? d <= new Date(dateTo)   : true
      // modalidad
      const modeOk = modeFilter ? i.mode === modeFilter : true
      return descOk && fromOk && toOk && modeOk
    })
  }, [interests, descriptionFilter, dateFrom, dateTo, modeFilter])

  const handleRemove = async (uuid: string) => {
    setRemovingUuid(uuid)
    await removeInterest(uuid)
    setRemovingUuid(null)
  }

  if (loading) {
    return <div className="py-8 text-center">{t('interests.page.loading')}</div>
  }
  if (error) {
    return <div className="py-8 text-center text-red-600">{error}</div>
  }
  if (!interests || interests.length === 0) {
    return <div className="py-8 text-center">{t('interests.page.noData')}</div>
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4">
      <div className="bg-white shadow rounded-lg p-6 space-y-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">{t('interests.page.title')}</h1>

        {/* filtros */}
        <div className="bg-white rounded-2xl shadow-md p-4 grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Descripción */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('interests.filters.descriptionLabel')}
            </label>
            <input
              type="text"
              value={descriptionFilter}
              onChange={e => setDescriptionFilter(e.target.value)}
              placeholder={t('interests.filters.descriptionPlaceholder')}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
            />
          </div>

          {/* Fecha desde */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('interests.filters.dateFromLabel')}
            </label>
            <input
              type="date"
              value={dateFrom}
              onChange={e => setDateFrom(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
            />
          </div>

          {/* Fecha hasta */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('interests.filters.dateToLabel')}
            </label>
            <input
              type="date"
              value={dateTo}
              onChange={e => setDateTo(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
            />
          </div>

          {/* Modalidad */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('interests.filters.modeLabel')}
            </label>
            <select
              value={modeFilter}
              onChange={e => setModeFilter(e.target.value as any)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
            >
              <option value="">{t('interests.filters.modeAll')}</option>
              <option value="remote">{t('interests.filters.modeRemote')}</option>
              <option value="on-site">{t('interests.filters.modeOnSite')}</option>
              <option value="hybrid">{t('interests.filters.modeHybrid')}</option>
            </select>
          </div>
        </div>

        {/* grid de cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(i => (
            <InterestCard
              key={i.uuid}
              interest={i}
              onRemove={handleRemove}
              removing={removingUuid === i.uuid}
            />
          ))}
        </div>
      </div>
      </div>
    </div>
  )
}

export default MyInterestsPage
