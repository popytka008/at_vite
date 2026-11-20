import {z} from 'zod'

export const zSignInTrpcInput = z.object({
  nick: z.string().min(1, 'At least 1 character'),
  password: z.string().min(1, 'At least 1 character')
})