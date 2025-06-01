import { useContext } from "react";
import { InterestsContext } from "../context/InterestContext";
import type { Interest } from "../types/interest";

export interface UseInterestsReturn {
  interests: Interest[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  addInterest: (opportunityId: string) => Promise<void>;
  removeInterest: (interestId: string) => Promise<void>;
}

export const useInterests = (): UseInterestsReturn => {
  const context = useContext(InterestsContext);

  if (!context) {
    throw new Error("useInterests must be used within an InterestsProvider");
  }

  return context;
};
