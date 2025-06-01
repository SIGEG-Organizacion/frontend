import { useTranslation } from "react-i18next";

interface Props {
  title: string;
  company: string;
  createdAt: string;
  tags: string[];
  description: string[];
  image?: string;
}

export default function InterestCard({
  title,
  company,
  createdAt,
  tags,
  description,
  image,
}: Props) {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-100 rounded-lg p-6 shadow-md relative flex flex-col gap-3">
      {/* Empresa + logo */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-2xl font-bold text-black">{company}</h3>
          <p className="text-xs text-gray-500 mt-1">
            Publicado el {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>
        {image ? (
          <img
            src={image}
            alt={`${company} logo`}
            className="w-16 h-16 object-contain"
          />
        ) : (
          <div className="w-16 h-16 bg-gray-400 rounded-full" />
        )}
      </div>

      {/* Título de la publicación */}
      <h4 className="text-lg font-medium text-gray-800 mt-2">{title}</h4>

      {/* Descripción con checkmarks */}
      <ul className="text-xs text-black list-disc ml-5 space-y-1">
        {description.map((d, idx) => (
          <li key={idx}>{d}</li>
        ))}
      </ul>

      {/* Etiquetas */}
      <div className="flex gap-2 mt-3 flex-wrap">
        {tags.map((tag) => (
          <span
            key={tag}
            className="bg-gray-300 text-gray-700 text-[10px] px-3 py-[2px] rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Botones */}
      <div className="mt-4 flex justify-between items-center">
        <button className="text-[#FF5252] border border-[#FF5252] text-xs px-3 py-1 rounded hover:bg-red-50 transition">
          {t("interests.notInterested", "No me interesa")}
        </button>
        <button className="bg-gray-600 text-white text-xs px-3 py-1 rounded hover:bg-gray-700 transition">
          {t("interests.details", "Ver detalles")}
        </button>
      </div>
    </div>
  );
}
