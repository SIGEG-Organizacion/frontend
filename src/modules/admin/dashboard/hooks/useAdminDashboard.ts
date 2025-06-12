// src/modules/admin/dashboard/hooks/useAdminDashboard.ts
import { useState, useEffect, useCallback } from 'react'
import { listAllOpportunities, listAllUsers } from '../services/adminDashboardService'
import type { Opportunity } from '../../../opportunities/types/opportunity'
import type { User } from '../../../auth/types/auth'

interface UsersByRole {
  [role: string]: number
}

export interface AdminDashboardData {
  totalOpportunities: number
  pendingOpportunities: number
  usersByRole: UsersByRole
  opportunities: Opportunity[]
  users: User[]
}

export const useAdminDashboard = () => {
  const [totalOpportunities, setTotalOpportunities] = useState(0)
  const [pendingOpportunities, setPendingOpportunities] = useState(0)
  const [usersByRole, setUsersByRole] = useState<UsersByRole>({})
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchDashboard = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [ops, us] = await Promise.all([
        listAllOpportunities(),
        listAllUsers(),
      ])

      setOpportunities(ops)
      setUsers(us)

      setTotalOpportunities(ops.length)
      setPendingOpportunities(
        ops.filter(op => op.status === 'pending-approval').length
      )

      const byRole = us.reduce<UsersByRole>((acc, u) => {
        acc[u.role] = (acc[u.role] || 0) + 1
        return acc
      }, {})
      setUsersByRole(byRole)
    } catch (err: any) {
      setError(err.message || 'Error loading admin dashboard')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchDashboard()
  }, [fetchDashboard])

  return {
    totalOpportunities,
    pendingOpportunities,
    usersByRole,
    opportunities,
    users,
    loading,
    error,
    refresh: fetchDashboard,
  }
}
