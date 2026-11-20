import {z} from 'zod'

export const zCreateIdeaTrpcInput = z.object({
  name: z.string().min(1, 'Name is required'),
  nick: z.string().min(1).regex(/^[a-zA-Z_][a-zA-Z0-9_]*$/, 'Nick is to be alpha-numeric'),
  description: z.string().min(1, 'Description is required'),
  text: z.string().min(100, 'Text is to be more 100 chars')
})


