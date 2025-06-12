// src/modules/admin/pages/UserManagementPage.tsx
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  getAllUsers,
  deleteUserById,
  graduateUserById,
} from '../services/userService'
import type { User } from '../../auth/types/auth'

const UserManagementPage: React.FC = () => {
  const { t } = useTranslation()
  const [users, setUsers] = useState<User[]>([])
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const all = await getAllUsers()
      setUsers(all)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const filtered = users.filter(u => {
    const q = search.toLowerCase()
    if (roleFilter && u.role !== roleFilter) return false
    return (
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q)
    )
  })

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
    <div className="bg-gray-50 min-h-screen py-8 px-4">
      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <div className="max-w-7xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold">{t('userMgmt.title')}</h1>

          {/* Filtros */}
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
            <input
              type="text"
              placeholder={t('userMgmt.searchPlaceholder')}
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 md:mb-0"
            />
            <select
              value={roleFilter}
              onChange={e => setRoleFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <table className="min-w-full table-auto">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  <th className="px-4 py-2 text-left">{t('userMgmt.table.name')}</th>
                  <th className="px-4 py-2 text-left">{t('userMgmt.table.role')}</th>
                  <th className="px-4 py-2 text-left">{t('userMgmt.table.email')}</th>
                  <th className="px-4 py-2 text-left">{t('userMgmt.table.phone')}</th>
                  <th className="px-4 py-2 text-center">{t('userMgmt.table.actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="py-4 text-center">
                      {t('userMgmt.loading')}
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-4 text-center">
                      {t('userMgmt.noResults')}
                    </td>
                  </tr>
                ) : (
                  filtered.map(u => (
                    <tr key={u.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2">{u.name}</td>
                      <td className="px-4 py-2">{t(`userMgmt.role.${u.role}`)}</td>
                      <td className="px-4 py-2">{u.email}</td>
                      <td className="px-4 py-2">{u.phone_number ?? '—'}</td>
                      <td className="px-4 py-2 text-center space-x-2">
                        <button
                          onClick={() => onDelete(u.id)}
                          className="text-red-600 border border-red-600 px-3 py-1 rounded-lg hover:bg-red-50 transition"
                        >
                          {t('userMgmt.actions.delete')}
                        </button>
                        {/* {u.role === 'student' && !u.graduationDate && (
                          <button
                            onClick={() => onGraduate(u.id)}
                            className="text-blue-600 border border-blue-600 px-3 py-1 rounded-lg hover:bg-blue-50 transition"
                          >
                            {t('userMgmt.actions.graduate')}
                          </button>
                        )} */}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserManagementPage
