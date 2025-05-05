import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import LoginPage from '../modules/auth/pages/LoginPage'

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />

        {/* Catch-all: Redirect to login if no match */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
