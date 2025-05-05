import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import LoginPage from '../modules/auth/pages/LoginPage'
import RegisterChoicePage from '../modules/auth/pages/RegisterChoicePage'
import RegisterStudentPage from '../modules/auth/pages/RegisterStudentPage'
import RegisterCompanyPage from '../modules/auth/pages/RegisterCompanyPage'
import ForgotPasswordPage from '../modules/auth/pages/ForgotPasswordPage'

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterChoicePage />} />
        <Route path="/register/student" element={<RegisterStudentPage />} />
        <Route path="/register/company" element={<RegisterCompanyPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Private routes */}
        {/* Add your private routes here, e.g. <Route path="/dashboard" element={<DashboardPage />} /> */}

        {/* Redirect to login if no match */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
