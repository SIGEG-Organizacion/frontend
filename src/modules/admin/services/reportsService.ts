import axios from "axios";
import {
  exportOpportunityNumbersExcelBrowser,
  exportOpportunityStatsPDFBrowser,
  exportOpportunityStatsExcelBrowser,
  exportOpportunityNumbersPDFBrowser,
  exportUserStatsExcelBrowser,
  exportUserStatsPDFBrowser,
  exportInterestNumbersExcelBrowser,
  exportInterestNumbersPDFBrowser,
} from "../utils/reportExporter";
import type {
  OpportunityNumbersReport,
  StatusOpportunitiesReport,
  InterestReport,
  UserReport,
} from "../utils/reportExporter";

const API_URL = import.meta.env.VITE_API_URL + "/reports";
const api = axios.create({ baseURL: API_URL });

// Interceptor para adjuntar el token JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Tipos específicos para cada reporte
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

// Funciones de API con tipos específicos
export const getOpportunitiesNumbersReport = async (filters: ReportFilters) => {
  const res = await api.get("/numberOpportunitiesCreated", { params: filters });
  return res.data.data;
};

export const getOpportunitiesStatusReport = async (filters: ReportFilters) => {
  const res = await api.get("/statusOpportunities", { params: filters });
  return res.data.data;
};

export const getInterestReport = async (filters: ReportFilters) => {
  const res = await api.get("/interest", { params: filters });
  // Puede venir como { success: true, data: ... }
  return res.data.data;
};

export const getUsersReport = async (filters: ReportFilters) => {
  const res = await api.get("/users", { params: filters });
  return res.data.data;
};

export const downloadReport = async (
  data:
    | OpportunityNumbersReport
    | StatusOpportunitiesReport
    | InterestReport
    | UserReport,
  filename: string,
  reportType:
    | "opportunities-numbers"
    | "status-opportunities"
    | "interest"
    | "users",
  format: "excel" | "pdf" = "excel"
): Promise<void> => {
  switch (reportType) {
    case "opportunities-numbers":
      if (format === "pdf") {
        exportOpportunityNumbersPDFBrowser(data as OpportunityNumbersReport);
      } else {
        exportOpportunityNumbersExcelBrowser(data as OpportunityNumbersReport);
      }
      break;
    case "status-opportunities":
      if (format === "pdf") {
        exportOpportunityStatsPDFBrowser(data as StatusOpportunitiesReport);
      } else {
        exportOpportunityStatsExcelBrowser(data as StatusOpportunitiesReport);
      }
      break;
    case "interest":
      if (format === "pdf") {
        exportInterestNumbersPDFBrowser(data as InterestReport);
      } else {
        exportInterestNumbersExcelBrowser(data as InterestReport);
      }
      break;
    case "users":
      if (format === "pdf") {
        exportUserStatsPDFBrowser(data as UserReport);
      } else {
        exportUserStatsExcelBrowser(data as UserReport);
      }
      break;
    default:
      throw new Error("Tipo de reporte no soportado");
  }
};
