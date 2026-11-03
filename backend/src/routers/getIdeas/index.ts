import {t}     from '../../trpc.js'
import _       from 'lodash'
import {ideas} from '../../lib/ideas.js'


export const getIdeasTrpcRoute = t.procedure.query(() => {
  // throw new Error('Test error')
  return {
    ideas: ideas.map(item =>
      _.pick(item, ['nick', 'name', 'description']))
  }
})

