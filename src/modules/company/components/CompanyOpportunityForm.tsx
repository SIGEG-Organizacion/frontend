// src/modules/company/components/CompanyOpportunityForm.tsx
import React, { useState } from "react";
import type { Opportunity } from "../types/opportunity";
import { useTranslation } from "react-i18next";

interface Props {
  /** Si estamos editando, initialData viene con la oportunidad existente */
  initialData?: Opportunity;
  /** callback que crea o actualiza la oportunidad */
  onSave: (
    data: Omit<Opportunity, "_id" | "createdAt" | "uuid"> & { uuid?: string }
  ) => Promise<void>;
  onCancel: () => void;
  loading: boolean;
}

const CompanyOpportunityForm: React.FC<Props> = ({
  initialData,
  onSave,
  onCancel,
  loading,
}) => {
  const { t } = useTranslation();

  const [description, setDescription] = useState(
    initialData?.description ?? ""
  );
  const [requirements, setRequirements] = useState(
    initialData?.requirements.join(", ") ?? ""
  );
  const [benefits, setBenefits] = useState(
    initialData?.benefits.join(", ") ?? ""
  );
  const [mode, setMode] = useState(initialData?.mode ?? "");
  const [email, setEmail] = useState(initialData?.email ?? "");
  const [deadline, setDeadline] = useState(
    initialData?.deadline?.slice(0, 10) ?? ""
  );
  const [flyerFormat, setFlyerFormat] = useState<"JPG" | "">(
    (initialData?.format?.toUpperCase() as "JPG") ?? ""
  );
  const [forStudents, setForStudents] = useState(
    initialData?.forStudents ?? false
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("description", description);
    formData.append("mode", mode);
    formData.append("email", email);
    formData.append("deadline", deadline);
    formData.append("format", flyerFormat || "JPG"); // Default value: JPG
    formData.append("forStudents", String(forStudents));

    if (imageFile) {
      formData.append("logo", imageFile);
    }

    // Convertir las cadenas de texto separadas por comas en arrays
    const requirementsArray = requirements
      .split(",")
      .map((r) => r.trim())
      .filter(Boolean);
    const benefitsArray = benefits
      .split(",")
      .map((b) => b.trim())
      .filter(Boolean);

    // Agregar cada elemento del array con corchetes
    requirementsArray.forEach((r) => formData.append("requirements[]", r));
    benefitsArray.forEach((b) => formData.append("benefits[]", b));

    // Si estamos editando, incluir el UUID
    if (initialData?.uuid) {
      formData.append("uuid", initialData.uuid);
    }

    try {
      // Remove the any cast and use the proper type for formData
      await onSave(Object.fromEntries(formData.entries()) as unknown as Omit<Opportunity, "_id" | "createdAt" | "uuid"> & { uuid?: string });
    } catch (error) {
      console.error("Error al enviar la oportunidad:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block mb-1 font-medium">
          {t("company.form.description")}
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
          rows={4}
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">
          {t("company.form.requirements")}
        </label>
        <input
          type="text"
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
          placeholder={t("company.form.csvPlaceholder")}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">
          {t("company.form.benefits")}
        </label>
        <input
          type="text"
          value={benefits}
          onChange={(e) => setBenefits(e.target.value)}
          placeholder={t("company.form.csvPlaceholder")}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-1 font-medium">
            {t("company.form.mode")}
          </label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
          >
            <option value="">{t("company.form.selectMode")}</option>
            <option value="remote">{t("company.form.modeRemote")}</option>
            <option value="on-site">{t("company.form.modeOnsite")}</option>
            <option value="hybrid">{t("company.form.modeHybrid")}</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">
            {t("company.form.email")}
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-1 font-medium">
            {t("company.form.deadline")}
          </label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            {t("company.form.flyerFormat")}
          </label>
          <select
            value={flyerFormat}
            onChange={(e) =>
              setFlyerFormat(e.target.value as "JPG" | "")
            }
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
          >
            <option value="">{t("company.form.selectFormat")}</option>
            <option value="JPG">JPG</option>
          </select>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <input
          id="forStudents"
          type="checkbox"
          checked={forStudents}
          onChange={(e) => setForStudents(e.target.checked)}
          className="h-4 w-4"
        />
        <label htmlFor="forStudents" className="font-medium">
          {t("company.form.forStudents")}
        </label>
      </div>
      <div>
        <label className="block mb-1 font-medium">
          Logo de la empresa (PNG o JPG)
        </label>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={() => document.getElementById("logo-input")?.click()}
              className="bg-white border-2 border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-all duration-200 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>Seleccionar logo</span>
            </button>
            <span className="text-sm text-gray-600">
              {imageFile ? imageFile.name : "Ningún archivo seleccionado"}
            </span>
          </div>

          <input
            id="logo-input"
            type="file"
            accept="image/png, image/jpeg"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (file) {
                setImageFile(file);
                // Crear URL para previsualización
                const previewUrl = URL.createObjectURL(file);
                setImageUrl(previewUrl);
              }
            }}
            className="hidden"
          />

          {imageUrl && (
            <div className="flex-shrink-0">
              <div className="relative w-16 h-16 border rounded-lg overflow-hidden bg-gray-50">
                <img
                  src={imageUrl}
                  alt="Vista previa del logo"
                  className="w-full h-full object-contain"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImageFile(null);
                    setImageUrl(null);
                  }}
                  className="absolute top-0.5 right-0.5 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600 transition-colors"
                  title="Eliminar imagen"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
        >
          {t("company.form.cancel")}
        </button>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? t("company.form.saving") : t("company.form.save")}
        </button>
      </div>
    </form>
  );
};

export default CompanyOpportunityForm;
