// src/modules/admin/calendar/components/GoogleConnectButton.tsx
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  connectGoogleCalendar,
  listGoogleEvents,
} from '../services/calendarService'

const GoogleConnectButton: React.FC = () => {
  const { t } = useTranslation()
  const [connected, setConnected] = useState<boolean>(false)
  const [checking, setChecking] = useState<boolean>(true)

  // Intenta listar un evento para verificar conexión
  useEffect(() => {
    const verify = async () => {
      try {
        await listGoogleEvents()
        setConnected(true)
      } catch {
        setConnected(false)
      } finally {
        setChecking(false)
      }
    }
    verify()
  }, [])

  if (checking) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6 mb-6 text-center">
        {t('admin.calendar.connection.checking')}
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">
        {t('admin.calendar.connection.title')}
      </h2>
      {connected ? (
        <div className="text-green-600 font-medium">
          {t('admin.calendar.connection.connected')}
        </div>
      ) : (
          <button
  onClick={async () => {
    try {
      await connectGoogleCalendar()
    } catch (e: any) {
      alert(e.message)
    }
  }}
  className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
>
  {t('admin.calendar.connection.connectButton')}
</button>
      )}
    </div>
  )
}

export default GoogleConnectButton
