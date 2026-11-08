import {createTRPCReact} from '@trpc/react-query'
import type {TrpcRouter} from '@at_vite/backend/src/routers/index.ts'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {httpBatchLink} from '@trpc/client'
import Cookies           from 'js-cookie'
import superjson         from 'superjson'
import {env}             from './env.ts'
// import {httpBatchStreamLink} from '@trpc/client'

export const trpc
  = createTRPCReact<TrpcRouter>()

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false
    }
  }
})

const trpcClient = trpc.createClient({
  // transformer: superjson,
  links: [
    httpBatchLink({
      // httpBatchStreamLink({
      url: env.VITE_BACKEND_TRPC_URL,
      transformer: superjson as any,
      headers: () => {
        const token = Cookies.get('token')
        return {
          ...(token && {authorization: `Bearer ${token}`})
        }
      }
    })
  ]
})

export const TrpcProvider = (
  {children}: { children: React.ReactNode }
) => {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  )
}