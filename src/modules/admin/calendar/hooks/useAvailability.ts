// src/modules/admin/calendar/hooks/useAvailability.ts
import { useState, useEffect, useCallback } from 'react'
import {
  listAvailabilitySlots,
  createAvailabilitySlot,
  updateAvailabilitySlot,
  deleteAvailabilitySlot,
  type AvailabilitySlot,
} from '../services/calendarService'
import { useAuth } from '../../../auth/hooks/useAuth'

export const useAvailability = () => {
  const { user } = useAuth()
  const [slots, setSlots] = useState<AvailabilitySlot[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const fetchSlots = useCallback(async () => {
    if (!user?.email) return
    setLoading(true)
    setError(null)
    try {
      const data = await listAvailabilitySlots(user.email)
      setSlots(data)
    } catch (err: any) {
      setError(err.message || 'Error loading availability slots')
    } finally {
      setLoading(false)
    }
  }, [user?.email])

  useEffect(() => {
    fetchSlots()
  }, [fetchSlots])

  const addSlot = useCallback(
    async (slot: Omit<AvailabilitySlot, 'id' | 'createdAt' | 'updatedAt'>) => {
      setLoading(true)
      setError(null)
      try {
        const created = await createAvailabilitySlot(slot)
        setSlots(prev => [...prev, created])
        return created
      } catch (err: any) {
        setError(err.message || 'Error creating slot')
        throw err
      } finally {
        setLoading(false)
      }
    },
    []
  )

  const editSlot = useCallback(
    async (
      slotId: string,
      slot: Omit<AvailabilitySlot, 'id' | 'createdAt' | 'updatedAt'>
    ) => {
      setLoading(true)
      setError(null)
      try {
        const updated = await updateAvailabilitySlot(slotId, slot)
        setSlots(prev =>
          prev.map(s => (s.id === slotId ? { ...s, ...updated } : s))
        )
        return updated
      } catch (err: any) {
        setError(err.message || 'Error updating slot')
        throw err
      } finally {
        setLoading(false)
      }
    },
    []
  )

  const removeSlot = useCallback(
    async (slotId: string) => {
      setLoading(true)
      setError(null)
      try {
        await deleteAvailabilitySlot(slotId)
        setSlots(prev => prev.filter(s => s.id !== slotId))
      } catch (err: any) {
        setError(err.message || 'Error deleting slot')
        throw err
      } finally {
        setLoading(false)
      }
    },
    []
  )

  return {
    slots,
    loading,
    error,
    refresh: fetchSlots,
    addSlot,
    editSlot,
    removeSlot,
  }
}
