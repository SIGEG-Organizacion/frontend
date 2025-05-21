import React, { useEffect, useState } from 'react'
import { getPendingRequests, approveRequest, rejectRequest } from '../services/calendarService'
import type { Request } from '../services/calendarService'
import { useTranslation } from 'react-i18next'

const CalendarRequestsPage: React.FC = () => {
  const { t } = useTranslation()
  const [reqs, setReqs] = useState<Request[]>([])

  const load = async () => setReqs(await getPendingRequests())
  useEffect(() => { load() }, [])

  return (
    <div className="py-8 px-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{t('calendar.requests.title')}</h2>
      <table className="min-w-full">
        <thead>{/* cabecera similar a UserMgmt */}</thead>
        <tbody>
          {reqs.map(r => (
            <tr key={r.id}>
              {/* ...columns date, requester, etc... */}
              <td className="px-2 py-1 space-x-2">
                <button className="text-red-600" onClick={() => { rejectRequest(r.id); load() }}>
                  {t('calendar.requests.reject')}
                </button>
                <button className="text-blue-600" onClick={() => { approveRequest(r.id); load() }}>
                  {t('calendar.requests.accept')}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CalendarRequestsPage
