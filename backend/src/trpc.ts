import {initTRPC}        from '@trpc/server'
import {Express}         from 'express'
import type {TrpcRouter} from './routers/index.js'
import * as trpcExpress  from '@trpc/server/adapters/express'

export const t = initTRPC.create()


// роутер, что мы применяем
export const applyTrpcToExpressApp = (expressApp: Express, trpcRouter: TrpcRouter) => {
  expressApp.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: trpcRouter
    })
  )
}
