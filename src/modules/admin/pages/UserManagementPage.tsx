// src/modules/admin/pages/UserManagementPage.tsx
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  getAllUsers,
  manageUser,
  markStudentAsGraduated,
} from "../services/userService";
import type { User } from "../services/userService";

const UserManagementPage: React.FC = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const all = await getAllUsers();
      setUsers(all);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Error al cargar usuarios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    if (roleFilter && u.role !== roleFilter) return false;
    return (
      u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
  });

  const handleManageUser = async (
    email: string,
    action: "validate" | "delete"
  ) => {
    setActionInProgress(email);
    setError(null);
    try {
      await manageUser(email, action);
      await fetchUsers();
    } catch (err) {
      console.error("Error managing user:", err);
      setError("Error al realizar la acción");
    } finally {
      setActionInProgress(null);
    }
  };

  const handleGraduate = async (id: string) => {
    setActionInProgress(id);
    setError(null);
    try {
      await markStudentAsGraduated(id);
      await fetchUsers();
    } catch (err) {
      console.error("Error marcando como egresado:", err);
      setError("Error al marcar como egresado");
    } finally {
      setActionInProgress(null);
    }
  };

  const onDelete = (email: string) => {
    if (!window.confirm(t("userMgmt.confirmDelete"))) return;
    handleManageUser(email, "delete");
  };

  const onValidate = (email: string) => {
    handleManageUser(email, "validate");
  };

  if (loading && users.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">{t("userMgmt.loading")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-800">
                {t("userMgmt.title")}
              </h1>
              {loading && (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-500"></div>
              )}
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className="mx-6 mt-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
              <p className="flex items-center">
                <span className="mr-2">⚠️</span>
                {error}
              </p>
            </div>
          )}

          {/* Filtros */}
          <div className="p-6 border-b border-gray-200 bg-white">
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
              <div className="flex-1">
                <label
                  htmlFor="search"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {t("userMgmt.search")}
                </label>
                <input
                  id="search"
                  type="text"
                  placeholder={t("userMgmt.searchPlaceholder")}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="md:w-48">
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {t("userMgmt.filter")}
                </label>
                <select
                  id="role"
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">{t("userMgmt.filterAll")}</option>
                  <option value="student">{t("userMgmt.role.student")}</option>
                  <option value="company">{t("userMgmt.role.company")}</option>
                  <option value="adminTFG">
                    {t("userMgmt.role.adminTFG")}
                  </option>
                  <option value="adminLink">
                    {t("userMgmt.role.adminLink")}
                  </option>
                  <option value="graduate">
                    {t("userMgmt.role.graduate")}
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* Tabla */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t("userMgmt.table.name")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t("userMgmt.table.role")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t("userMgmt.table.email")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t("userMgmt.table.phone")}
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t("userMgmt.table.actions")}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading && users.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-500"></div>
                        <span>{t("userMgmt.loading")}</span>
                      </div>
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      {t("userMgmt.noResults")}
                    </td>
                  </tr>
                ) : (
                  filtered.map((u) => (
                    <tr
                      key={u.email}
                      className="hover:bg-gray-50 transition-colors duration-150 ease-in-out"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {u.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {t(`userMgmt.role.${u.role}`)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {u.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {u.phone_number ?? "—"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                        {u.validated ? (
                          <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Validado
                          </span>
                        ) : (
                          <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Pendiente
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                        <div className="flex justify-center space-x-2">
                          {!u.validated && (
                            <button
                              onClick={() => onValidate(u.email)}
                              disabled={actionInProgress === u.email}
                              className="inline-flex items-center px-3 py-1.5 border border-green-600 text-xs font-medium rounded-full text-green-600 bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150 ease-in-out"
                            >
                              {actionInProgress === u.email ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-green-600"></div>
                              ) : (
                                <span>Validar</span>
                              )}
                            </button>
                          )}
                          <button
                            onClick={() => onDelete(u.email)}
                            disabled={actionInProgress === u.email}
                            className="inline-flex items-center px-3 py-1.5 border border-red-600 text-xs font-medium rounded-full text-red-600 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150 ease-in-out"
                          >
                            {actionInProgress === u.email ? (
                              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-red-600"></div>
                            ) : (
                              <span>Eliminar</span>
                            )}
                          </button>
                          {u.role === "student" && (
                            <button
                              onClick={() => handleGraduate(u.id)}
                              disabled={actionInProgress === u.id}
                              className="inline-flex items-center px-3 py-1.5 border border-blue-600 text-xs font-medium rounded-full text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150 ease-in-out"
                            >
                              {actionInProgress === u.id ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-600"></div>
                              ) : (
                                <span>Marcar como egresado</span>
                              )}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Total: {filtered.length} usuarios{" "}
              {roleFilter ? `(${roleFilter})` : ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagementPage;
