export type AdminRole = 'adminTFG' | 'adminLink'

// Represents an authenticated user
export interface User {
  id: string
  name: string
  email: string
  role: 'student' | 'company' | AdminRole | 'graduate'
  phone_number: string

  // Optional properties based on user role
  studentId?: string  
  sector?: string     
}

// Login credentials
export interface Credentials {
  email: string
  password: string
}

// Student registration payload
export interface RegisterStudentData {
  name: string
  email: string
  phone_number: string
  password: string
  studentId: string
  major: string
  admissionYear: string
}

export interface RegisterCompanyData {
  name: string
  email: string
  password: string
  sector: string
  phone_number: string
  address: string
  logo: string
}

// Administrador registration payload
export interface RegisterAdminData {
  email: string
  password: string
  adminCode: string
}

// API response when logging in
export interface LoginResponse {
  user: User
  token: string
}

// Generic API error response
export interface ErrorResponse {
  message: string
}

// Payload to request password recovery
export interface ForgotPasswordData {
  email: string
}

// Response when requesting password recovery
export interface ForgotPasswordResponse {
  message: string
}

// Payload to reset password
export interface ResetPasswordData {
  token: string
  password: string
}