import axios from 'axios'
import type { User } from '../../auth/types/auth'

const API_URL = import.meta.env.VITE_API_URL + '/users'
const api = axios.create({ baseURL: API_URL })

// Interceptor para adjuntar el token JWT
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`
  return config
})

export const getAllUsers = async (): Promise<User[]> => {
  const res = await api.get<{ users: User[] }>('/')
  return res.data.users
}

export const deleteUserById = async (id: string): Promise<void> => {
  await api.delete(`/${id}`)
}

export const graduateUserById = async (id: string): Promise<void> => {
  await api.put(`/${id}/graduate`)
}
