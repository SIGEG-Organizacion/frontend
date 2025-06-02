import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import InterestCard from "../components/InterestCard";
import InterestFilters from "../components/InterestFilters";
import { useInterests } from "../hooks/useInterests";

interface Filters {
  tags: string[];
  company?: string;
  search?: string;
}

export default function InterestsPage() {
  const { t } = useTranslation();
  const { interests = [], loading, error } = useInterests();
  const [filters, setFilters] = useState<Filters>({
    tags: [],
    company: "",
    search: "",
  });

  // Filtro de intereses
  // Ordena por fecha descendente
  const filteredInterests = useMemo(() => {
    if (!Array.isArray(interests)) return [];

    return interests
      .filter((item) => {
        if (
          !item ||
          typeof item.opportunityId !== "object" ||
          !item.opportunityId
        )
          return false;
        const {
          title = "",
          company = "",
          tags = [],
        } = item.opportunityId || {};
        const matchesTags =
          !filters.tags.length ||
          filters.tags.every((tag) => tags.includes(tag));
        const matchesCompany =
          !filters.company ||
          company.toLowerCase().includes(filters.company.toLowerCase());
        const matchesSearch =
          !filters.search ||
          title.toLowerCase().includes(filters.search.toLowerCase());
        return matchesTags && matchesCompany && matchesSearch;
      })
      .sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA;
      });
  }, [interests, filters]);

  // Renderizado de tarjetas
  const renderInterestCard = (interest: (typeof interests)[number]) => {
    if (
      !interest ||
      typeof interest.opportunityId !== "object" ||
      !interest.opportunityId
    )
      return null;
    const { title, company, tags, description, image } = interest.opportunityId;
    return (
      <InterestCard
        key={interest.id}
        title={title}
        company={company}
        createdAt={interest.createdAt}
        tags={tags}
        description={description}
        image={image}
      />
    );
  };

  return (
    <div className="container mx-auto p-6 space-y-8 bg-gray-100 min-h-screen">
      <h1 className="text-5xl font-bold text-center text-blue-600 drop-shadow-lg">
        {t("interests.title", "Mis intereses")}
      </h1>

      {/* Filters Section */}
      <div className="bg-white shadow rounded-lg p-4 flex flex-wrap items-center justify-between gap-4">
        <InterestFilters onFiltersChange={setFilters} />
        <input
          type="text"
          placeholder={t(
            "interests.searchPlaceholder",
            "Buscar flyer por nombre..."
          )}
          className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[200px]"
        />
      </div>

      {/* Interests Cards */}
      {loading ? (
        <p className="text-center text-gray-500 mt-10">
          {t("interests.loading", "Cargando intereses...")}
        </p>
      ) : error ? (
        <p className="text-center text-red-500 mt-10">
          {t("interests.error", error)}
        </p>
      ) : filteredInterests.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          {t("interests.empty", "No tienes intereses guardados aún.")}
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredInterests.map(renderInterestCard)}
        </div>
      )}
    </div>
  );
}
