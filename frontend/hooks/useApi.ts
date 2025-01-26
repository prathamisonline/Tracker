import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

// Axios instance for base configuration
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Ensure this is set in your `.env` file
  withCredentials: true, // Include cookies for authenticated requests
  headers: {
    "Content-Type": "application/json",
  },
});

// API client methods for reusable HTTP calls
const apiClient = {
  get: <T>(url: string, config?: AxiosRequestConfig) => api.get<T>(url, config),
};

// Custom hook for React Query integration
export const useApiQuery = <
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData
>(
  key: readonly unknown[], // React Query key
  url: string, // API endpoint
  config?: AxiosRequestConfig, // Optional Axios config
  options?: UseQueryOptions<
    AxiosResponse<TQueryFnData>,
    TError,
    TData,
    readonly unknown[]
  > // React Query options
) => {
  return useQuery<AxiosResponse<TQueryFnData>, TError, TData>(
    key,
    async () => {
      const response = await apiClient.get<TQueryFnData>(url, config);
      return response;
    },
    options
  );
};