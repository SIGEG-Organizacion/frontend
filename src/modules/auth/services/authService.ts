import axios from 'axios'
import type {
  Credentials,
  LoginResponse,
  RegisterStudentData,
  RegisterCompanyData,
  RegisterAdminData,
  ForgotPasswordData,
  ForgotPasswordResponse,
  User,
} from '../types/auth'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'

// Creates an Axios instance with the base URL of the API
const api = axios.create({ baseURL: API_URL })

// Interceptor to attach the JWT token in each request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Login function: sends email and password, receives user + token
const login = async (
  credentials: Credentials
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/auth/login', credentials)
  return response.data
}

// Get the profile of the authenticated user
const getProfile = async (): Promise<User> => {
  const response = await api.get<User>('/auth/profile')
  return response.data
}

// Register a student
const registerStudent = async (
  data: RegisterStudentData
): Promise<void> => {
  await api.post('/auth/register/student', data)
}

// Register a company
const registerCompany = async (
  data: RegisterCompanyData
): Promise<void> => {
  await api.post('/auth/register/company', data)
}

// Register an admin
const registerAdmin = async (
  data: RegisterAdminData
): Promise<void> => {
  await api.post('/auth/register/admin', data)
}

// Forgot password function: sends email and receives a response
const forgotPassword = async (
  data: ForgotPasswordData
): Promise<ForgotPasswordResponse> => {
  const response = await api.post<ForgotPasswordResponse>(
    '/auth/forgot-password',
    data
  )
  return response.data
}

export default {
  login,
  getProfile,
  registerStudent,
  registerCompany,
  registerAdmin,
  forgotPassword,
}