// src/modules/interests/hooks/useInterests.ts
import { useState, useEffect, useCallback } from 'react'
import {
  getMyInterests,
  unmarkInterest,
} from '../services/interestService'
import type { Interest } from '../types/interest'

export const useInterests = () => {
  const [interests, setInterests] = useState<Interest[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const fetchInterests = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const list = await getMyInterests()
      setInterests(list)
    } catch (err: any) {
      setError(err.message || 'Error fetching interests')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchInterests()
  }, [fetchInterests])

  const removeInterest = async (uuid: string) => {
    setLoading(true)
    try {
      await unmarkInterest(uuid)
      await fetchInterests()
    } catch (err: any) {
      setError(err.message || 'Error removing interest')
    } finally {
      setLoading(false)
    }
  }

  return {
    interests,
    loading,
    error,
    refresh: fetchInterests,
    removeInterest,
  }
}
