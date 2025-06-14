// src/modules/opportunities/pages/OpportunitiesPage.tsx
import React, { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../auth/hooks/useAuth'
import OpportunityFilters from '../components/OpportunityFilters'
import OpportunityCard from '../components/OpportunityCard'
import { useStudentOpportunities } from '../hooks/useStudentOpportunities'

const OpportunitiesPage: React.FC = () => {
  const { t } = useTranslation()
  const { user } = useAuth()
  const { opportunities, loading, error } = useStudentOpportunities()

  const [filters, setFilters] = useState({
    description: '',
    companyName: '',
    dateFrom: '',
    dateTo: '',
    forStudents: false,
  })

  const filtered = useMemo(() => {
    return opportunities.filter(op => {
      // 1) Filtrado según el rol del usuario:
      //   - "student" y "adminTGF" ➞ solo muestran forStudents === true
      //   - "adminLink" y "graduate" ➞ solo muestran forStudents === false
      const role = user?.role
      if (role === 'student' || role === 'adminTFG') {
        if (!op.forStudents) return false
      } else if (role === 'adminLink' || role === 'graduate') {
        if (op.forStudents) return false
      }
      // 2) Resto de filtros del formulario
      const descOk = filters.description
        ? op.description.toLowerCase().includes(filters.description.toLowerCase())
        : true
      const compOk = filters.companyName
        ? (
            typeof op.companyId === 'object'
              ? op.companyId.userId.name
              : (op as any).companyName
          )
            .toLowerCase()
            .includes(filters.companyName.toLowerCase())
        : true
      const d = new Date(op.deadline)
      const fromOk = filters.dateFrom ? d >= new Date(filters.dateFrom) : true
      const toOk   = filters.dateTo   ? d <= new Date(filters.dateTo)   : true
      const studentsOk = filters.forStudents ? op.forStudents : true

      return descOk && compOk && fromOk && toOk && studentsOk
    })
  }, [opportunities, filters, user?.role])

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4">
      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <h1 className="text-3xl font-bold mb-6">
          {t('opportunities.page.title')}
        </h1>

        <OpportunityFilters
          filters={filters}
          onChange={changes => setFilters(prev => ({ ...prev, ...changes }))}
        />

        {error && <div className="text-red-600 mb-4">{error}</div>}
        {loading ? (
          <div className="text-center py-8">{t('opportunities.page.loading')}</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-8">{t('opportunities.page.noResults')}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(op => (
              <OpportunityCard key={op.uuid} opportunity={op} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default OpportunitiesPage
