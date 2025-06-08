import React, { useEffect, useState } from 'react'
import {
  getAllUsers,
  deleteUserById,
  graduateUserById,
} from '../services/userService'
import type { User } from '../../auth/types/auth'
import { useTranslation } from 'react-i18next'

const UserManagementPage: React.FC = () => {
  const { t } = useTranslation()
  const [users, setUsers] = useState<User[]>([])
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState<string>('')
  const [loading, setLoading] = useState(false)

  // Carga inicial
  const fetchUsers = async () => {
    setLoading(true)
    try {
      const all = await getAllUsers()
      console.log('API response:', all)
      setUsers(all)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => { fetchUsers() }, [])

  // Filtrado
  const filtered = users.filter(u => {
    const q = search.toLowerCase()
    if (roleFilter && u.role !== roleFilter) return false
    return (
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q)
    )
  })

  // Acciones
  const onDelete = async (id: string) => {
    if (!window.confirm(t('userMgmt.confirmDelete'))) return
    await deleteUserById(id)
    fetchUsers()
  }
  const onGraduate = async (id: string) => {
    await graduateUserById(id)
    fetchUsers()
  }

  return (
    <div className="p-6 space-y-8">
      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <h1 className="text-2xl font-semibold">
          {t('userMgmt.title')}
        </h1>

        {/* Filtros */}
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center md:space-x-4 mb-4">
          <input
            type="text"
            placeholder={t('userMgmt.searchPlaceholder')}
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring mb-2 md:mb-0"
          />
          <select
            value={roleFilter}
            onChange={e => setRoleFilter(e.target.value)}
            className="border rounded px-3 py-2 focus:outline-none focus:ring"
          >
            <option value="">{t('userMgmt.filterAll')}</option>
            <option value="student">{t('userMgmt.role.student')}</option>
            <option value="company">{t('userMgmt.role.company')}</option>
            <option value="adminTGF">{t('userMgmt.role.adminTGF')}</option>
            <option value="adminLink">{t('userMgmt.role.adminLink')}</option>
          </select>
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border-separate border-spacing-0">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                <th className="px-4 py-2 border">{t('userMgmt.table.name')}</th>
                <th className="px-4 py-2 border">{t('userMgmt.table.role')}</th>
                <th className="px-4 py-2 border">{t('userMgmt.table.email')}</th>
                <th className="px-4 py-2 border">{t('userMgmt.table.phone')}</th>
                <th className="px-4 py-2 border">{t('userMgmt.table.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="text-center py-4">{t('userMgmt.loading')}</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-4">{t('userMgmt.noResults')}</td></tr>
              ) : filtered.map(u => (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{u.name}</td>
                  <td className="px-4 py-2 border">
                    {t(`userMgmt.role.${u.role}`)}
                  </td>
                  <td className="px-4 py-2 border">{u.email}</td>
                  <td className="px-4 py-2 border">{u.phone_number ?? '—'}</td>
                  <td className="px-4 py-2 border space-x-2 text-center">
                    <button
                      onClick={() => onDelete(u.id)}
                      className="text-red-600 border border-red-600 px-3 py-1 rounded hover:bg-red-50 transition"
                    >
                      {t('userMgmt.actions.delete')}
                    </button>
                    {/* Solo estudiantes no graduados */}
                    {/* {u.role === 'student' && !u.graduationDate && (
                    <butto<n
                      onClick={() => onGraduate(u.id)}
                      className="text-blue-600 border border-blue-600 px-3 py-1 rounded hover:bg-blue-50 transition"
                    >
                      {t('userMgmt.actions.graduate')}
                    </button>
                  )} */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default UserManagementPage
