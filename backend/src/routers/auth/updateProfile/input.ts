import {z} from 'zod'

const nickPattern = /^[a-zA-Z_][a-zA-Z0-9_]*$/
const nickWarning = 'Alpha-numeric characters only'
const fieldWarning = 'Ought te be at least 1 character'
export const zUpdateProfileTrpcInput = z.object({
  nick: z.string()
    .min(1, fieldWarning)
    .regex(nickPattern, nickWarning),
  name: z.string().max(50).default('')
})