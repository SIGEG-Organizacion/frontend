import React, { ReactNode } from 'react'

interface Props {
  type: 'error' | 'success'
  children: ReactNode
}

const colors = {
  error: 'text-red-700 bg-red-100 border-red-300',
  success: 'text-green-700 bg-green-100 border-green-300',
}

const ValidationMessage: React.FC<Props> = ({ type, children }) => (
  <div
    className={`border rounded p-3 mb-4 ${colors[type]}`}
    role={type === 'error' ? 'alert' : undefined}
  >
    {children}
  </div>
)

export default ValidationMessage
