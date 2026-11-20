import {getIdeaTrpcRoute}                           from './ideas/getIdea/index.js'
import {getIdeasTrpcRoute}                          from './ideas/getIdeas/index.js'
import {createIdeaTrpcRoute}                        from './ideas/createIdea/index.js'
import {updateIdeaTrpcRoute}                        from './ideas/updateIdea/index.js'
import {t}                                          from '../trpc.js'
import {signUpTrpcRoute}                            from './auth/signUp/index.js'
import {signInTrpcRoute}                            from './auth/signIn/index.js'
import {getMeTrpcRoute}                             from './auth/getMe/index.js'
import type {inferRouterInputs, inferRouterOutputs} from '@trpc/server'
import {updateProfileTrpcRoute}                     from './auth/updateProfile/index.js'
import {updatePasswordTrpcRoute}                    from './auth/updatePassword/index.js'


// роутер для этих данных
export const trpcRouter = t.router({
  getIdeas: getIdeasTrpcRoute,
  getIdea: getIdeaTrpcRoute,
  createIdea: createIdeaTrpcRoute,
  signUp: signUpTrpcRoute,
  signIn: signInTrpcRoute,
  getMe: getMeTrpcRoute,
  updateProfile: updateProfileTrpcRoute,
  updatePassword: updatePasswordTrpcRoute,
  updateIdea: updateIdeaTrpcRoute
})

export type TrpcRouter = typeof trpcRouter
export type TrpcRouterInput = inferRouterInputs<TrpcRouter>
export type TrpcRouterOutput = inferRouterOutputs<TrpcRouter>

export type GetMeType = NonNullable<TrpcRouterOutput['getMe']['me']>
