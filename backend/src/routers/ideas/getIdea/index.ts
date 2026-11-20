import {t} from '../../../trpc.js'
import {z} from 'zod'

const serializeIdea = (idea: {
  id: number
  nick: string
  name: string
  description: string
  text: string
  authorId: number
  createdAt: Date
  author: { id: number, nick: string }
}) => ({
  ...idea,
  createdAt: idea.createdAt.toISOString()
})

export const zGetIdeaTrpcOutput = z.object({
  idea: z.object({
    id: z.number(),
    nick: z.string(),
    name: z.string(),
    description: z.string(),
    text: z.string(),
    authorId: z.number(),
    author: z.object({id: z.number(), nick: z.string(), name: z.string()}),
    createdAt: z.string()
  }).nullable()
})

export const getIdeaTrpcRoute = t.procedure
  .output(zGetIdeaTrpcOutput)
  .input(
    z.object({
      ideaNick: z.string()
    })
  )
  .query(async ({ctx, input}) => {
    
    const idea = await ctx.prisma.idea
      .findUnique({
        where: {nick: input.ideaNick},
        include: {
          author: {
            select: {id: true, nick: true, name: true}
          }
        }
      })
    return {idea: idea ? serializeIdea(idea) : null}
  })

// export const getIdeaTrpcRoute = t.procedure
//   .input(
//     z.object({
//       ideaNick: z.string()
//     })
//   )
//   .query(async ({ctx, input}) => {
//
//     const idea = await ctx.prisma.idea
//       .findUnique({
//         where: {nick: input.ideaNick},
//         include: {
//           author: {
//             select: {id: true, nick: true}
//           }
//       }
//     })
//     return {idea}
//
//   })

