import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ValidationMessage from '../components/ValidationMessage'
import authService from '../services/authService'

const ForgotPasswordPage: React.FC = () => {
  const { t } = useTranslation()
  const [email, setEmail] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)
    try {
      await authService.forgotPassword({ email })
      setSuccess(t('forgotPassword.success'))
    } catch (err: any) {
      setError(err.response?.data?.message ?? err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {t('forgotPassword.title')}
      </h1>

      {error && <ValidationMessage type="error">{error}</ValidationMessage>}
      {success && <ValidationMessage type="success">{success}</ValidationMessage>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1 font-medium">
            {t('forgotPassword.email')}
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          {loading ? t('forgotPassword.loading') : t('forgotPassword.submit')}
        </button>
      </form>

      <div className="mt-4 text-center text-sm">
        <Link to="/login" className="text-gray-600 hover:underline">
          {t('forgotPassword.backToLogin')}
        </Link>
      </div>
    </div>
  )
}

export default ForgotPasswordPage
