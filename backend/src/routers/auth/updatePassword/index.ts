import {t}                        from '../../../trpc.js'
import {zUpdatePasswordTrpcInput} from './input.js'
import {getPasswordHash}          from '../../../utils/getPasswordHash.js'

export const updatePasswordTrpcRoute = t.procedure
  .input(zUpdatePasswordTrpcInput)
  .mutation(async ({ctx, input}) => {
    if (!ctx.me) {
      throw new Error('UNAUTHORIZED')
    }
    if (ctx.me.password !== getPasswordHash(input.oldPassword)) {
      throw new Error('Wrong old password')
    }
    // тот пользователь изменяет свой пароль
    ctx.me = await ctx.prisma.user.update({
      where: {id: ctx.me.id},
      data: {password: getPasswordHash(input.newPassword)}
    })
    
    return true
  })