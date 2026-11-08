import {t}                from '../../trpc.js'
import {zSignUpTrpcInput} from './input.js'
import {getPasswordHash}  from '../../utils/getPasswordHash.js'
import {signJWT}          from '../../utils/signJWT.js'

export const signUpTrpcRoute = t.procedure
  .input(zSignUpTrpcInput)
  .mutation(async ({ctx, input}) => {
    const exUser = await ctx.prisma.user.findUnique({
      where: {
        nick: input.nick
      }
    })
    
    if (exUser) {
      throw new Error('This nick is occupied')
    }
    
    const user = await ctx.prisma.user.create({
      data: {
        nick: input.nick,
        // password: crypto.createHash('sha256').update(input.password).digest('hex')
        password: getPasswordHash(input.password)
      }
      
    })
    const token = signJWT(user.id.toString())
    return {token}
  })