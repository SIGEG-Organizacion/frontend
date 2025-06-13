// src/modules/company/components/OpportunityList.tsx
import React from "react";
import type { Opportunity } from "../types/opportunity";
import { useTranslation } from "react-i18next";

interface Props {
  opportunities: Opportunity[];
  loading: boolean;
  error: string | null;

  descriptionFilter: string;
  dateFrom: string;
  dateTo: string;
  statusFilter: string;

  onDescriptionFilter: (val: string) => void;
  onDateFrom: (val: string) => void;
  onDateTo: (val: string) => void;
  onStatusFilter: (val: string) => void;

  onEdit: (op: Opportunity) => void;
  onDelete: (uuid: string) => void;
  onCancelPublication: (uuid: string) => void;
  onShowInterests?: (op: Opportunity) => void;
}

const OpportunityList: React.FC<Props> = ({
  opportunities,
  loading,
  error,
  descriptionFilter,
  dateFrom,
  dateTo,
  statusFilter,
  onDescriptionFilter,
  onDateFrom,
  onDateTo,
  onStatusFilter,
  onEdit,
  onDelete,
  onCancelPublication,
  onShowInterests,
}) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4">{t("company.list.title")}</h2>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("company.list.filterDescriptionLabel")}
          </label>
          <input
            type="text"
            placeholder={t("company.list.filterDescription")}
            value={descriptionFilter}
            onChange={(e) => onDescriptionFilter(e.target.value)}
            className="border rounded px-3 py-2 focus:outline-none focus:ring w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("company.list.filterDateFromLabel")}
          </label>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => onDateFrom(e.target.value)}
            className="border rounded px-3 py-2 focus:outline-none focus:ring w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("company.list.filterDateToLabel")}
          </label>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => onDateTo(e.target.value)}
            className="border rounded px-3 py-2 focus:outline-none focus:ring w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("company.list.filterStatusLabel")}
          </label>
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilter(e.target.value)}
            className="border rounded px-3 py-2 focus:outline-none focus:ring w-full"
          >
            <option value="">{t("company.list.filterStatus")}</option>
            <option value="open">{t("company.list.status.open")}</option>
            <option value="closed">{t("company.list.status.closed")}</option>
            <option value="pending-approval">
              {t("company.list.status.pending-approval")}
            </option>
          </select>
        </div>
      </div>

      {error && <div className="text-red-600">{error}</div>}
      {loading && <div>{t("company.list.loading")}</div>}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th className="px-4 py-2 text-left">
                {t("company.list.colDescription")}
              </th>
              <th className="px-4 py-2 text-left">
                {t("company.list.colStatus")}
              </th>
              <th className="px-4 py-2 text-left">
                {t("company.list.colDeadline")}
              </th>
              <th className="px-4 py-2 text-center">
                {t("company.list.colActions")}
              </th>
              <th className="px-4 py-2 text-center">Intereses</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {opportunities.map((op) => (
              <tr key={op.uuid} className="hover:bg-gray-50">
                <td className="px-4 py-2">
                  {op.description.length > 100
                    ? `${op.description.substring(0, 100)}...`
                    : op.description}
                </td>
                <td className="px-4 py-2">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                      op.status === "open"
                        ? "bg-green-100 text-green-800"
                        : op.status === "closed"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {t(`company.list.status.${op.status}`)}
                  </span>
                </td>
                <td className="px-4 py-2">
                  {new Date(op.deadline).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 text-center space-x-2">
                  {op.status === "open" && (
                    <button
                      onClick={() => onCancelPublication(op.uuid)}
                      className="text-yellow-600 border border-yellow-600 px-2 py-1 rounded hover:bg-yellow-50 transition"
                    >
                      {t("company.list.cancel")}
                    </button>
                  )}
                  <button
                    onClick={() => onEdit(op)}
                    className="text-green-600 border border-green-600 px-2 py-1 rounded hover:bg-green-50 transition"
                  >
                    {t("company.list.edit")}
                  </button>
                  <button
                    onClick={() => onDelete(op.uuid)}
                    className="text-red-600 border border-red-600 px-2 py-1 rounded hover:bg-red-50 transition"
                  >
                    {t("company.list.delete")}
                  </button>
                </td>
                <td className="px-4 py-2 text-center">
                  <button
                    className="text-blue-600 border border-blue-600 px-2 py-1 rounded hover:bg-blue-50 transition"
                    onClick={() => onShowInterests && onShowInterests(op)}
                  >
                    Ver intereses
                  </button>
                </td>
              </tr>
            ))}
            {opportunities.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-6 text-center text-gray-500">
                  {t("company.list.noData")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OpportunityList;
