import React from 'react'

interface Props {
  onContinue: () => void
  onCancel: () => void
  isLoading: boolean
}

const SyncControls: React.FC<Props> = ({ onContinue, onCancel, isLoading }) => (
  <div className="mt-4 flex space-x-2 justify-center">
    <button
      onClick={onContinue}
      disabled={isLoading}
      className="border border-gray-700 px-4 py-2 rounded hover:bg-gray-100 transition"
    >
      {isLoading ? '…' : 'Continuar'}
    </button>
    <button
      onClick={onCancel}
      className="border border-gray-700 px-4 py-2 rounded hover:bg-gray-100 transition"
    >
      Cancelar
    </button>
  </div>
)

export default SyncControls
