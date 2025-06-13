// src/modules/admin/dashboard/pages/AdminDashboardPage.tsx
import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";

import StatsCards from "../components/StatsCards";
import AllOpportunitiesFilters from "../components/AllOpportunitiesFilters";
import AllOpportunitiesTable from "../components/AllOpportunitiesTable";
import Reports from "../../components/Reports";
import { useAdminDashboard } from "../hooks/useAdminDashboard";
import type { Opportunity } from "../../../opportunities/types/opportunity";
import { updateOpportunityStatus } from "../services/adminDashboardService";
import { useAuth } from "../../../auth/hooks/useAuth";

const AdminDashboardPage: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { usersByRole, opportunities, loading, error, refresh } =
    useAdminDashboard();

  const [filters, setFilters] = useState({
    description: "",
    companyName: "",
    dateFrom: "",
    dateTo: "",
    status: "",
  });
  const [activeTab, setActiveTab] = useState<"opportunities" | "reports">(
    "opportunities"
  );

  // Filtrado en memoria
  const filtered = useMemo<Opportunity[]>(() => {
    return opportunities.filter((op) => {
      if (user?.role === "adminTFG" && !op.forStudents) return false;
      if (user?.role === "adminLink" && op.forStudents) return false;
      const descOk = filters.description
        ? op.description
            .toLowerCase()
            .includes(filters.description.toLowerCase())
        : true;
      const compOk = filters.companyName
        ? (typeof op.companyId === "object"
            ? op.companyId.userId.name
            : (op as any).companyName
          )
            .toLowerCase()
            .includes(filters.companyName.toLowerCase())
        : true;
      const d = new Date(op.deadline);
      const fromOk = filters.dateFrom ? d >= new Date(filters.dateFrom) : true;
      const toOk = filters.dateTo ? d <= new Date(filters.dateTo) : true;
      const statusOk = filters.status ? op.status === filters.status : true;
      return descOk && compOk && fromOk && toOk && statusOk;
    });
  }, [opportunities, filters]);

  const handleApprove = async (uuid: string) => {
    await updateOpportunityStatus(uuid, "open");
    await refresh();
  };
  const handleReject = async (uuid: string) => {
    await updateOpportunityStatus(uuid, "closed");
    await refresh();
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4">
      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">
            {t("admin.dashboard.title")}
          </h1>
          {error && <div className="text-red-600 mb-4">{error}</div>}

          <StatsCards
            totalOpportunities={filtered.length}
            pendingOpportunities={
              filtered.filter((op) => op.status === "pending-approval").length
            }
            usersByRole={usersByRole}
          />

          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab("opportunities")}
                className={`
                  py-4 px-1 border-b-2 font-medium text-sm
                  ${
                    activeTab === "opportunities"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }
                `}
              >
                {t("admin.dashboard.opportunitiesTitle")}
              </button>
              <button
                onClick={() => setActiveTab("reports")}
                className={`
                  py-4 px-1 border-b-2 font-medium text-sm
                  ${
                    activeTab === "reports"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }
                `}
              >
                {t("admin.dashboard.reportsTitle")}
              </button>
            </nav>
          </div>

          {activeTab === "opportunities" ? (
            <>
              <AllOpportunitiesFilters
                filters={filters}
                onChange={(changes) =>
                  setFilters((prev) => ({ ...prev, ...changes }))
                }
              />

              <AllOpportunitiesTable
                opportunities={filtered}
                loading={loading}
                onApprove={handleApprove}
                onReject={handleReject}
              />
            </>
          ) : (
            <Reports />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
