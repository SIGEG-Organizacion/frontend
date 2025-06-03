import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const OpportunitiesPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <h1 className="text-5xl font-bold text-center text-blue-600 drop-shadow-lg mb-2">
        {t("opportunities.title", "Publicaciones disponibles")}
      </h1>
      <p className="text-center text-gray-500 mb-8">
        {t(
          "opportunities.subtitle",
          "Explora oportunidades de TFG, empleo y pasantías"
        )}
      </p>
      {/* Filtros */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
        <button className="px-6 py-1 border border-gray-400 rounded-full bg-white text-gray-700 text-sm hover:bg-gray-100 transition">
          Pasantía
        </button>
        <button className="px-6 py-1 border border-gray-400 rounded-full bg-white text-gray-700 text-sm hover:bg-gray-100 transition">
          Empleo
        </button>
        <button className="px-6 py-1 border border-gray-400 rounded-full bg-white text-gray-700 text-sm hover:bg-gray-100 transition">
          TFG
        </button>
        <button className="px-6 py-1 border border-gray-200 rounded-full bg-gray-100 text-gray-500 text-sm shadow-sm ml-4 flex items-center gap-2 min-w-[180px] justify-center">
          Seleccionar empresa <span className="ml-2">▼</span>
        </button>
        <button className="px-6 py-1 border border-gray-200 rounded-full bg-gray-100 text-gray-500 text-sm shadow-sm ml-4 flex items-center gap-2 min-w-[120px] justify-center">
          Fecha <span className="ml-2">▼</span>
        </button>
      </div>
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder={t(
            "opportunities.searchPlaceholder",
            "Buscar flyer por nombre..."
          )}
          className="w-[420px] border border-blue-200 rounded px-4 py-2 text-center text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      {/* Cards de oportunidades (mock) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-gray-100 rounded-lg p-6 flex flex-col md:flex-row items-center md:items-start shadow-sm min-h-[200px]"
          >
            <div className="flex-1 w-full">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold text-black">Empresa</span>
                <div className="w-20 h-20 bg-white rounded flex items-center justify-center border border-gray-300">
                  <svg
                    width="48"
                    height="48"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#555"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex gap-2 mb-1">
                <span className="bg-gray-200 text-gray-500 text-xs px-2 py-[1px] rounded-full">
                  Pasantía
                </span>
                <span className="bg-gray-200 text-gray-500 text-xs px-2 py-[1px] rounded-full">
                  Empleo
                </span>
                <span className="bg-gray-200 text-gray-500 text-xs px-2 py-[1px] rounded-full">
                  TFG
                </span>
              </div>
              <div className="text-xs text-gray-500 mb-1">
                Fecha de publicación DD/MM/YYYY
              </div>
              <ul className="text-xs text-black list-disc ml-5 space-y-1 mb-2">
                <li>Estudiante activo en Ingeniería Industrial o afín.</li>
                <li>
                  Conocimientos en control de calidad y optimización de
                  procesos.
                </li>
                <li>Disponibilidad para trabajar 20 horas semanales.</li>
              </ul>
              <div className="flex gap-2 mt-2">
                <button className="border border-emerald-400 text-emerald-600 px-4 py-1 rounded hover:bg-emerald-50 text-sm transition">
                  Me interesa
                </button>
                <Link to="/opportunities/1">
                  <button className="bg-gray-400 text-white px-4 py-1 rounded hover:bg-gray-500 text-sm transition">
                    Ver detalles
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OpportunitiesPage;
