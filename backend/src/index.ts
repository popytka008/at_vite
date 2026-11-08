import express                        from 'express'
import cors                           from 'cors'
import {trpcRouter}                   from './routers/index.js'
import {applyTrpcToExpressApp}        from './trpc.js'
import {AppContext, createAppContext} from './lib/ctx.js'
import {applyPassportToExpressApp}    from './lib/passport.js'
import {env}                          from './lib/env.js'

void (async function () {
  let ctx: AppContext | null = null
  
  try {
    const expressApp = express()
    ctx = createAppContext()
    expressApp.use(cors())
    expressApp.get('/ping', (_, res) => {
      res.send('pong')
    })
    // панель TRPC
    expressApp.use('/panel', async (_, res) => {
      // Если явно production — закрываем доступ
      if (process.env.NODE_ENV === 'production') {
        return res.status(404).send('Not Found')
      }
      
      const {renderTrpcPanel} = await import('trpc-ui-zod4')
      return res.send(
        renderTrpcPanel(trpcRouter, {url: `http://localhost:${env.PORT}/trpc`})
      )
    })
    
    // наш паспорт авторизации
    applyPassportToExpressApp(expressApp, ctx)
    // роутер, что мы применяем
    applyTrpcToExpressApp(expressApp, ctx, trpcRouter)
    
    // запуск сервера
    expressApp.listen(env.PORT, () => {
      console.log(`..at http://localhost:${env.PORT}/ping`)
    })
  } catch (e) {
    console.log('стоп-машина', e)
    await ctx?.stop()
  }
})()

