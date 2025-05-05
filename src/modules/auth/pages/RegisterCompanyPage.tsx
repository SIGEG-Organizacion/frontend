import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PasswordInput from '../components/PasswordInput'
import ValidationMessage from '../components/ValidationMessage'
import authService from '../services/authService'
import type { RegisterCompanyData } from '../types/auth'

const RegisterCompanyPage: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [form, setForm] = useState<RegisterCompanyData>({
    companyName: '',
    email: '',
    password: '',
    sector: '',
    phone: '',
  })
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)
    try {
      await authService.registerCompany(form)
      setSuccess(t('registerCompany.success'))
      setTimeout(() => navigate('/login'), 1500)
    } catch (err: any) {
      setError(err.response?.data?.message ?? err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {t('registerCompany.title')}
      </h1>

      {error && <ValidationMessage type="error">{error}</ValidationMessage>}
      {success && <ValidationMessage type="success">{success}</ValidationMessage>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="companyName" className="block mb-1 font-medium">
            {t('registerCompany.companyName')}
          </label>
          <input
            id="companyName"
            name="companyName"
            type="text"
            value={form.companyName}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
          />
        </div>

        <div>
          <label htmlFor="sector" className="block mb-1 font-medium">
            {t('registerCompany.sector')}
          </label>
          <input
            id="sector"
            name="sector"
            type="text"
            value={form.sector}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block mb-1 font-medium">
            {t('registerCompany.phone')}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-1 font-medium">
            {t('registerCompany.email')}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-1 font-medium">
            {t('registerCompany.password')}
          </label>
          <PasswordInput
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded bg-green-600 text-white hover:bg-green-700 transition"
        >
          {loading
            ? t('registerCompany.loading')
            : t('registerCompany.submit')}
        </button>
      </form>

      <div className="mt-4 text-center text-sm">
        {t('registerCompany.alreadyHave')}{' '}
        <Link to="/login" className="text-blue-600 hover:underline">
          {t('registerCompany.login')}
        </Link>
      </div>

      <div className="mt-2 text-center">
        <Link to="/register" className="text-sm text-gray-500 hover:underline">
          {t('register.backToLogin')}
        </Link>
      </div>
    </div>
  )
}

export default RegisterCompanyPage
