// src/routes/AppRoutes.tsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../modules/auth/hooks/useAuth";

import HomePage from "../App";
import Layout from "../common/components/Layout";
import LoginPage from "../modules/auth/pages/LoginPage";
import RegisterChoicePage from "../modules/auth/pages/RegisterChoicePage";
import RegisterStudentPage from "../modules/auth/pages/RegisterStudentPage";
import RegisterCompanyPage from "../modules/auth/pages/RegisterCompanyPage";
import ForgotPasswordPage from "../modules/auth/pages/ForgotPasswordPage";
import NotFoundPage from "../common/pages/404";
import ProfilePage from "../common/pages/ProfilePage";
import UserManagementPage from "../modules/admin/pages/UserManagementPage";
import CalendarSyncPage from "../modules/calendar/pages/CalendarSyncPage";
import CalendarCallbackPage from "../modules/calendar/pages/CalendarCallbackPage";
import CalendarViewPage from "../modules/calendar/pages/CalendarViewPage";
import CalendarRequestsPage from "../modules/calendar/pages/CalendarRequestsPage";

import InterestsPage from "../modules/interests/pages/InterestPage";
import { InterestsProvider } from "../modules/interests/context/InterestContext";
import CompanyDashboardPage from "../modules/company/pages/CompanyDashboardPage";
import OpportunitiesPage from "../modules/opportunities/pages/OpportunitiesPage";
import OpportunityDetailPage from "../modules/opportunities/pages/OpportunityDetailPage";

const AppRoutes: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div></div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterChoicePage />} />
          <Route path="/register/student" element={<RegisterStudentPage />} />
          <Route path="/register/company" element={<RegisterCompanyPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route
            path="/interests"
            element={
              <InterestsProvider>
                <InterestsPage />
              </InterestsProvider>
            }
          />
          <Route path="/not-found" element={<NotFoundPage />} />
          <Route path="/opportunities" element={<OpportunitiesPage />} />
          <Route
            path="/opportunities/:id"
            element={<OpportunityDetailPage />}
          />

          {/* Company routes */}
          {user?.role === "company" && (
            <>
              <Route path="/dashboard" element={<CompanyDashboardPage />} />
            </>
          )}

          {/* Admin-only route */}
          {user?.role?.startsWith("admin") && (
            <>
              <Route path="/admin/users" element={<UserManagementPage />} />

              <Route path="/calendar" element={<CalendarViewPage />} />
              <Route path="/calendar/sync" element={<CalendarSyncPage />} />
              <Route
                path="/calendar/oauth/callback/:provider"
                element={<CalendarCallbackPage />}
              />
              <Route
                path="/calendar/requests"
                element={<CalendarRequestsPage />}
              />
            </>
          )}

          {/* Fallback 404 */}
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
