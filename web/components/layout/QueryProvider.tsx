"use client";
import { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusCode } from "@/types/api";
const QueryProvider = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000 * 60,
            refetchInterval: 60 * 1000 * 60,
            refetchOnWindowFocus: false,
            //eslint-disable-next-line
            retry: (failureCount, error: any) => {
              return (
                failureCount < 2 &&
                error.statusCode !== StatusCode.TokenExpired &&
                error.statusCode !== StatusCode.Unauthorized
              );
            },
            refetchOnMount: false,
            refetchOnReconnect: false,
          },
        },
      }),
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default QueryProvider;
