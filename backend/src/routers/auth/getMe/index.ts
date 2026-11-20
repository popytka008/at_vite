import {t}          from '../../../trpc.js'
import {toClientMe} from '../../../lib/models.js'

export const getMeTrpcRoute = t.procedure
  .query(({ctx}) => (
    {me: toClientMe(ctx.me)}
  ))