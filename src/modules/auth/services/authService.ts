// src/modules/auth/services/authService.ts
import axios from 'axios'
import type {
  Credentials,
  LoginResponse,
  ForgotPasswordResponse,
  RegisterStudentData,
  RegisterCompanyData,
  RegisterAdminData,
  ResetPasswordData,
  User,
} from '../types/auth'

// Apunta a donde montas userRoutes en tu servidor:
const API_URL = import.meta.env.VITE_API_URL
                 || 'http://localhost:5000/api'

const api = axios.create({ baseURL: API_URL + '/users' })

// Pone el token en cada petición si existe
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Login: POST /api/users/login
const login = async (
  credentials: Credentials
): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>(
    '/login',
    credentials
  )
  return data
}

// Registro: POST /api/users/register
// Nos olvidamos de /student, /company, /admin en la URL,
// y enviamos role en el body:
const registerStudent = async (
  data: RegisterStudentData
): Promise<void> => {
  await api.post('/register', { ...data, role: 'student' })
  await api.post('/createStudent', { email: data.email, major: data.major, admissionYear: data.admissionYear })
}

const registerCompany = async (
  data: RegisterCompanyData
): Promise<void> => {
  await api.post('/register', { ...data, role: 'company' })
  await api.post('/createCompany', { email: data.email, sector: data.sector, address: data.address, logo: data.logo })
}

const registerAdmin = async (
  data: RegisterAdminData
): Promise<void> => {
  await api.post('/register', { ...data, role: 'admin' })
}

// Forgot / Reset password
const forgotPassword = async (
  payload: { email: string }
): Promise<ForgotPasswordResponse> => {
  const { data } = await api.post<ForgotPasswordResponse>(
    '/forgot-password',
    payload
  )
  return data
}

const resetPassword = async (
  payload: ResetPasswordData
): Promise<void> => {
  await api.post('/reset-password', payload)
}

// Perfil: GET /api/users/me
const getProfile = async (): Promise<User> => {
  const { data } = await api.get<{ user: User }>('/me')
  return data.user
}

const updateProfile = async (data: Partial<User>): Promise<User> => {
  const { data: updated } = await api.put<User>('/update', {
    updateData:
      data,
  })
  return updated
}

export default {
  login,
  registerStudent,
  registerCompany,
  registerAdmin,
  forgotPassword,
  resetPassword,
  getProfile,
  updateProfile,
}
