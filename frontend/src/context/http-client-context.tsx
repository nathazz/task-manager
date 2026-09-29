"use client";

import { useAuth } from "@clerk/nextjs";
import type { AxiosInstance } from "axios";
import { createContext, useContext, useMemo, type ReactNode } from "react";
import { createHttpClient } from "@/lib/http-client";

const HttpClientContext = createContext<AxiosInstance | null>(null);

export function HttpClientProvider({ children }: { children: ReactNode }) {
  const { getToken } = useAuth();
  const client = useMemo(() => createHttpClient(getToken), [getToken]);

  return (
    <HttpClientContext.Provider value={client}>
      {children}
    </HttpClientContext.Provider>
  );
}

export function useHttpClient(): AxiosInstance {
  const client = useContext(HttpClientContext);
  if (!client) {
    throw new Error("useHttpClient must be used inside HttpClientProvider");
  }
  return client;
}
