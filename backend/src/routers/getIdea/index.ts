import {t}     from '../../trpc.js'
import {z}     from 'zod'
// import _   from 'lodash'
import {ideas} from '../../lib/ideas.js'


export const getIdeaTrpcRoute = t.procedure
  .input(
    z.object({
      ideaNick: z.string()
    })
  )
  .query(({input}) => {
    const idea = ideas.find(item => {
      return item.nick === input.ideaNick
    })
    if (!idea) {
      throw new Error(`Idea ${input.ideaNick} not found ! :(`)
    }
    return {idea: idea || null}
  })

