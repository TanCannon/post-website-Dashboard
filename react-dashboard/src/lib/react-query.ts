import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000, // 5 min caching
            refetchOnWindowFocus: false,
            retry: 1,
        },
    },
})