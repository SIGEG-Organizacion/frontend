// src/common/pages/ProfilePage.tsx
import React, { useState, useEffect } from 'react'
import { useAuth } from '../../modules/auth/hooks/useAuth'
import { useTranslation } from 'react-i18next'
import ValidationMessage from '../../modules/auth/components/ValidationMessage'

const ProfilePage: React.FC = () => {
  const { user, updateProfile } = useAuth()
  const { t } = useTranslation()

  const [isEditing, setIsEditing] = useState(false)
  const [phone_number, setPhoneNumber] = useState(user?.phone_number ?? '')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // Sync phone field when user changes
  useEffect(() => {
    if (user) {
      setPhoneNumber(user.phone_number ?? '')
    }
  }, [user])

  if (!user) {
    return (
      <div className="flex-1 flex items-center justify-center">
        {t('profile.noUser')}
      </div>
    )
  }

  const handleSave = async () => {
    setError(null)
    setSuccess(null)
    setLoading(true)
    try {
      await updateProfile({ phone_number })
      setSuccess(t('profile.updateSuccess'))
      setIsEditing(false)
    } catch (err: any) {
      setError(err.response?.data?.message ?? err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setError(null)
    setSuccess(null)
    setPhoneNumber(user.phone_number ?? '')
  }

  return (
    <div className="p-6 space-y-8 container max-w-4xl mx-auto">
      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <h1 className="text-2xl font-semibold">
          {t('profile.title')}
        </h1>

        {error && <ValidationMessage type="error">{error}</ValidationMessage>}
        {success && <ValidationMessage type="success">{success}</ValidationMessage>}
        <div className="bg-white shadow rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
            <div className="font-medium">{t('profile.name')}</div>
            <div className="text-right">{user.name}</div>

            <div className="font-medium">{t('profile.email')}</div>
            <div className="text-right">{user.email}</div>

            <div className="font-medium">{t('profile.phone')}</div>
            <div className="text-right">
              {isEditing ? (
                <input
                  type="tel"
                  value={phone_number}
                  onChange={e => setPhoneNumber(e.target.value)}
                  required
                  className="w-32 border rounded px-2 py-1 focus:outline-none focus:ring"
                />
              ) : (
                user.phone_number || '—'
              )}
            </div>
          </div>

          <div className="mt-4 flex justify-end space-x-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  {loading ? t('profile.saving') : t('profile.save')}
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
                >
                  {t('profile.cancel')}
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                {t('profile.editInfo')}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
