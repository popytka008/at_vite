import {z} from 'zod'

const passwordWarning = 'At least 1 character'
export const zUpdatePasswordTrpcInput = z.object({
  oldPassword: z.string().min(1, passwordWarning),
  newPassword: z.string().min(1, passwordWarning)
})