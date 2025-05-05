import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import type { User, Credentials } from '../types/auth'

export interface UseAuthReturn {
  user: User | null
  loading: boolean
  error: string | null
  login: (credentials: Credentials) => Promise<void>
  logout: () => void
  updateProfile: (data: Partial<User>) => Promise<User>
  // opcional: refreshToken: () => Promise<void>
}

export const useAuth = (): UseAuthReturn => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
