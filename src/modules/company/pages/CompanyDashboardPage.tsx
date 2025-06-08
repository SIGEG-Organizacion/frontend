import React, { useState, useEffect } from 'react'
import { t } from 'i18next'
import CompanyOpportunityForm from '../components/CompanyOpportunityForm'
import opportunityService from '../services/opportunityService'
import type { Opportunity } from '../types/opportunity'

const CompanyDashboardPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false)
  const [filterTitle, setFilterTitle] = useState('')
  const [filterDateFrom, setFilterDateFrom] = useState('')
  const [filterDateTo, setFilterDateTo] = useState('')
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [loadingOps, setLoadingOps] = useState(false)

  useEffect(() => {
    loadOpportunities()
  }, [])

  const loadOpportunities = async () => {
    setLoadingOps(true)
    try {
      const data = await opportunityService.listByCompany()
      setOpportunities(data)
    } catch (err) {
      console.error('Error fetching opportunities:', err)
    } finally {
      setLoadingOps(false)
    }
  }

  const handleApplyFilters = async () => {
    setLoadingOps(true)
    try {
      const filters: { title?: string; dateFrom?: string; dateTo?: string } = {}
      if (filterTitle) filters.title = filterTitle
      if (filterDateFrom) filters.dateFrom = filterDateFrom
      if (filterDateTo) filters.dateTo = filterDateTo

      const data =
        !filterTitle && !filterDateFrom && !filterDateTo
          ? await opportunityService.listByCompany()
          : await opportunityService.filterOpportunities(filters)
      setOpportunities(data)
    } catch (err) {
      console.error('Error applying filters:', err)
    } finally {
      setLoadingOps(false)
    }
  }

  const handleCreated = (newOp: Opportunity) => {
    setOpportunities(prev => [newOp, ...prev])
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
          <div className="bg-white rounded-lg shadow-2xl p-6 max-w-5xl w-full relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label="Cerrar formulario"
            >
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <CompanyOpportunityForm onClose={() => setShowForm(false)} onCreated={handleCreated} />
          </div>
        </div>
      )}

      <div className={`p-6 container mx-auto transition-filter duration-300 ${showForm ? 'filter blur-sm' : ''}`}>
        <div className="bg-white shadow rounded-lg p-6 space-y-6 relative z-10">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">{t('company.dashboard.title')}</h1>
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              + {t('company.dashboard.newOpportunity')}
            </button>
          </div>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white shadow rounded-lg p-4 flex flex-col items-start">
              <h3 className="text-gray-600 text-sm font-medium">{t('company.dashboard.totalViews')}</h3>
              <p className="text-2xl font-bold mt-2">999</p>
              <div className="mt-auto w-full h-16 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">[Mini‐gráfico / Icono]</div>
            </div>
            <div className="bg-white shadow rounded-lg p-4 flex flex-col items-start">
              <h3 className="text-gray-600 text-sm font-medium">{t('company.dashboard.totalApplications')}</h3>
              <p className="text-2xl font-bold mt-2">999</p>
              <div className="mt-auto w-full h-16 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">[Mini‐gráfico / Icono]</div>
            </div>
            <div className="bg-white shadow rounded-lg p-4 flex flex-col items-start">
              <h3 className="text-gray-600 text-sm font-medium">{t('company.dashboard.totalPublications')}</h3>
              <p className="text-2xl font-bold mt-2">999</p>
              <div className="mt-auto w-full h-16 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">[Mini‐gráfico / Icono]</div>
            </div>
          </section>

          <hr />

          <section>
            <h2 className="text-xl font-semibold mb-4">{t('company.dashboard.publications')}</h2>
            <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="filter-title" className="block text-sm font-medium text-gray-700 mb-1">{t('company.dashboard.filterByName')}</label>
                <input
                  id="filter-title"
                  type="text"
                  value={filterTitle}
                  onChange={e => setFilterTitle(e.target.value)}
                  placeholder={t('company.dashboard.filterByNamePlaceholder')}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="filter-date-from" className="block text-sm font-medium text-gray-700 mb-1">{t('company.dashboard.filterDateFrom')}</label>
                <input
                  id="filter-date-from"
                  type="date"
                  value={filterDateFrom}
                  onChange={e => setFilterDateFrom(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="filter-date-to" className="block text-sm font-medium text-gray-700 mb-1">{t('company.dashboard.filterDateTo')}</label>
                <input
                  id="filter-date-to"
                  type="date"
                  value={filterDateTo}
                  onChange={e => setFilterDateTo(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mb-8">
              <button
                onClick={handleApplyFilters}
                type="button"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {t('company.dashboard.applyFilters')}
              </button>
            </div>
            <div className="bg-white shadow rounded-lg overflow-x-auto">
              {loadingOps ? (
                <p className="p-4">{t('company.dashboard.loading')}</p>
              ) : opportunities.length === 0 ? (
                <p className="p-4">{t('company.dashboard.noOpportunities')}</p>
              ) : (
                <table className="min-w-full table-auto">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-2 text-left">{t('company.dashboard.table.description')}</th>
                      <th className="px-4 py-2 text-left">{t('company.dashboard.table.deadline')}</th>
                      <th className="px-4 py-2 text-left">{t('company.dashboard.table.status')}</th>
                      <th className="px-4 py-2 text-left">{t('company.dashboard.table.mode')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {opportunities.map(op => (
                      <tr key={op.uuid} className="border-t">
                        <td className="px-4 py-2">{op.description}</td>
                        <td className="px-4 py-2">{new Date(op.deadline).toLocaleDateString()}</td>
                        <td className="px-4 py-2">{op.status}</td>
                        <td className="px-4 py-2">{op.mode}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default CompanyDashboardPage
