import {t}                                          from '../trpc.js'
import {getIdeaTrpcRoute}                           from './getIdea/index.js'
import {getIdeasTrpcRoute}                          from './getIdeas/index.js'
import {createIdeaTrpcRoute}                        from './createIdea/index.js'
import {signUpTrpcRoute}                            from './signUp/index.js'
import {signInTrpcRoute}                            from './signIn/index.js'
import {getMeTrpcRoute}                             from './getMe/index.js'
import {updateIdeaTrpcRoute}                        from './updateIdea/index.js'
import type {inferRouterInputs, inferRouterOutputs} from '@trpc/server'


// роутер для этих данных
export const trpcRouter = t.router({
  getIdeas: getIdeasTrpcRoute,
  getIdea: getIdeaTrpcRoute,
  createIdea: createIdeaTrpcRoute,
  signUp: signUpTrpcRoute,
  signIn: signInTrpcRoute,
  getMe: getMeTrpcRoute,
  updateIdea: updateIdeaTrpcRoute
})

export type TrpcRouter = typeof trpcRouter
export type TrpcRouterInput = inferRouterInputs<TrpcRouter>
export type TrpcRouterOutput = inferRouterOutputs<TrpcRouter>
