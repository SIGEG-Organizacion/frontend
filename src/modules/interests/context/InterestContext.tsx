import { createContext, useEffect, useState } from "react";
import interestsService from "../services/interestService";
import type { Interest } from "../types/interest";

interface InterestsContextValue {
  interests: Interest[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  addInterest: (opportunityId: string) => Promise<void>;
  removeInterest: (interestId: string) => Promise<void>;
}

export const InterestsContext = createContext<
  InterestsContextValue | undefined
>(undefined);

export const InterestsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [interests, setInterests] = useState<Interest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await interestsService.getInterests({ populate: true });
      setInterests(data || []); // Ensure we always set an array
    } catch (err) {
      setError((err as Error).message || "Error al cargar intereses");
      setInterests([]); // Reset to empty array on error
    } finally {
      setLoading(false);
    }
  };

  const addInterest = async (opportunityId: string) => {
    try {
      const newInterest = await interestsService.createInterest(opportunityId);
      setInterests((prev) => [...prev, newInterest]);
    } catch (err) {
      setError((err as Error).message || "Error al añadir interés");
    }
  };

  const removeInterest = async (interestId: string) => {
    try {
      await interestsService.deleteInterest(interestId);
      setInterests((prev) =>
        prev.filter((i) => i.id !== interestId && i._id !== interestId)
      );
    } catch (err) {
      setError((err as Error).message || "Error al eliminar interés");
    }
  };

  useEffect(() => {
    refresh();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <InterestsContext.Provider
      value={{
        interests: interests || [], // Extra safety to ensure it's always an array
        loading,
        error,
        refresh,
        addInterest,
        removeInterest,
      }}
    >
      {children}
    </InterestsContext.Provider>
  );
};
