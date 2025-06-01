// Este archivo debe exportar InterestFilters como un componente de filtros reutilizable
// No debe ser una página ni renderizar InterestCard ni mockInterests
// Debe aceptar props: onFiltersChange: (filters) => void
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

type Filters = {
  tags: string[];
  company?: string;
  search?: string;
};

interface Props {
  onFiltersChange: (filters: Filters) => void;
}

const tagsList = ["Pasantía", "Empleo", "TFG", "Remoto", "Presencial"];

const InterestFilters: React.FC<Props> = ({ onFiltersChange }) => {
  const { t } = useTranslation();
  const [filters, setFilters] = useState<Filters>({
    tags: [],
    company: "",
    search: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => {
      const updated = { ...prev, [name]: value };
      onFiltersChange(updated);
      return updated;
    });
  };

  const handleTagToggle = (tag: string) => {
    setFilters((prev) => {
      const tags = prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag];
      const updated = { ...prev, tags };
      onFiltersChange(updated);
      return updated;
    });
  };

  return (
    <form className="flex flex-wrap gap-4 items-center justify-center mb-6">
      <input
        type="text"
        name="search"
        placeholder={t("interests.filters.search", "Buscar por título...")}
        value={filters.search}
        onChange={handleChange}
        className="border rounded px-3 py-1 text-sm"
      />
      <input
        type="text"
        name="company"
        placeholder={t("interests.filters.company", "Empresa...")}
        value={filters.company}
        onChange={handleChange}
        className="border rounded px-3 py-1 text-sm"
      />
      <div className="flex gap-2 flex-wrap">
        {tagsList.map((tag) => (
          <button
            type="button"
            key={tag}
            className={`px-3 py-1 rounded-full text-xs border transition ${
              filters.tags.includes(tag)
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-400 hover:bg-gray-100"
            }`}
            onClick={() => handleTagToggle(tag)}
          >
            {t(`interests.filters.tags.${tag}`, tag)}
          </button>
        ))}
      </div>
    </form>
  );
};

export default InterestFilters;
