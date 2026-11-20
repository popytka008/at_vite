import {zCreateIdeaTrpcInput} from '../createIdea/input.js'
import {z}                    from 'zod'

export const zUpdateIdeaTrpcInput = zCreateIdeaTrpcInput
  .extend({
    ideaId: z.number().min(1)
  })