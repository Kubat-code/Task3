import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://4596efd6a87aee47.mokky.dev",
  timeout: 8000,
  headers: { Accept: "application/json" },
});
