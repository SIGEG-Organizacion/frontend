// src/modules/auth/pages/LoginPage.tsx
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useTranslation } from 'react-i18next'
import PasswordInput from '../components/PasswordInput'
import ValidationMessage from '../components/ValidationMessage'

const LoginPage: React.FC = () => {
  const { t } = useTranslation()
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await login({ email, password })
      navigate('/', { replace: true })
    } catch (err: any) {
      setError(err.response?.data?.message ?? err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {t('login.title')}
      </h1>

      {error && (
        <ValidationMessage type="error">
          {error}
        </ValidationMessage>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1 font-medium">
            {t('login.email')}
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

        <div>
          <label htmlFor="password" className="block mb-1 font-medium">
            {t('login.password')}
          </label>
          <PasswordInput
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          {loading ? t('login.loading') : t('login.submit')}
        </button>
      </form>

      <div className="mt-4 text-center">
        <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
          {t('login.forgot')}
        </Link>
      </div>

      <div className="mt-2 text-center text-sm">
        {t('login.noAccount')}{' '}
        <Link to="/register" className="text-blue-600 hover:underline">
          {t('login.register')}
        </Link>
      </div>
    </div>
  )
}

export default LoginPage
