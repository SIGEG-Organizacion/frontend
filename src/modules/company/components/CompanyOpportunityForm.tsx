// src/modules/company/components/CompanyOpportunityForm.tsx
import React, { useState } from 'react'
import type { Opportunity } from '../types/opportunity'
import { useTranslation } from 'react-i18next'

interface Props {
  /** Si estamos editando, initialData viene con la oportunidad existente */
  initialData?: Opportunity
  /** callback que crea o actualiza la oportunidad */
  onSave: (data: Omit<Opportunity, '_id' | 'createdAt' | 'uuid'> & { uuid?: string }) => Promise<void>
  onCancel: () => void
  loading: boolean
}

const CompanyOpportunityForm: React.FC<Props> = ({
  initialData,
  onSave,
  onCancel,
  loading,
}) => {
  const { t } = useTranslation()

  const [description, setDescription] = useState(initialData?.description ?? '')
  const [requirements, setRequirements] = useState(
    initialData?.requirements.join(', ') ?? ''
  )
  const [benefits, setBenefits] = useState(
    initialData?.benefits.join(', ') ?? ''
  )
  const [mode, setMode] = useState(initialData?.mode ?? '')
  const [email, setEmail] = useState(initialData?.email ?? '')
  const [deadline, setDeadline] = useState(
    initialData?.deadline.slice(0, 10) ?? ''
  )
  const [flyerUrl, setFlyerUrl] = useState(initialData?.flyerUrl ?? '')
  const [flyerFormat, setFlyerFormat] = useState<'pdf' | 'jpg' | ''>(
    initialData?.format ?? ''
  )
  const [forStudents, setForStudents] = useState(initialData?.forStudents ?? false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSave({
      ...(initialData ? { uuid: initialData.uuid } : {}),
      companyId: initialData?.companyId ?? '',
      description,
      requirements: requirements
        .split(',')
        .map(r => r.trim())
        .filter(r => r),
      benefits: benefits
        .split(',')
        .map(b => b.trim())
        .filter(b => b),
      mode,
      email,
      deadline,
      flyerUrl,
      format: flyerFormat || undefined,
      forStudents,
      status: initialData?.status ?? 'open',
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block mb-1 font-medium">{t('company.form.description')}</label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
          rows={4}
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">{t('company.form.requirements')}</label>
        <input
          type="text"
          value={requirements}
          onChange={e => setRequirements(e.target.value)}
          placeholder={t('company.form.csvPlaceholder')}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">{t('company.form.benefits')}</label>
        <input
          type="text"
          value={benefits}
          onChange={e => setBenefits(e.target.value)}
          placeholder={t('company.form.csvPlaceholder')}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-1 font-medium">{t('company.form.mode')}</label>
          <select
            value={mode}
            onChange={e => setMode(e.target.value)}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
          >
            <option value="">{t('company.form.selectMode')}</option>
            <option value="remote">{t('company.form.modeRemote')}</option>
            <option value="on-site">{t('company.form.modeOnsite')}</option>
            <option value="hybrid">{t('company.form.modeHybrid')}</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">{t('company.form.email')}</label>
          <input
            type="text"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-1 font-medium">{t('company.form.deadline')}</label>
          <input
            type="date"
            value={deadline}
            onChange={e => setDeadline(e.target.value)}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">{t('company.form.flyerUrl')}</label>
          <input
            type="url"
            value={flyerUrl}
            onChange={e => setFlyerUrl(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
          />
        </div>
      </div>

      <div>
        <label className="block mb-1 font-medium">{t('company.form.flyerFormat')}</label>
        <select
          value={flyerFormat}
          onChange={e => setFlyerFormat(e.target.value as 'pdf' | 'jpg' | '')}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
        >
          <option value="">{t('company.form.selectFormat')}</option>
          <option value="PDF">PDF</option>
          <option value="JPG">JPG</option>
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <input
          id="forStudents"
          type="checkbox"
          checked={forStudents}
          onChange={e => setForStudents(e.target.checked)}
          className="h-4 w-4"
        />
        <label htmlFor="forStudents" className="font-medium">
          {t('company.form.forStudents')}
        </label>
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
        >
          {t('company.form.cancel')}
        </button>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? t('company.form.saving') : t('company.form.save')}
        </button>
      </div>
    </form>
  )
}

export default CompanyOpportunityForm
