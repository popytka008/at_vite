import {t}                from '../../trpc.js'
import {zSignInTrpcInput} from './input.js'
import {getPasswordHash}  from '../../utils/getPasswordHash.js'
import {signJWT}          from '../../utils/signJWT.js'

export const signInTrpcRoute = t.procedure.input(zSignInTrpcInput).mutation(
  async ({ctx, input}) => {
    const user = await ctx.prisma.user.findFirst({
      where: {
        nick: input.nick,
        password: getPasswordHash(input.password)
      }
    })
    if (!user) {
      throw new Error('Wrong nick or password')
    }
    const token = signJWT(user.id.toString())
    return {token}
  }
)