import React from 'react'
import { Calendar, momentLocalizer, Event as CalEvent } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import type { CalendarEvent } from '../services/calendarService'

const localizer = momentLocalizer(moment)

interface Props {
  events: CalendarEvent[]
}

const CalendarView: React.FC<Props> = ({ events }) => (
  <Calendar
    localizer={localizer}
    events={events.map(e => ({
      id: e.id,
      title: e.title,
      start: new Date(e.start),
      end: new Date(e.end),
    } as CalEvent))}
    defaultView="week"
    views={['week', 'day']}
    style={{ height: 600 }}
  />
)

export default CalendarView
