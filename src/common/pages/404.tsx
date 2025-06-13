// src/common/pages/404.tsx
import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const NotFoundPage: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="p-6 space-y-8">
      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <div className="flex flex-col items-center justify-center px-4">
          <h1 className="text-6xl font-extrabold mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-2">{t('notFound.title')}</h2>
          <p className="mb-6 text-center text-gray-600">{t('notFound.message')}</p>
          <Link
            to="/"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            {t('notFound.backHome')}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
