import axios, { type AxiosInstance } from "axios";
import { env } from "@/lib/env";
import { toApiError } from "./api-error";

export type TokenGetter = () => Promise<string | null>;

export function createHttpClient(getToken: TokenGetter): AxiosInstance {
  const client = axios.create({
    baseURL: env.NEXT_PUBLIC_API_URL,
    headers: { "Content-Type": "application/json" },
  });

  client.interceptors.request.use(async (config) => {
    const token = await getToken();
    if (token) config.headers.set("Authorization", `Bearer ${token}`);
    return config;
  });

  client.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error(error);
      return Promise.reject(toApiError(error));
    },
  );

  return client;
}
