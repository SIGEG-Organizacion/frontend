// src/modules/company/pages/CompanyDashboardPage.tsx
import React, { useState, useEffect, useMemo } from 'react'
import { useAuth } from '../../auth/hooks/useAuth'
import { useTranslation } from 'react-i18next'

import MetricsCards from '../components/MetricsCards'
import OpportunityList from '../components/OpportunityList'
import CompanyOpportunityForm from '../components/CompanyOpportunityForm'

import { useOpportunities } from '../hooks/useOpportunities'
import { getInterestsByOpportunity } from '../services/interestService'
import type { Opportunity } from '../types/opportunity'

const CompanyDashboardPage: React.FC = () => {
  const { user } = useAuth()
  const { t } = useTranslation()
  const companyName = user?.name

  // Fetch de oportunidades
  const { opportunities, loading, error, create, update, remove } =
    useOpportunities(companyName)

  // Filtros cliente
  const [descriptionFilter, setDescriptionFilter] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  // Modal
  const [editing, setEditing] = useState<Opportunity | null>(null)
  const [showForm, setShowForm] = useState(false)

  // Filtrado en memoria
  const filtered = useMemo(() => {
    return opportunities.filter(op => {
      const descOk = descriptionFilter
        ? op.description.toLowerCase().includes(descriptionFilter.toLowerCase())
        : true
      const d = new Date(op.deadline)
      const fromOk = dateFrom ? d >= new Date(dateFrom) : true
      const toOk = dateTo   ? d <= new Date(dateTo)   : true
      return descOk && fromOk && toOk
    })
  }, [opportunities, descriptionFilter, dateFrom, dateTo])

  // Calcular métricas: publications = total de oportunidades; views = suma de intereses
  const [metrics, setMetrics] = useState({ views: 0, publications: 0 })
  useEffect(() => {
    // publications = count
    const pubs = opportunities.length

    // Para views hacemos un Promise.all
    Promise.all(opportunities.map(op => getInterestsByOpportunity(op.uuid)))
      .then(arrays => {
        console.log('Intereses por oportunidad:', arrays)
        const totalViews = arrays.reduce((sum, arr) => sum + arr.length, 0)
        setMetrics({ views: totalViews, publications: pubs })
      })
      .catch(() => {
        // Si falla, dejamos métricas a cero
        setMetrics({ views: 0, publications: pubs })
      })
  }, [opportunities])

  const handleCreate = async (data: Omit<Opportunity, '_id' | 'createdAt' | 'uuid'>) => {
    await create(data)
    setShowForm(false)
  }

  const handleUpdate = async (
    data: Omit<Opportunity, '_id' | 'createdAt' | 'uuid'> & { uuid?: string }
  ) => {
    if (!data.uuid) return
    await update(data.uuid, data)
    setEditing(null)
    setShowForm(false)
  }

  return (
    <>
      {showForm && (
        <div
          className="fixed top-[4rem] inset-x-0 bottom-0 z-40"
          style={{ backdropFilter: 'blur(4px)' }}
        />
      )}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-xl mx-4 relative">
            <button
              onClick={() => { setShowForm(false); setEditing(null) }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
              aria-label="Cerrar"
            >
              ✕
            </button>
            <h2 className="text-2xl font-semibold mb-4 text-center">
              {editing ? t('company.form.editTitle') : t('company.form.newTitle')}
            </h2>
            <CompanyOpportunityForm
              initialData={editing ?? undefined}
              onSave={editing ? handleUpdate : handleCreate}
              onCancel={() => { setShowForm(false); setEditing(null) }}
              loading={loading}
            />
          </div>
        </div>
      )}

      <div className={`p-6 container mx-auto transition-filter duration-300 ${showForm ? 'filter blur-sm' : ''}`}>
        <div className="bg-white shadow rounded-lg p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold">{t('company.dashboard.title')}</h1>
            <button
              onClick={() => { setEditing(null); setShowForm(true) }}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              + {t('company.dashboard.newOpportunity')}
            </button>
          </div>

          <MetricsCards {...metrics} />

          <OpportunityList
            opportunities={filtered}
            loading={loading}
            error={error}
            descriptionFilter={descriptionFilter}
            dateFrom={dateFrom}
            dateTo={dateTo}
            onDescriptionFilter={setDescriptionFilter}
            onDateFrom={setDateFrom}
            onDateTo={setDateTo}
            onEdit={op => { setEditing(op); setShowForm(true) }}
            onDelete={remove}
          />
        </div>
      </div>
    </>
  )
}

export default CompanyDashboardPage
