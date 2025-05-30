import InterestCard from "../components/InterestCard";

const interests = [
  {
    id: "1",
    title: "Pasantía en Calidad Industrial",
    company: "INDUSTRIAS TICO",
    createdAt: "2025-05-15",
    modality: "onsite" as const,
    tags: ["Pasantía", "Empleo"],
  },
  {
    id: "2",
    title: "Desarrollador React Freelance",
    company: "Creativa Dev",
    createdAt: "2025-05-01",
    modality: "remote" as const,
    tags: ["TFG"],
  },
];

export default function InterestsPage() {
  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <h1 className="text-4xl font-semibold text-center text-blue-700 drop-shadow-sm">
        Mis intereses
      </h1>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        {interests.map((i) => (
          <InterestCard key={i.id} {...i} />
        ))}
      </div>
    </div>
  );
}
