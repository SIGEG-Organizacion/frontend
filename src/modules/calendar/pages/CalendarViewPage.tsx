// src/modules/calendar/pages/CalendarViewPage.tsx
import React, { useEffect, useState } from 'react'
import { fetchEvents, CalendarEvent } from '../services/calendarService'
import CalendarView from '../components/CalendarView'
import SyncControls from '../components/SyncControls'

const CalendarViewPage: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [loading, setLoading] = useState(false)

  const load = async () => {
    setLoading(true)
    try { setEvents(await fetchEvents()) }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  return (
    <div className="py-8 px-4">
      <div className="max-w-6xl mx-auto border p-4 bg-white rounded-lg">
        {loading
          ? <p>Cargando agenda…</p>
          : <CalendarView events={events} />
        }
      </div>
      <div className="max-w-6xl mx-auto mt-4 flex justify-center space-x-2">
        <SyncControls onContinue={load} onCancel={() => {}} isLoading={loading} />
      </div>
    </div>
  )
}

export default CalendarViewPage
