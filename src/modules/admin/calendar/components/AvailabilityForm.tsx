// src/modules/admin/calendar/components/AvailabilityForm.tsx
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import type { AvailabilitySlot } from '../services/calendarService'

interface Props {
  /** Si estamos editando, initialSlot viene poblado */
  initialSlot?: AvailabilitySlot
  onSave: (data: {
    date: string
    startTime: string
    endTime: string
  }) => Promise<void>
  onCancel: () => void
  loading: boolean
}

const AvailabilityForm: React.FC<Props> = ({
  initialSlot,
  onSave,
  onCancel,
  loading,
}) => {
  const { t } = useTranslation()
  const [date, setDate] = useState(initialSlot?.date ?? '')
  const [startTime, setStartTime] = useState(initialSlot?.startTime ?? '')
  const [endTime, setEndTime] = useState(initialSlot?.endTime ?? '')

  useEffect(() => {
    if (initialSlot) {
      setDate(initialSlot.date)
      setStartTime(initialSlot.startTime)
      setEndTime(initialSlot.endTime)
    }
  }, [initialSlot])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSave({ date, startTime, endTime })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 font-medium text-gray-700">
          {t('admin.calendar.slots.form.dateLabel')}
        </label>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            {t('admin.calendar.slots.form.startLabel')}
          </label>
          <input
            type="time"
            value={startTime}
            onChange={e => setStartTime(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">
            {t('admin.calendar.slots.form.endLabel')}
          </label>
          <input
            type="time"
            value={endTime}
            onChange={e => setEndTime(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
        >
          {t('admin.calendar.slots.form.cancel')}
        </button>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {loading
            ? t('admin.calendar.slots.form.saving')
            : t('admin.calendar.slots.form.save')}
        </button>
      </div>
    </form>
  )
}

export default AvailabilityForm
