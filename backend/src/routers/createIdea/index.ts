import {t}                    from '../../trpc.js'
import {ideas}                from '../../lib/ideas.js'
import {zCreateIdeaTrpcInput} from './input.js'


export const createIdeaTrpcRoute = t.procedure
  .input(zCreateIdeaTrpcInput)
  .mutation(({input}) => {
    
    if (ideas.find(item => item.nick === input.nick)) {
      throw new Error('This nick is occuped')
    }
    
    ideas.unshift(input)
    
    return 'done createIdeaTrpcRoute'
  })