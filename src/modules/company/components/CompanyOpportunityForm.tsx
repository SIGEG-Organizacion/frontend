import React, { useState } from 'react'
import { t } from 'i18next'
import opportunityService from '../services/opportunityService'
import type { Opportunity } from '../types/opportunity'

interface CompanyOpportunityFormProps {
  onClose: () => void
  onCreated?: (opportunity: Opportunity) => void
}

const CompanyOpportunityForm: React.FC<CompanyOpportunityFormProps> = ({ onClose, onCreated }) => {
  const [description, setDescription] = useState('')
  const [deadline, setDeadline] = useState('')
  const [requirementsStr, setRequirementsStr] = useState('') // comma-separated
  const [benefitsStr, setBenefitsStr] = useState('') // comma-separated
  const [mode, setMode] = useState('')
  const [contact, setContact] = useState('')
  const [status, setStatus] = useState('pending-approval')
  const [flyerUrl, setFlyerUrl] = useState('')
  const [forStudents, setForStudents] = useState(false)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // convertir strings a arrays
    const requirements = requirementsStr
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s)
    const benefits = benefitsStr
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s)

    try {
      const payload = {
        description,
        deadline,
        requirements,
        benefits,
        mode,
        contact,
        status,
        flyerUrl,
        forStudents,
      }
      const newOp = await opportunityService.createOpportunity(payload)
      onCreated && onCreated(newOp)
      onClose()
    } catch (err: any) {
      console.error(err)
      setError(err.message || t('company.form.error'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <p className="text-red-600 text-sm">{error}</p>
      )}

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          {t('company.form.description')}
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
          {t('company.form.deadline')}
        </label>
        <input
          id="deadline"
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">
          {t('company.form.requirements')} ({t('company.form.commaSeparated')})
        </label>
        <input
          id="requirements"
          type="text"
          value={requirementsStr}
          onChange={(e) => setRequirementsStr(e.target.value)}
          placeholder={t('company.form.requirementsPlaceholder')}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="benefits" className="block text-sm font-medium text-gray-700">
          {t('company.form.benefits')} ({t('company.form.commaSeparated')})
        </label>
        <input
          id="benefits"
          type="text"
          value={benefitsStr}
          onChange={(e) => setBenefitsStr(e.target.value)}
          placeholder={t('company.form.benefitsPlaceholder')}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="mode" className="block text-sm font-medium text-gray-700">
            {t('company.form.mode')}
          </label>
          <input
            id="mode"
            type="text"
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            {t('company.form.status')}
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="pending-approval">{t('company.status.pending')}</option>
            <option value="approved">{t('company.status.approved')}</option>
            <option value="closed">{t('company.status.closed')}</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
            {t('company.form.contact')}
          </label>
          <input
            id="contact"
            type="email"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="flyerUrl" className="block text-sm font-medium text-gray-700">
            {t('company.form.flyerUrl')}
          </label>
          <input
            id="flyerUrl"
            type="url"
            value={flyerUrl}
            onChange={(e) => setFlyerUrl(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <input
          id="forStudents"
          type="checkbox"
          checked={forStudents}
          onChange={(e) => setForStudents(e.target.checked)}
          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="forStudents" className="text-sm text-gray-700">
          {t('company.form.forStudents')}
        </label>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
        >
          {t('company.form.cancel')}
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? t('company.form.saving') : t('company.form.save')}
        </button>
      </div>
    </form>
  )
}

export default CompanyOpportunityForm
