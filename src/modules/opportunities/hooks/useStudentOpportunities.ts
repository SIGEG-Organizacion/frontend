// src/modules/opportunities/hooks/useStudentOpportunities.ts
import { useState, useEffect, useCallback } from 'react'
import {
  listAllOpportunities,
} from '../services/studentOpportunityService'
import type { Opportunity } from '../types/opportunity'

export const useStudentOpportunities = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const fetchOpportunities = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const list = await listAllOpportunities()
      setOpportunities(list)
    } catch (err: any) {
      setError(err.message || 'Error fetching opportunities')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchOpportunities()
  }, [fetchOpportunities])

  return {
    opportunities,
    loading,
    error,
    refresh: fetchOpportunities,
  }
}
