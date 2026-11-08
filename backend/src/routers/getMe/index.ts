import {t} from '../../trpc.js'
import _   from 'lodash'

export const getMeTrpcRoute = t.procedure
  .query(({ctx}) => (
    {me: (ctx.me && _.pick(ctx.me, ['id', 'nick']))}
  ))