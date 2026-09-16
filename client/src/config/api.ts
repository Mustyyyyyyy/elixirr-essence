const localApiUrl = "http://localhost:5000/api";
const productionApiUrl = "https://elixirr-backend.vercel.app/api";

export const API_BASE_URL = import.meta.env.VITE_API_URL || (
  import.meta.env.PROD ? productionApiUrl : localApiUrl
);
export const API_ORIGIN = API_BASE_URL.replace(/\/api\/?$/, "");
