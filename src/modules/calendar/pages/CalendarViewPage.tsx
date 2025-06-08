// src/modules/calendar/pages/CalendarViewPage.tsx
import React, { useEffect, useState } from 'react'
import { fetchEvents, CalendarEvent } from '../services/calendarService'
import CalendarView from '../components/CalendarView'
import SyncControls from '../components/SyncControls'
import { useTranslation } from 'react-i18next'

const CalendarViewPage: React.FC = () => {
  const { t } = useTranslation()
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [loading, setLoading] = useState(false)

  const load = async () => {
    setLoading(true)
    try { setEvents(await fetchEvents()) }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  return (
    <div className="py-8 px-4 container max-w-6xl mx-auto">
      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <h1 className="text-2xl font-semibold">
          {t('calendar.title')}
        </h1>

        <div className="max-w-6xl mx-auto border p-4 bg-white rounded-lg">
          {loading
            ? <p>Cargando agenda…</p>
            : <CalendarView events={events} />
          }
        </div>
        <div className="max-w-6xl mx-auto mt-4 flex justify-center space-x-2">
          <SyncControls onContinue={load} onCancel={() => { }} isLoading={loading} />
        </div>
      </div>
    </div>
  )
}

export default CalendarViewPage
