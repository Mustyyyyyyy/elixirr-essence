import axios from "axios";
import { API_BASE_URL } from "../config/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});
const apiOrigin = (api.defaults.baseURL || "").replace(/\/api\/?$/, "");

const normalizeProduct = (product: Record<string, any>) => ({
  ...product,
  images: (product.images ?? []).map((image: Record<string, any>) => ({
    ...image,
    url: image.url?.startsWith("http") ? image.url : `${apiOrigin}${image.url ?? ""}`,
  })),
  shortDescription: product.shortDescription ?? product.short_description ?? "",
  bestSeller: product.bestSeller ?? product.best_seller ?? false,
  newArrival: product.newArrival ?? product.new_arrival ?? false,
  careInstructions: product.careInstructions ?? product.care_instructions ?? [],
});

const normalizeOrder = (order: Record<string, any>) => ({
  ...order,
  _id: String(order._id ?? order.id),
  customer: order.customer ?? {
    name: order.customer_name,
    email: order.customer_email,
    phone: order.customer_phone,
    address: order.customer_address,
    city: order.customer_city,
    postalCode: order.customer_postal_code,
    country: order.customer_country,
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => {
    if (response.data?.products) {
      response.data.products = response.data.products.map(normalizeProduct);
    }
    if (response.data?.orders) {
      response.data.orders = response.data.orders.map(normalizeOrder);
    }
    if (response.data?.id && response.data?.customer_name) {
      response.data = normalizeOrder(response.data);
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("admin");
      window.location.href = "/admin/login";
    }
    return Promise.reject(error);
  }
);

export default api;
