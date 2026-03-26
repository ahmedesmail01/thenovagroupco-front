import api from "./api";

export const getCookie = () =>
  api.get(`${import.meta.env.VITE_API_BASE}/sanctum/csrf-cookie`);
