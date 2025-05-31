import { useState } from "react";
import InterestCard from "../components/InterestCard";
import InterestFilters from "../components/InterestFilters";

const mockInterests = [
  {
    id: "1",
    title: "Pasantía en Calidad Industrial",
    company: "McDonald's",
    modality: "onsite" as const,
    createdAt: "2025-05-15",
    tags: ["Pasantía", "Empleo"],
    description: [
      "Estudiante activo en Ingeniería Industrial o afín.",
      "Conocimientos en control de calidad y optimización de procesos.",
      "Disponibilidad para trabajar 20 horas semanales.",
    ],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/5/5d/McDonald%27s_2020_logo.svg",
  },
  {
    id: "2",
    title: "Desarrollador React Freelance",
    company: "Google",
    modality: "remote" as const,
    createdAt: "2025-05-01",
    tags: ["TFG"],
    description: ["Título de la publicación"],
    image: "", // Fallback
  },
];

export default function InterestsPage() {
  const [filters, setFilters] = useState<{
    tags: string[];
    company?: string;
    date?: string;
    search?: string;
  }>({
    tags: [],
    company: "",
    date: "",
    search: "",
  });

  const filteredInterests = mockInterests.filter((item) => {
    const matchesTags =
      filters.tags.length === 0 ||
      filters.tags.every((tag) => item.tags.includes(tag));
    const matchesCompany =
      !filters.company ||
      item.company.toLowerCase().includes(filters.company.toLowerCase());
    const matchesSearch =
      !filters.search ||
      item.title.toLowerCase().includes(filters.search.toLowerCase());
    return matchesTags && matchesCompany && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <h1 className="text-4xl font-semibold text-center text-blue-700 drop-shadow-md">
        Mis intereses
      </h1>

      <InterestFilters onFiltersChange={setFilters} />

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {filteredInterests.length > 0 ? (
          filteredInterests.map((interest) => (
            <InterestCard key={interest.id} {...interest} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No hay resultados que coincidan con los filtros actuales.
          </p>
        )}
      </div>
    </div>
  );
}
