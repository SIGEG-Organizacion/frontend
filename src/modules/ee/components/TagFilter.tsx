interface TagFilterProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export default function TagFilter({
  label,
  selected,
  onClick,
}: TagFilterProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1 rounded-full text-sm border transition ${
        selected
          ? "bg-blue-600 text-white border-blue-600"
          : "bg-white text-gray-700 border-gray-400 hover:bg-gray-100"
      }`}
    >
      {label}
    </button>
  );
}
