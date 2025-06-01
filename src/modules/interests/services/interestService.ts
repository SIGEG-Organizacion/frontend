import axios from "axios";
import type { Interest } from "../types/interest";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({ baseURL: API_URL + "/interests" });

// Interceptor: añade token si existe
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Permite pasar query params para populate
const getInterests = async (
  params?: Record<string, unknown>
): Promise<Interest[]> => {
  const { data } = await api.get<Interest[]>("/", { params });
  return data;
};

const createInterest = async (opportunityId: string): Promise<Interest> => {
  const { data } = await api.post<Interest>("/", { opportunityId });
  return data;
};

const deleteInterest = async (interestId: string): Promise<void> => {
  await api.delete(`/${interestId}`);
};

export default {
  getInterests,
  createInterest,
  deleteInterest,
};
