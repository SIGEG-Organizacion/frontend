// src/modules/home/pages/HomePage.tsx
import React from 'react'
import { useAuth } from './modules/auth/hooks/useAuth'
import { useTranslation } from 'react-i18next'

const HomePage: React.FC = () => {
  const { user } = useAuth()
  const { t } = useTranslation()

  return (
    <div className="py-12 px-4 max-w-3xl mx-auto">
      <div className="bg-white shadow rounded-lg p-8 space-y-4">
        <h1 className="text-4xl font-bold mb-6 text-center">
          {t('home.welcome', { name: user?.name || t('home.guest') })}
        </h1>

        {user ? (
          <p className="text-lg text-center">
            {t(`home.intro.${user.role}`)}
          </p>
        ) : (
          <p className="text-lg text-center">
            {t('home.intro.guest')}
          </p>
        )}
      </div>
    </div>
  )
}

export default HomePage
