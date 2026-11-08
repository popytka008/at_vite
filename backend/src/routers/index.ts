import {t}                   from '../trpc.js'
import {getIdeaTrpcRoute}    from './getIdea/index.js'
import {getIdeasTrpcRoute}   from './getIdeas/index.js'
import {createIdeaTrpcRoute} from './createIdea/index.js'
import {signUpTrpcRoute}     from './signUp/index.js'
import {signInTrpcRoute}     from './signIn/index.js'
import {getMeTrpcRoute}      from './getMe/index.js'


// роутер для этих данных
export const trpcRouter = t.router({
  getIdeas: getIdeasTrpcRoute,
  getIdea: getIdeaTrpcRoute,
  createIdea: createIdeaTrpcRoute,
  signUp: signUpTrpcRoute,
  signIn: signInTrpcRoute,
  getMe: getMeTrpcRoute
})

export type TrpcRouter = typeof trpcRouter
