import {zUpdateProfileTrpcInput} from './input.js'
import {t}                       from '../../../trpc.js'
import {toClientMe}              from '../../../lib/models.js'

export const updateProfileTrpcRoute = t.procedure
  .input(zUpdateProfileTrpcInput)
  .mutation(async ({ctx, input}) => {
    if (!ctx.me) {
      throw new Error('UNAUTHORIZED')
    }
    if (!ctx.me.nick) {
      const exUser = await ctx.prisma.user.findUnique({
        where: {nick: input.nick}
      })
      if (exUser) {
        throw new Error('This name is occupied')
      }
    }
    const updateMe = await ctx.prisma.user.update({
      where: {id: ctx.me.id},
      data: input
    })
    ctx.me = updateMe
    return toClientMe(updateMe)
  })
