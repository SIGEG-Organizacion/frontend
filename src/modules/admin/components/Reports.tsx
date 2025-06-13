import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  getOpportunitiesNumbersReport,
  getOpportunitiesStatusReport,
  getInterestReport,
  getUsersReport,
  downloadReport,
} from "../services/reportsService";

interface ReportFilters {
  startDate?: string;
  endDate?: string;
  companyName?: string;
  groupBy?: "day" | "month";
  status?: string;
  forStudents?: boolean;
  uuid?: string;
  role?: "student" | "company" | "adminLink" | "vadminTFG";
  validated?: boolean;
}

type ReportFormat = "excel" | "pdf";

const Reports: React.FC = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [format, setFormat] = useState<ReportFormat>("excel");
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().setMonth(new Date().getMonth() - 1))
      .toISOString()
      .split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
  });
  const [filters, setFilters] = useState<ReportFilters>({
    companyName: "",
    forStudents: false,
    groupBy: "day",
    status: "",
    uuid: "",
    role: undefined,
    validated: false,
  });
  const [selectedReport, setSelectedReport] = useState<
    "numbers" | "status" | "interest" | "users"
  >("numbers");

  const handleGenerateReport = async (
    type: "numbers" | "status" | "interest" | "users"
  ) => {
    setLoading(type);
    setError(null);
    try {
      // Solo pasar los filtros relevantes según el tipo de reporte
      let usedFilters: ReportFilters = {
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
      };
      if (type === "numbers" || type === "status" || type === "interest") {
        if (filters.companyName) usedFilters.companyName = filters.companyName;
        if (filters.forStudents) usedFilters.forStudents = filters.forStudents;
      }
      if (type === "numbers" || type === "status") {
        if (filters.groupBy) usedFilters.groupBy = filters.groupBy;
      }
      if (type === "status") {
        if (filters.status) usedFilters.status = filters.status;
      }
      if (type === "interest") {
        if (filters.uuid) usedFilters.uuid = filters.uuid;
        if (filters.status) usedFilters.status = filters.status;
      }
      if (type === "users") {
        if (filters.role) usedFilters.role = filters.role;
        if (filters.validated !== undefined)
          usedFilters.validated = filters.validated;
      }

      let data;
      let reportTypeId:
        | "opportunities-numbers"
        | "status-opportunities"
        | "interest"
        | "users";

      switch (type) {
        case "numbers":
          data = await getOpportunitiesNumbersReport(usedFilters);
          reportTypeId = "opportunities-numbers";
          downloadReport(data, "oportunidades-creadas", reportTypeId, format);
          break;
        case "status":
          data = await getOpportunitiesStatusReport(usedFilters);
          reportTypeId = "status-opportunities";
          downloadReport(data, "estado-oportunidades", reportTypeId, format);
          break;
        case "interest":
          data = await getInterestReport(usedFilters);
          reportTypeId = "interest";
          downloadReport(data, "intereses", reportTypeId, format);
          break;
        case "users":
          data = await getUsersReport(usedFilters);
          reportTypeId = "users";
          downloadReport(data, "usuarios", reportTypeId, format);
          break;
      }
    } catch (err) {
      console.error("Error generating report:", err);
      setError(t("admin.reports.error"));
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-semibold">
          {t("admin.reports.title", "Reportes")}
        </h2>
        <p className="text-gray-500 mt-1">
          {t(
            "admin.reports.description",
            "Descarga reportes filtrados por fecha, empresa, estado, etc."
          )}
        </p>
      </div>

      {/* Filtros horizontales */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <form className="flex flex-wrap gap-4 items-end">
          {/* Fecha inicial */}
          <div className="flex flex-col">
            <label className="text-xs font-medium text-gray-700 mb-1">
              {t("admin.reports.startDate", "Fecha inicial")}
            </label>
            <input
              type="date"
              value={dateRange.startDate}
              onChange={(e) =>
                setDateRange((prev) => ({ ...prev, startDate: e.target.value }))
              }
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-2 py-1"
            />
          </div>
          {/* Fecha final */}
          <div className="flex flex-col">
            <label className="text-xs font-medium text-gray-700 mb-1">
              {t("admin.reports.endDate", "Fecha final")}
            </label>
            <input
              type="date"
              value={dateRange.endDate}
              onChange={(e) =>
                setDateRange((prev) => ({ ...prev, endDate: e.target.value }))
              }
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-2 py-1"
            />
          </div>
          {/* Formato */}
          <div className="flex flex-col">
            <label className="text-xs font-medium text-gray-700 mb-1">
              {t("admin.reports.format", "Formato")}
            </label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value as ReportFormat)}
              className="rounded-md border-gray-300 shadow-sm px-2 py-1"
            >
              <option value="excel">Excel</option>
              <option value="pdf">PDF</option>
            </select>
          </div>
          {/* Empresa */}
          <div className="flex flex-col">
            <label className="text-xs font-medium text-gray-700 mb-1">
              {t("company.list.filterCompanyLabel", "Empresa")}
            </label>
            <input
              type="text"
              value={filters.companyName}
              onChange={(e) =>
                setFilters((f) => ({ ...f, companyName: e.target.value }))
              }
              className="rounded-md border-gray-300 shadow-sm px-2 py-1"
              placeholder={t(
                "company.list.filterCompanyPlaceholder",
                "Empresa..."
              )}
            />
          </div>
          {/* Solo para estudiantes */}
          <div className="flex items-center h-8">
            <input
              type="checkbox"
              checked={!!filters.forStudents}
              onChange={(e) =>
                setFilters((f) => ({ ...f, forStudents: e.target.checked }))
              }
              className="mr-2"
              id="forStudents"
            />
            <label
              htmlFor="forStudents"
              className="text-xs font-medium text-gray-700"
            >
              {t(
                "opportunities.filters.forStudentsLabel",
                "Solo para estudiantes"
              )}
            </label>
          </div>
          {/* Agrupar por */}
          <div className="flex flex-col">
            <label className="text-xs font-medium text-gray-700 mb-1">
              {t("admin.reports.groupBy", "Agrupar por")}
            </label>
            <select
              value={filters.groupBy}
              onChange={(e) =>
                setFilters((f) => ({
                  ...f,
                  groupBy: e.target.value as "day" | "month",
                }))
              }
              className="rounded-md border-gray-300 shadow-sm px-2 py-1"
            >
              <option value="day">
                {t("admin.reports.groupByDay", "Día")}
              </option>
              <option value="month">
                {t("admin.reports.groupByMonth", "Mes")}
              </option>
            </select>
          </div>
          {/* Estado (solo para status e interest) */}
          {(selectedReport === "status" || selectedReport === "interest") && (
            <div className="flex flex-col">
              <label className="text-xs font-medium text-gray-700 mb-1">
                {t("company.list.filterStatusLabel", "Estado")}
              </label>
              <select
                value={filters.status}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, status: e.target.value }))
                }
                className="rounded-md border-gray-300 shadow-sm px-2 py-1"
              >
                <option value="">{t("company.list.statusAll", "Todos")}</option>
                <option value="open">
                  {t("company.list.status.open", "Abierta")}
                </option>
                <option value="closed">
                  {t("company.list.status.closed", "Cerrada")}
                </option>
                <option value="pending-approval">
                  {t("company.list.status.pending-approval", "Pendiente")}
                </option>
              </select>
            </div>
          )}
          {/* UUID (solo para interest) */}
          {selectedReport === "interest" && (
            <div className="flex flex-col">
              <label className="text-xs font-medium text-gray-700 mb-1">
                UUID
              </label>
              <input
                type="text"
                value={filters.uuid}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, uuid: e.target.value }))
                }
                className="rounded-md border-gray-300 shadow-sm px-2 py-1"
                placeholder="UUID..."
              />
            </div>
          )}
          {/* Rol y validados (solo para users) */}
          {selectedReport === "users" && (
            <>
              <div className="flex flex-col">
                <label className="text-xs font-medium text-gray-700 mb-1">
                  {t("userMgmt.table.role", "Rol")}
                </label>
                <select
                  value={filters.role || ""}
                  onChange={(e) =>
                    setFilters((f) => ({
                      ...f,
                      role: e.target.value as ReportFilters["role"],
                    }))
                  }
                  className="rounded-md border-gray-300 shadow-sm px-2 py-1"
                >
                  <option value="">{t("userMgmt.filterAll", "Todos")}</option>
                  <option value="student">
                    {t("userMgmt.role.student", "Estudiante")}
                  </option>
                  <option value="company">
                    {t("userMgmt.role.company", "Empresa")}
                  </option>
                  <option value="adminLink">
                    {t("userMgmt.role.adminLink", "Admin Link")}
                  </option>
                  <option value="vadminTFG">
                    {t("userMgmt.role.adminTGF", "Admin TFG")}
                  </option>
                </select>
              </div>
              <div className="flex items-center h-8">
                <input
                  type="checkbox"
                  checked={!!filters.validated}
                  onChange={(e) =>
                    setFilters((f) => ({ ...f, validated: e.target.checked }))
                  }
                  className="mr-2"
                  id="validated"
                />
                <label
                  htmlFor="validated"
                  className="text-xs font-medium text-gray-700"
                >
                  {t("userMgmt.table.validated", "Solo validados")}
                </label>
              </div>
            </>
          )}
        </form>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Reporte de Oportunidades Creadas */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold mb-4">
            {t("admin.reports.opportunitiesNumbers")}
          </h3>
          <p className="text-gray-500 text-sm mb-4">
            {t("admin.reports.opportunitiesNumbersDesc")}
          </p>
          <button
            onClick={() => {
              handleGenerateReport("numbers");
              setSelectedReport("numbers");
            }}
            disabled={!!loading}
            className="inline-flex items-center px-4 py-2 border border-green-600 text-sm font-medium rounded-md text-green-600 bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 w-full justify-center"
          >
            {loading === "numbers" ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-green-600" />
            ) : (
              `Descargar ${format.toUpperCase()}`
            )}
          </button>
        </div>

        {/* Reporte de Estado de Oportunidades */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold mb-4">
            {t("admin.reports.opportunitiesStatus")}
          </h3>
          <p className="text-gray-500 text-sm mb-4">
            {t("admin.reports.opportunitiesStatusDesc")}
          </p>
          <button
            onClick={() => {
              handleGenerateReport("status");
              setSelectedReport("status");
            }}
            disabled={!!loading}
            className="inline-flex items-center px-4 py-2 border border-green-600 text-sm font-medium rounded-md text-green-600 bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 w-full justify-center"
          >
            {loading === "status" ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-green-600" />
            ) : (
              `Descargar ${format.toUpperCase()}`
            )}
          </button>
        </div>

        {/* Reporte de Intereses */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold mb-4">{t("admin.reports.interests")}</h3>
          <p className="text-gray-500 text-sm mb-4">
            {t("admin.reports.interestsDesc")}
          </p>
          <button
            onClick={() => {
              handleGenerateReport("interest");
              setSelectedReport("interest");
            }}
            disabled={!!loading}
            className="inline-flex items-center px-4 py-2 border border-green-600 text-sm font-medium rounded-md text-green-600 bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 w-full justify-center"
          >
            {loading === "interest" ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-green-600" />
            ) : (
              `Descargar ${format.toUpperCase()}`
            )}
          </button>
        </div>

        {/* Reporte de Usuarios */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold mb-4">{t("admin.reports.users")}</h3>
          <p className="text-gray-500 text-sm mb-4">
            {t("admin.reports.usersDesc")}
          </p>
          <button
            onClick={() => {
              handleGenerateReport("users");
              setSelectedReport("users");
            }}
            disabled={!!loading}
            className="inline-flex items-center px-4 py-2 border border-green-600 text-sm font-medium rounded-md text-green-600 bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 w-full justify-center"
          >
            {loading === "users" ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-green-600" />
            ) : (
              `Descargar ${format.toUpperCase()}`
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reports;
