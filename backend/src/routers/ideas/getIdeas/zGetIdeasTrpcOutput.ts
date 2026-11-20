import {z} from 'zod'


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