import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const OpportunityDetailPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <h1 className="text-5xl font-bold text-center text-blue-600 drop-shadow-lg mb-8">
        {t("opportunities.detailTitle", "Detalles de la Publicación")}
      </h1>
      <div className="flex justify-start mb-6">
        <button
          onClick={() => navigate("/opportunities")}
          className="border border-gray-400 rounded px-6 py-2 text-sm bg-white hover:bg-gray-100 transition"
        >
          Regresar
        </button>
      </div>
      <div className="border border-blue-300 rounded-lg p-8 w-full max-w-5xl mx-auto bg-white">
        <div className="flex flex-row gap-8 justify-between">
          {/* Logo + Company Name */}
          <div className="flex flex-col items-center border border-blue-300 rounded p-4 min-w-[220px] w-1/4">
            <input
              className="text-center border border-blue-200 rounded px-2 py-1 mb-4 text-sm"
              placeholder="Nombre de empresa"
              value={"Empresa"}
              readOnly
            />
            <div className="w-32 h-32 flex items-center justify-center bg-gray-200 rounded">
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
          {/* Benefits */}
          <div className="flex-1 border border-blue-300 rounded p-4 mx-2">
            <div className="text-center font-medium border-b border-blue-200 mb-2">
              Beneficios
            </div>
            <ol className="list-decimal pl-5 text-blue-500 text-sm">
              <li>Beneficio 1</li>
              <li>Beneficio 2</li>
              <li>...</li>
            </ol>
          </div>
          {/* Requirements */}
          <div className="flex-1 border border-blue-300 rounded p-4 mx-2">
            <div className="text-center font-medium border-b border-blue-200 mb-2">
              Requisitos
            </div>
            <ol className="list-decimal pl-5 text-blue-500 text-sm">
              <li>Requisito 1</li>
              <li>Requisito 2</li>
              <li>...</li>
            </ol>
          </div>
          {/* Contact & Details */}
          <div className="flex flex-col gap-2 border border-blue-300 rounded p-4 min-w-[220px] w-1/4">
            <div>
              <div className="text-xs text-gray-500 mb-1">Contacto oficial</div>
              <input
                className="w-full border border-gray-300 rounded px-2 py-1 text-xs mb-2"
                placeholder="www.empresa.org/jobs"
                value="www.empresa.org/jobs"
                readOnly
              />
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">
                Correo para aplicar
              </div>
              <input
                className="w-full border border-gray-300 rounded px-2 py-1 text-xs"
                placeholder="empresajobs@ejemplo.com"
                value="empresajobs@ejemplo.com"
                readOnly
              />
            </div>
            <div className="mt-2">
              <div className="text-xs text-gray-500 mb-1">Modalidad</div>
              <button className="w-full border border-blue-300 rounded px-2 py-1 text-xs text-blue-600">
                Presencial
              </button>
            </div>
            <div className="mt-2">
              <div className="text-xs text-gray-500 mb-1">Público Objetivo</div>
              <button className="w-full border border-blue-300 rounded px-2 py-1 text-xs text-blue-600">
                Egresados
              </button>
            </div>
          </div>
        </div>
        {/* Action Buttons */}
        <div className="flex justify-center gap-6 mt-10">
          <button className="border border-emerald-400 text-white bg-emerald-600 rounded px-8 py-2 text-base font-semibold hover:bg-emerald-700 transition">
            Me interesa
          </button>
          <button className="border border-gray-400 rounded px-8 py-2 text-base bg-white hover:bg-gray-100 transition">
            Descargar
          </button>
        </div>
      </div>
    </div>
  );
};

export default OpportunityDetailPage;
