// src/modules/admin/calendar/pages/AdminCalendarPage.tsx
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import GoogleConnectButton from '../components/GoogleConnectButton'
import AvailabilityTable from '../components/AvailabilityTable'
import AvailabilityForm from '../components/AvailabilityForm'
import RequestsTable from '../components/RequestsTable'
import { useAvailability } from '../hooks/useAvailability'
import { useMeetingRequests } from '../hooks/useMeetingRequests'
import type { AvailabilitySlot } from '../services/calendarService'

const AdminCalendarPage: React.FC = () => {
  const { t } = useTranslation()
  const [tab, setTab] = useState<'connection' | 'availability' | 'requests'>(
    'connection'
  )

  // Availability hooks
  const {
    slots,
    loading: loadingSlots,
    error: errorSlots,
    refresh: refreshSlots,
    addSlot,
    editSlot,
    removeSlot,
  } = useAvailability()

  // Meeting requests hooks
  const {
    requests,
    loading: loadingReqs,
    error: errorReqs,
    refresh: refreshReqs,
    approve,
    deny,
  } = useMeetingRequests()

  // Form state
  const [editingSlot, setEditingSlot] = useState<AvailabilitySlot | null>(null)
  const [showForm, setShowForm] = useState(false)

  const openNew = () => {
    setEditingSlot(null)
    setShowForm(true)
  }
  const openEdit = (slot: AvailabilitySlot) => {
    setEditingSlot(slot)
    setShowForm(true)
  }
  const closeForm = () => {
    setShowForm(false)
    setEditingSlot(null)
  }
  const handleSave = async (data: {
    date: string
    startTime: string
    endTime: string
  }) => {
    if (editingSlot) {
      await editSlot(editingSlot.id, data)
    } else {
      await addSlot(data)
    }
    closeForm()
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">{t('admin.calendar.title')}</h1>

        {/* Tabs */}
        <div className="flex space-x-4 border-b pb-2 mb-6">
          {(['connection','availability','requests'] as const).map(key => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`px-4 py-2 -mb-px border-b-2 ${
                tab === key
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              {t(`admin.calendar.tab.${key}`)}
            </button>
          ))}
        </div>

        {/* Panel */}
        {tab === 'connection' && (
          <GoogleConnectButton />
        )}

        {tab === 'availability' && (
          <div className="space-y-4">
            <div className="flex justify-end">
              <button
                onClick={openNew}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                {t('admin.calendar.slots.new')}
              </button>
            </div>
            {errorSlots && (
              <div className="text-red-600">{errorSlots}</div>
            )}
            <AvailabilityTable
              slots={slots}
              loading={loadingSlots}
              onEdit={openEdit}
              onDelete={async id => { await removeSlot(id); }}
            />
            {showForm && (
              <div className="fixed inset-0 bg-black bg-opacity-30 z-40" />
            )}
            {showForm && (
              <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
                  <AvailabilityForm
                    initialSlot={editingSlot ?? undefined}
                    onSave={handleSave}
                    onCancel={closeForm}
                    loading={loadingSlots}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {tab === 'requests' && (
          <div>
            {errorReqs && <div className="text-red-600 mb-4">{errorReqs}</div>}
            <RequestsTable
              requests={requests}
              loading={loadingReqs}
              onApprove={async id => { await approve(id) }}
              onDeny={async id => { await deny(id) }}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminCalendarPage
