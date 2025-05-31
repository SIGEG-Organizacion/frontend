import { createContext, useEffect, useState } from "react";
import interestsService from "../services/interestService";
import type { Interest } from "../../../types/interest";

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
      const data = await interestsService.getInterests();
      setInterests(data);
    } catch (err: any) {
      setError(err.message || "Error al cargar intereses");
    } finally {
      setLoading(false);
    }
  };

  const addInterest = async (opportunityId: string) => {
    const newInterest = await interestsService.createInterest(opportunityId);
    setInterests((prev) => [...prev, newInterest]);
  };

  const removeInterest = async (interestId: string) => {
    await interestsService.deleteInterest(interestId);
    setInterests((prev) => prev.filter((i) => i._id !== interestId));
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <InterestsContext.Provider
      value={{
        interests,
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
