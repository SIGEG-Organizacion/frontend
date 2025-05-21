import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuthUrl, Provider } from '../services/calendarService'
import PlatformSelector from '../components/PlatformSelector'
import SyncControls from '../components/SyncControls'

const CalendarSyncPage: React.FC = () => {
  const [provider, setProvider] = useState<Provider>()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onContinue = async () => {
    if (!provider) return
    setLoading(true)
    try {
      const url = await getAuthUrl(provider)
      window.location.href = url  // redirige al consentimiento
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-full flex items-center justify-center">
      <div className="border border-red-500 p-8 max-w-md mx-auto">
        <p className="mb-4 text-center">
          No existe una agenda sincronizada. Seleccione una plataforma y continúe.
        </p>
        <div className="flex justify-center">
          <PlatformSelector selected={provider} onSelect={setProvider}/>
        </div>
        <SyncControls
          onContinue={onContinue}
          onCancel={() => navigate('/')}
          isLoading={loading}
        />
      </div>
    </div>
  )
}

export default CalendarSyncPage
