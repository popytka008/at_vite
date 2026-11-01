import express from 'express'
import * as trpcExpress from '@trpc/server/adapters/express'
import {t} from './trpc.js'
import cors from 'cors'
import {ideaRouter} from './routers/ideaRouter.js'

const expressApp = express()
expressApp.use(cors())
expressApp.get('/ping', (_, res) => {
  res.send('pong')
})

// создаём серверный роутер
const serverRouter = t.router({
  ideas: ideaRouter
})

// те самые экспорты
export const trpcRouter = serverRouter
export type TrpcRouter = typeof serverRouter

// роутер, что мы прминяем
expressApp.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: serverRouter
  })
)
// запуск сервера
expressApp.listen(3000, () => {
  console.log('..at http://localhost:3000/ping')
})