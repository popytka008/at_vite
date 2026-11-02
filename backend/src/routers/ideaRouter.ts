import {t} from '../trpc.js'
import _   from 'lodash'
import {z} from 'zod'

// для основной проверки
const ideas = _.times(100,
  (i) => ({
    nick: `cool-idea-nick-${i}`,
    name: `Idea ${i}`,
    description: `Description of idea ${i}...`,
    text: _.times(100, (j) => {
      return `<p>Text paragraph ${j} of idea ${i}</p>`
    }).join('')
  }))

// роутер для этих данных
export const ideaRouter = t.router({
  getIdeas: t.procedure.query(() => {
    // throw new Error('Test error')
    return {
      ideas: ideas.map(item =>
        _.pick(item, ['nick', 'name', 'description']))
    }
  }),
  getIdea: t.procedure
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
})
// уже не нужен?? :)
// export type TrpcRouter = typeof ideaRouter