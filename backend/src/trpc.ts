import type {inferAsyncReturnType} from '@trpc/server'
import {initTRPC}                  from '@trpc/server'
import type {Express}              from 'express'
import type {TrpcRouter}           from './routers/index.js'
import * as trpcExpress            from '@trpc/server/adapters/express'
import type {AppContext}           from './lib/ctx.js'
import type {ExpressRequest}       from './utils/types.js'
import superjson                   from 'superjson'

const getCreateTrpcContext = (appContext: AppContext) =>
  ({req}: trpcExpress.CreateExpressContextOptions) =>
    (
      {
        ...appContext,
        me: (req as ExpressRequest).user || null
      }
    )

// type TrpcContext = inferAsyncReturnType<ReturnType<typeof getCreateTrpcContext>>
type TrpcContext = inferAsyncReturnType<typeof getCreateTrpcContext>
//@TODO посмотри на superjson

export const t = initTRPC
  .context<TrpcContext>()
  .create({transformer: superjson})


// роутер, что мы применяем
export const applyTrpcToExpressApp = (expressApp: Express, appContext: AppContext, trpcRouter: TrpcRouter) => {
  expressApp.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: trpcRouter,
      createContext: getCreateTrpcContext(appContext)
    })
  )
}
