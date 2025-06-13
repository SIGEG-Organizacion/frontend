// src/modules/admin/calendar/components/AvailabilityTable.tsx
import React from 'react'
import { useTranslation } from 'react-i18next'
import type { AvailabilitySlot } from '../services/calendarService'

interface Props {
  slots: AvailabilitySlot[]
  loading: boolean
  onEdit: (slot: AvailabilitySlot) => void
  onDelete: (slotId: string) => void
}

const AvailabilityTable: React.FC<Props> = ({
  slots,
  loading,
  onEdit,
  onDelete,
}) => {
  const { t } = useTranslation()

  if (loading) {
    return <div className="py-6 text-center">{t('admin.calendar.slots.loading')}</div>
  }

  if (slots.length === 0) {
    return <div className="py-6 text-center">{t('admin.calendar.slots.noData')}</div>
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white divide-y divide-gray-200">
        <thead className="bg-gray-100 sticky top-0">
          <tr>
            <th className="px-4 py-2 text-left">{t('admin.calendar.slots.table.date')}</th>
            <th className="px-4 py-2 text-left">{t('admin.calendar.slots.table.start')}</th>
            <th className="px-4 py-2 text-left">{t('admin.calendar.slots.table.end')}</th>
            <th className="px-4 py-2 text-center">{t('admin.calendar.slots.table.actions')}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {slots.map(slot => (
            <tr key={slot.id} className="hover:bg-gray-50">
              <td className="px-4 py-2">{slot.date}</td>
              <td className="px-4 py-2">{slot.startTime}</td>
              <td className="px-4 py-2">{slot.endTime}</td>
              <td className="px-4 py-2 text-center space-x-2">
                <button
                  onClick={() => onEdit(slot)}
                  className="text-blue-600 border border-blue-600 px-3 py-1 rounded hover:bg-blue-50 transition"
                >
                  {t('admin.calendar.slots.actions.edit')}
                </button>
                <button
                  onClick={() => onDelete(slot.id)}
                  className="text-red-600 border border-red-600 px-3 py-1 rounded hover:bg-red-50 transition"
                >
                  {t('admin.calendar.slots.actions.delete')}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AvailabilityTable
