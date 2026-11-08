import {t}                    from '../../trpc.js'
import {zCreateIdeaTrpcInput} from './input.js'


export const createIdeaTrpcRoute = t.procedure
  .input(zCreateIdeaTrpcInput)
  .mutation(async ({ctx, input}) => {
    const exIdea = await ctx.prisma.idea.findUnique({
      where: {
        nick: input.nick
      }
    })
    
    if (exIdea) {
      throw new Error('This nick is occuped')
    }
    
    await ctx.prisma.idea.create({
      data: input
    })
    
    return 'done createIdeaTrpcRoute'
  })