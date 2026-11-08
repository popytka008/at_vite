import {t} from '../../trpc.js'
import {z} from 'zod'


export const getIdeaTrpcRoute = t.procedure
  .input(
    z.object({
      ideaNick: z.string()
    })
  )
  .query(async ({ctx, input}) => {
    
    const idea = await ctx.prisma.idea.findUnique({
      where: {
        nick: input.ideaNick
      }
    })
    return {idea}
    
  })

