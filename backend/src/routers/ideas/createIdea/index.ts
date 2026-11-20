import {t}                    from '../../../trpc.js'
import {zCreateIdeaTrpcInput} from './input.js'


export const createIdeaTrpcRoute = t.procedure
  .input(zCreateIdeaTrpcInput)
  .mutation(async ({ctx, input}) => {
    if (!ctx.me) {
      throw new Error('Not authenticated')
    }
    const exIdea = await ctx.prisma.idea.findUnique({
      where: {
        nick: input.nick
      }
    })
    
    if (exIdea) {
      throw new Error('This nick is occuped')
    }
    
    await ctx.prisma.idea.create({
      data: {...input, authorId: ctx.me.id}
    })
    
    return 'done createIdeaTrpcRoute'
  })