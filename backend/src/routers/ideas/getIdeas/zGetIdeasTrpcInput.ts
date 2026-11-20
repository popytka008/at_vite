import {z} from 'zod'

const minWarning = 'at least 1 digit'
export const zGetIdeasTrpcInput = z.object({
  cursor: z.coerce.number().optional(),
  limit: z.number().min(1, minWarning).max(100).default(10)
})