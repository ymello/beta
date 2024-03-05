import { QueryClient, QueryClientProvider } from "react-query";
import { ReactNode } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 300000,
    },
  },
});

interface QueryClientProviderWrapperProps {
  children: ReactNode;
}

export const QueryClientProviderWrapper = ({
  children,
}: QueryClientProviderWrapperProps) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
