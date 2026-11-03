import {t}                   from '../trpc.js'
import {getIdeaTrpcRoute}    from './getIdea/index.js'
import {getIdeasTrpcRoute}   from './getIdeas/index.js'
import {createIdeaTrpcRoute} from './createIdea/index.js'


// роутер для этих данных
export const trpcRouter = t.router({
  getIdeas: getIdeasTrpcRoute,
  getIdea: getIdeaTrpcRoute,
  createIdea: createIdeaTrpcRoute
})

export type TrpcRouter = typeof trpcRouter
