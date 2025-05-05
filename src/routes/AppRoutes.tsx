import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import HomePage from '../App'
import Layout from '../common/components/Layout'
import LoginPage from '../modules/auth/pages/LoginPage'
import RegisterChoicePage from '../modules/auth/pages/RegisterChoicePage'
import RegisterStudentPage from '../modules/auth/pages/RegisterStudentPage'
import RegisterCompanyPage from '../modules/auth/pages/RegisterCompanyPage'
import ForgotPasswordPage from '../modules/auth/pages/ForgotPasswordPage'
import NotFoundPage from '../common/pages/404'

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* Public routes */}
          <Route path='/' element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterChoicePage />} />
          <Route path="/register/student" element={<RegisterStudentPage />} />
          <Route path="/register/company" element={<RegisterCompanyPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/not-found" element={<NotFoundPage />} />

          {/* Private routes */}
          {/* Add your private routes here, e.g. <Route path="/dashboard" element={<DashboardPage />} /> */}

          {/* Redirect to home if no route matches */}
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
