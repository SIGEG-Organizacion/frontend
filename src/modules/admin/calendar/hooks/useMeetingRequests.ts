// src/modules/admin/calendar/hooks/useMeetingRequests.ts
import { useState, useEffect, useCallback } from 'react'
import {
  listMeetingRequests,
  approveMeetingRequest,
  denyMeetingRequest,
  type MeetingRequest,
} from '../services/calendarService'

export const useMeetingRequests = () => {
  const [requests, setRequests] = useState<MeetingRequest[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const fetchRequests = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await listMeetingRequests()
      setRequests(data)
    } catch (err: any) {
      setError(err.message || 'Error loading meeting requests')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchRequests()
  }, [fetchRequests])

  const approve = useCallback(
    async (requestId: string) => {
      setLoading(true)
      setError(null)
      try {
        await approveMeetingRequest(requestId)
        await fetchRequests()
      } catch (err: any) {
        setError(err.message || 'Error approving request')
        throw err
      } finally {
        setLoading(false)
      }
    },
    [fetchRequests]
  )

  const deny = useCallback(
    async (requestId: string) => {
      setLoading(true)
      setError(null)
      try {
        await denyMeetingRequest(requestId)
        await fetchRequests()
      } catch (err: any) {
        setError(err.message || 'Error denying request')
        throw err
      } finally {
        setLoading(false)
      }
    },
    [fetchRequests]
  )

  return {
    requests,
    loading,
    error,
    refresh: fetchRequests,
    approve,
    deny,
  }
}
