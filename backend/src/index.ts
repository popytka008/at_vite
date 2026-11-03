import express                 from 'express'
import cors                    from 'cors'
import {trpcRouter}            from './routers/index.js'
import {applyTrpcToExpressApp} from './trpc.js'

const expressApp = express()
expressApp.use(cors())
expressApp.get('/ping', (_, res) => {
  res.send('pong')
})

// роутер, что мы применяем
applyTrpcToExpressApp(expressApp, trpcRouter)

// запуск сервера
expressApp.listen(3000, () => {
  console.log('..at http://localhost:3000/ping')
})