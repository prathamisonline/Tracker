// ClientOnlyReactQueryProvider.tsx
"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

const queryClient = new QueryClient(); // Initialize the query client

interface ClientOnlyReactQueryProviderProps {
  children: ReactNode;
}

const ClientOnlyReactQueryProvider = ({
  children,
}: ClientOnlyReactQueryProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ClientOnlyReactQueryProvider;
