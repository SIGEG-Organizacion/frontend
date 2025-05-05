// src/modules/auth/pages/RegisterChoicePage.tsx
import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const RegisterChoicePage: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-6">
          {t('register.selectRole')}
        </h1>
        <div className="space-y-4">
          <Link
            to="/register/student"
            className="block w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            {t('register.student.title')}
          </Link>
          <Link
            to="/register/company"
            className="block w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            {t('register.company.title')}
          </Link>
        </div>
        <div className="mt-6 text-sm">
          <Link to="/login" className="text-gray-600 hover:underline">
            {t('register.backToLogin')}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RegisterChoicePage
