import {t} from '../../../trpc.js'
import {z} from 'zod'
// import {zGetIdeasTrpcInput} from './zGetIdeasTrpcInput.js'

export const zGetIdeasTrpcOutput = z.object({
  ideas: z.array(
    z.object({
      id: z.number(),
      nick: z.string(),
      name: z.string(),
      description: z.string(),
      createdAt: z.string()
    })
  )
})

export const getIdeasTrpcRoute = t.procedure
  // .input(zGetIdeasTrpcInput)
  .output(zGetIdeasTrpcOutput)
  .query(async ({ctx, input}) => {
  
  const ideas = await ctx.prisma.idea.findMany({
    select: {
      id: true,
      nick: true,
      name: true,
      description: true,
      createdAt: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
    
    return {
      ideas: ideas.map(idea => ({
          ...idea,
          createdAt: idea.createdAt.toISOString()
        })
      )
    }
})

