// src/modules/admin/calendar/components/RequestsTable.tsx
import React from 'react'
import { useTranslation } from 'react-i18next'
import type { MeetingRequest } from '../services/calendarService'

interface Props {
  requests: MeetingRequest[]
  loading: boolean
  onApprove: (id: string) => void
  onDeny: (id: string) => void
}

const RequestsTable: React.FC<Props> = ({
  requests,
  loading,
  onApprove,
  onDeny,
}) => {
  const { t } = useTranslation()

  if (loading) {
    return <div className="py-6 text-center">{t('admin.calendar.requests.loading')}</div>
  }

  if (requests.length === 0) {
    return <div className="py-6 text-center">{t('admin.calendar.requests.noData')}</div>
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white divide-y divide-gray-200">
        <thead className="bg-gray-100 sticky top-0">
          <tr>
            <th className="px-4 py-2 text-left">{t('admin.calendar.requests.table.date')}</th>
            <th className="px-4 py-2 text-left">{t('admin.calendar.requests.table.time')}</th>
            <th className="px-4 py-2 text-left">{t('admin.calendar.requests.table.provider')}</th>
            <th className="px-4 py-2 text-left">{t('admin.calendar.requests.table.description')}</th>
            <th className="px-4 py-2 text-left">{t('admin.calendar.requests.table.company')}</th>
            <th className="px-4 py-2 text-center">{t('admin.calendar.requests.table.actions')}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {requests.map(req => (
            <tr key={req.id} className="hover:bg-gray-50">
              <td className="px-4 py-2">{req.requestDate}</td>
              <td className="px-4 py-2">
                {req.startTime} – {req.endTime}
              </td>
              <td className="px-4 py-2">{req.calendarProvider}</td>
              <td className="px-4 py-2">{req.description}</td>
              <td className="px-4 py-2">{req.company.name}</td>
              <td className="px-4 py-2 text-center space-x-2">
                <button
                  onClick={() => onApprove(req.id)}
                  className="text-green-600 border border-green-600 px-3 py-1 rounded hover:bg-green-50 transition"
                >
                  {t('admin.calendar.requests.actions.approve')}
                </button>
                <button
                  onClick={() => onDeny(req.id)}
                  className="text-red-600 border border-red-600 px-3 py-1 rounded hover:bg-red-50 transition"
                >
                  {t('admin.calendar.requests.actions.deny')}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RequestsTable
