import React, { useEffect } from 'react'
import { useSearchParams, useNavigate, useParams } from 'react-router-dom'
import { handleCallback } from '../services/calendarService'

const CalendarCallbackPage: React.FC = () => {
  const [qs] = useSearchParams()
  const { provider } = useParams<{ provider: string }>()
  const navigate = useNavigate()

  useEffect(() => {
    const code = qs.get('code')!
    handleCallback(provider as any, code)
      .then(() => navigate('/calendar'))
      .catch(() => navigate('/calendar/sync'))
  }, [qs, provider, navigate])

  return (
    <div className="flex-1 flex items-center justify-center">
      <p>Procesando sincronización…</p>
    </div>
  )
}

export default CalendarCallbackPage
