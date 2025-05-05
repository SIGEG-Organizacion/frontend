import React, { InputHTMLAttributes, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  id: string
}

const PasswordInput: React.FC<Props> = ({ id, ...rest }) => {
  const [visible, setVisible] = useState(false)

  return (
    <div className="relative">
      <input
        id={id}
        type={visible ? 'text' : 'password'}
        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
        {...rest}
      />
      <button
        type="button"
        onClick={() => setVisible(v => !v)}
        className="absolute right-2 top-1/2 transform -translate-y-1/2"
        aria-label={visible ? 'Hide password' : 'Show password'}
      >
        {visible ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  )
}

export default PasswordInput
