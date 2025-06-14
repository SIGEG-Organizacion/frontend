import axios from "axios";
import type { User as BaseUser } from "../../auth/types/auth";

export interface User extends BaseUser {
  validated?: boolean;
}

const API_URL = import.meta.env.VITE_API_URL + "/users";
const api = axios.create({ baseURL: API_URL });

// Interceptor para adjuntar el token JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getAllUsers = async (): Promise<User[]> => {
  const res = await api.get<{ users: User[] }>("/");
  return res.data.users;
};

export const manageUser = async (
  email: string,
  action: "validate" | "delete"
): Promise<void> => {
  await api.put("/manage", { email, action });
};

export const markStudentAsGraduated = async (email: string): Promise<void> => {
  await axios.put(
    `${import.meta.env.VITE_API_URL}/students/graduate/${email}`,
    {},
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );
};
