import api from "./api";

export const getCookie = () =>
  api.get("/sanctum/csrf-cookie", { withCredentials: true });
