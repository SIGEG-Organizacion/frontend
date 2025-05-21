import React from 'react'
import type { Provider } from '../services/calendarService'

interface Props {
  selected?: Provider
  onSelect: (p: Provider) => void
}

const PlatformSelector: React.FC<Props> = ({ selected, onSelect }) => (
  <select
    value={selected ?? ''}
    onChange={e => onSelect(e.target.value as Provider)}
    className="border rounded px-3 py-2 focus:outline-none focus:ring"
  >
    <option value="">{'— ' + /* t('calendar.selectProvider') */ 'Seleccionar…'}</option>
    <option value="google">Google Calendar</option>
    <option value="microsoft">Microsoft 365</option>
  </select>
)

export default PlatformSelector
