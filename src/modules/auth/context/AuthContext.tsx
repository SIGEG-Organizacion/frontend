import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'
import type {
  User,
  Credentials,
  LoginResponse,
} from '../types/auth'
import authService from '../services/authService'

interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  login: (credentials: Credentials) => Promise<void>
  logout: () => void
  updateProfile: (data: Partial<User>) => Promise<User>
  // optional: refreshToken: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // When starting the app, try to load the session from the token in localStorage
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      authService
        .getProfile()
        .then((fetchedUser: User) => {
          setUser(fetchedUser)
        })
        .catch(() => {
          localStorage.removeItem('token')
          setUser(null)
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (credentials: Credentials) => {
    setLoading(true)
    setError(null)
    try {
      const data: LoginResponse = await authService.login(
        credentials
      )
      localStorage.setItem('token', data.token)
      setUser(data.user)
    } catch (err: any) {
      setError(
        err.response?.data?.message ?? err.message ?? 'Error al iniciar sesión'
      )
      throw err
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  const updateProfile = async (data: Partial<User>) => {
    setLoading(true)
    setError(null)
    try {
      const updated = await authService.updateProfile(data)
      setUser(updated)
      return updated
    } catch (err: any) {
      setError(err.response?.data?.message ?? err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, error, login, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  )
}
