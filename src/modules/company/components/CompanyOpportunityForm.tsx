import React, { useState } from "react";

const modalities = ["Presencial", "Remoto", "Híbrido"];
const publics = ["Egresados", "Estudiantes", "Todos"];

const CompanyOpportunityForm: React.FC = () => {
  const [companyName, setCompanyName] = useState("");
  const [benefits, setBenefits] = useState([""]);
  const [requirements, setRequirements] = useState([""]);
  const [contactUrl, setContactUrl] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [modality, setModality] = useState(modalities[0]);
  const [publicTarget, setPublicTarget] = useState(publics[0]);
  const [logo, setLogo] = useState<string | null>(null);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => setLogo(ev.target?.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleBenefitsChange = (idx: number, value: string) => {
    setBenefits((prev) => prev.map((b, i) => (i === idx ? value : b)));
  };
  const handleRequirementsChange = (idx: number, value: string) => {
    setRequirements((prev) => prev.map((r, i) => (i === idx ? value : r)));
  };

  return (
    <form className="w-full h-full flex flex-col items-center justify-center">
      <div className="border border-blue-300 rounded-lg p-8 w-full max-w-5xl mx-auto bg-white">
        <div className="flex flex-row gap-8 justify-between">
          {/* Logo + Company Name */}
          <div className="flex flex-col items-center border border-blue-300 rounded p-4 min-w-[220px] w-1/4">
            <input
              className="text-center border border-blue-200 rounded px-2 py-1 mb-4 text-sm"
              placeholder="Nombre de empresa"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
            <label className="block cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleLogoChange}
              />
              {logo ? (
                <img
                  src={logo}
                  alt="Logo"
                  className="w-32 h-32 object-contain rounded bg-gray-100"
                />
              ) : (
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
              )}
            </label>
          </div>
          {/* Benefits */}
          <div className="flex-1 border border-blue-300 rounded p-4 mx-2">
            <div className="text-center font-medium border-b border-blue-200 mb-2">
              Beneficios
            </div>
            <ol className="list-decimal pl-5 text-blue-500 text-sm">
              {benefits.map((b, i) => (
                <li key={i}>
                  <input
                    className="w-full bg-transparent border-none outline-none text-blue-500"
                    placeholder={`Beneficio ${i + 1}`}
                    value={b}
                    onChange={(e) => handleBenefitsChange(i, e.target.value)}
                  />
                </li>
              ))}
              {benefits.length < 5 && (
                <button
                  type="button"
                  className="text-xs text-blue-400 mt-2"
                  onClick={() => setBenefits([...benefits, ""])}
                >
                  + Añadir beneficio
                </button>
              )}
            </ol>
          </div>
          {/* Requirements */}
          <div className="flex-1 border border-blue-300 rounded p-4 mx-2">
            <div className="text-center font-medium border-b border-blue-200 mb-2">
              Requisitos
            </div>
            <ol className="list-decimal pl-5 text-blue-500 text-sm">
              {requirements.map((r, i) => (
                <li key={i}>
                  <input
                    className="w-full bg-transparent border-none outline-none text-blue-500"
                    placeholder={`Requisito ${i + 1}`}
                    value={r}
                    onChange={(e) =>
                      handleRequirementsChange(i, e.target.value)
                    }
                  />
                </li>
              ))}
              {requirements.length < 5 && (
                <button
                  type="button"
                  className="text-xs text-blue-400 mt-2"
                  onClick={() => setRequirements([...requirements, ""])}
                >
                  + Añadir requisito
                </button>
              )}
            </ol>
          </div>
          {/* Contact & Details */}
          <div className="flex flex-col gap-2 border border-blue-300 rounded p-4 min-w-[220px] w-1/4">
            <div>
              <div className="text-xs text-gray-500 mb-1">Contacto oficial</div>
              <input
                className="w-full border border-gray-300 rounded px-2 py-1 text-xs mb-2"
                placeholder="www.empresa.org/jobs"
                value={contactUrl}
                onChange={(e) => setContactUrl(e.target.value)}
              />
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">
                Correo para aplicar
              </div>
              <input
                className="w-full border border-gray-300 rounded px-2 py-1 text-xs"
                placeholder="empresajobs@ejemplo.com"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
              />
            </div>
            <div className="mt-2">
              <div className="text-xs text-gray-500 mb-1">Modalidad</div>
              <select
                className="w-full border border-gray-300 rounded px-2 py-1 text-xs"
                value={modality}
                onChange={(e) => setModality(e.target.value)}
              >
                {modalities.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-2">
              <div className="text-xs text-gray-500 mb-1">Público Objetivo</div>
              <select
                className="w-full border border-gray-300 rounded px-2 py-1 text-xs"
                value={publicTarget}
                onChange={(e) => setPublicTarget(e.target.value)}
              >
                {publics.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {/* Action Buttons */}
        <div className="flex justify-center gap-6 mt-10">
          <button
            type="button"
            className="border border-gray-400 rounded px-6 py-2 text-sm"
          >
            Descargar Flyer
          </button>
          <button
            type="button"
            className="border border-gray-400 rounded px-6 py-2 text-sm"
          >
            Subir Flyer
          </button>
          <button
            type="submit"
            className="border border-blue-500 text-blue-700 rounded px-6 py-2 text-sm font-semibold"
          >
            Publicar
          </button>
          <button
            type="button"
            className="border border-red-400 text-red-500 rounded px-6 py-2 text-sm font-semibold"
          >
            Cancelar
          </button>
        </div>
      </div>
    </form>
  );
};

export default CompanyOpportunityForm;
