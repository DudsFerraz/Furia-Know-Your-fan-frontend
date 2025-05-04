import axios from "axios";

const api = axios.create({
    baseURL: "https://furia-know-your-fan-production-372c.up.railway.app",
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem("jwt");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (!(config.data instanceof FormData)) {
    config.headers["Content-Type"] = "application/json";
  }

  return config;
});

export default api; 