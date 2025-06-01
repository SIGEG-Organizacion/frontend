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
  const { interests, loading, error } = useInterests();
  const [filters, setFilters] = useState<Filters>({
    tags: [],
    company: "",
    search: "",
  });

  // Filtro de intereses
  // Ordena por fecha descendente
  const filteredInterests = useMemo(() => {
    return interests
      .filter((item) => {
        if (typeof item.opportunityId !== "object" || !item.opportunityId)
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
    if (typeof interest.opportunityId !== "object" || !interest.opportunityId)
      return null;
    const { title, company, tags, modality, description, image } =
      interest.opportunityId;
    return (
      <InterestCard
        key={interest.id}
        title={title}
        company={company}
        createdAt={interest.createdAt}
        modality={modality}
        tags={tags}
        description={description}
        image={image}
      />
    );
  };

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <h1 className="text-4xl font-semibold text-center text-blue-700 drop-shadow-md mb-6">
        {t("interests.title", "Mis intereses")}
      </h1>
      <div className="max-w-4xl mx-auto">
        <InterestFilters onFiltersChange={setFilters} />
      </div>
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
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {filteredInterests.map(renderInterestCard)}
        </div>
      )}
    </div>
  );
}
