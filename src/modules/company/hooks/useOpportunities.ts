// src/modules/company/hooks/useOpportunities.ts
import { useState, useEffect, useCallback } from 'react'
import {
  listByCompany,
  createOpportunity,
  updateOpportunity,
  deleteOpportunity,
} from '../services/opportunityService'
import type { Opportunity } from '../types/opportunity'

export const useOpportunities = (companyName?: string) => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchOpportunities = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const list = await listByCompany(companyName)
      setOpportunities(list)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [companyName])

  useEffect(() => {
    fetchOpportunities()
  }, [fetchOpportunities])

  const create = async (data: Omit<Opportunity, '_id' | 'createdAt' | 'uuid'>) => {
    setLoading(true)
    try {
      await createOpportunity(data)
      await fetchOpportunities()
    } finally {
      setLoading(false)
    }
  }

  const update = async (uuid: string, data: Partial<Opportunity>) => {
    setLoading(true)
    try {
      await updateOpportunity(uuid, data)
      await fetchOpportunities()
    } finally {
      setLoading(false)
    }
  }

  const remove = async (uuid: string) => {
    setLoading(true)
    try {
      await deleteOpportunity(uuid)
      await fetchOpportunities()
    } finally {
      setLoading(false)
    }
  }

  return { opportunities, loading, error, create, update, remove, refresh: fetchOpportunities }
}
