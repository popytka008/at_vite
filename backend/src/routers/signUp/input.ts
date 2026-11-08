import {z} from 'zod'

export const zSignUpTrpcInput = z.object({
  nick: z.string().min(1).regex(/^[a-zA-Z_][a-zA-Z0-9_]*$/, 'Nick is to be alpha-numeric'),
  password: z.string().min(1, 'Password is required')
})