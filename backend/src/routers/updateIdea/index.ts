import {t}                    from '../../trpc.js'
import {zUpdateIdeaTrpcInput} from './input.js'

export const updateIdeaTrpcRoute = t.procedure
  .input(zUpdateIdeaTrpcInput)
  .mutation(async ({ctx, input}) => {
    const {ideaId, ...ideaInput} = input
    // проверка на отсутствие входа
    if (!ctx.me) {
      throw new Error('UNAUTHORIZED')
    }
    // поиск искомой ИДЕИ
    const idea = await ctx.prisma.idea
      .findUnique({
        where: {
          id: ideaId
        }
      })
    // если не найдена ИДЕЯ
    if (!idea) {
      throw new Error('1. NOT_FOUND_IDEA')
    }
    // если доступ к чужой ИДЕЕ (разные айди авторов)
    if (ctx.me.id !== idea.authorId) {
      throw new Error('1. NOT_YOUR_IDEA')
    }
    // проверка на совпадение ника идеи в базе данных (ники уникальны)
    if (idea.nick !== input.nick) {
      const exIdea = await ctx.prisma.idea
        .findUnique({
          where: {
            nick: input.nick
          }
        })
      if (exIdea) {
        throw new Error('Idea with that nick already exists')
      }
    }
    // обновление ЕДЕИ в бд
    await ctx.prisma.idea.update({
      where: {
        id: ideaId
      },
      
      data: {
        ...ideaInput,
      }
    })
    return true
  })