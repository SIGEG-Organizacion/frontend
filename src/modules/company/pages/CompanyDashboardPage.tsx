// src/modules/company/pages/CompanyDashboardPage.tsx

import React, { useState } from "react";
import { t } from "i18next";
import CompanyOpportunityForm from "../components/CompanyOpportunityForm";

const CompanyDashboardPage: React.FC = () => {
  // Estados para filtros de publicaciones
  const [filterTitle, setFilterTitle] = useState("");
  const [filterDateFrom, setFilterDateFrom] = useState("");
  const [filterDateTo, setFilterDateTo] = useState("");
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="p-6 space-y-8 container mx-auto relative">
      {/* Floating Action Button */}
      <button
        onClick={() => setShowForm(true)}
        className="fixed bottom-10 right-10 z-50 bg-blue-600 text-white rounded-full shadow-lg p-4 hover:bg-blue-700 transition-all duration-300 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        style={{ boxShadow: "0 4px 24px 0 rgba(60, 120, 255, 0.15)" }}
        aria-label="Crear oportunidad"
      >
        <svg
          width="22"
          height="22"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
        <span className="hidden md:inline font-medium">
          {t("company.dashboard.newOpportunity")}
        </span>
      </button>

      {/* Animated Modal for the Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-90 transition-opacity animate-fadeIn">
          <div className="bg-white rounded-lg shadow-2xl p-6 max-w-5xl w-full animate-slideInUp relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-blue-600 transition"
              aria-label="Cerrar"
            >
              <svg
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <CompanyOpportunityForm />
          </div>
        </div>
      )}

      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <h1 className="text-2xl font-semibold">
          {t("company.dashboard.title")}
        </h1>

        {/* Sección de estadísticas (contenedor vacío) */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Tarjeta 1: Visitas totales */}
          <div className="bg-white shadow rounded-lg p-4 flex flex-col items-start">
            <h3 className="text-gray-600 text-sm font-medium">
              {t("company.dashboard.totalViews")}
            </h3>
            <p className="text-2xl font-bold mt-2">999</p>
            <div className="mt-auto w-full h-16 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
              [Mini‐gráfico / Icono]
            </div>
          </div>

          {/* Tarjeta 2: Postulaciones totales */}
          <div className="bg-white shadow rounded-lg p-4 flex flex-col items-start">
            <h3 className="text-gray-600 text-sm font-medium">
              {t("company.dashboard.totalApplications")}
            </h3>
            <p className="text-2xl font-bold mt-2">999</p>
            <div className="mt-auto w-full h-16 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
              [Mini‐gráfico / Icono]
            </div>
          </div>

          {/* Tarjeta 3: Publicaciones Totales */}
          <div className="bg-white shadow rounded-lg p-4 flex flex-col items-start">
            <h3 className="text-gray-600 text-sm font-medium">
              {t("company.dashboard.totalPublications")}
            </h3>
            <p className="text-2xl font-bold mt-2">999</p>
            <div className="mt-auto w-full h-16 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
              [Mini‐gráfico / Icono]
            </div>
          </div>
        </section>

        {/* Sección de publicaciones con filtro */}
        <section>
          <h2 className="text-xl font-semibold mb-4">
            {t("company.dashboard.publications")}
          </h2>

          {/* Contenedor de filtros */}
          <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Filtro por nombre/título */}
            <div>
              <label
                htmlFor="filter-title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t("company.dashboard.filterByName")}
              </label>
              <input
                id="filter-title"
                type="text"
                value={filterTitle}
                onChange={(e) => setFilterTitle(e.target.value)}
                placeholder={t("company.dashboard.filterByNamePlaceholder")}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Filtro por fecha desde */}
            <div>
              <label
                htmlFor="filter-date-from"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t("company.dashboard.filterDateFrom")}
              </label>
              <input
                id="filter-date-from"
                type="date"
                value={filterDateFrom}
                onChange={(e) => setFilterDateFrom(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Filtro por fecha hasta */}
            <div>
              <label
                htmlFor="filter-date-to"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t("company.dashboard.filterDateTo")}
              </label>
              <input
                id="filter-date-to"
                type="date"
                value={filterDateTo}
                onChange={(e) => setFilterDateTo(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Ejemplo: Botón para aplicar filtros (sin funcionalidad aún) */}
          <div className="mb-8">
            <button
              type="button"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              {t("company.dashboard.applyFilters")}
            </button>
          </div>

          {/* Placeholder del listado de publicaciones */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-500">
            [Listado de publicaciones — pendiente de implementar en su propio
            módulo]
          </div>
        </section>
      </div>
    </div>
  );
};

export default CompanyDashboardPage;
