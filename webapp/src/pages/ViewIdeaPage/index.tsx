import {useParams}                                  from 'react-router-dom'
import {getEditIdeaRoute, type ViewIdeaRouteParams} from '../../lib/routes.ts'
import {trpc}                                       from '../../lib/trpc.tsx'
import css from './index.module.scss'
import {Segment}                  from '../../components/Segment'
import {LinkButton}                                 from '../../components/LinkButton'

export const ViewIdeaPage = () => {
  const {ideaNick} = useParams() as ViewIdeaRouteParams
  
  const getIdeaResult = trpc.getIdea.useQuery({
    ideaNick
  })
  // выполнить запрос и передать результат (компонент контекста ME)
  const getMeResult = trpc.getMe.useQuery()
  // проверка на наличие ИДЕИ и компонента ME
  if (getIdeaResult.isLoading || getIdeaResult.isFetching || getMeResult.isLoading || getMeResult.isFetching) {
    return <span>Loading...</span>
  }
  if (getIdeaResult.isError) {
    return <span>Error: {getIdeaResult.error.message}</span>
  }
  // нет никаких данных по ключу поиска
  if (!getIdeaResult.data) {
    return <span>Data(idea) (dbdata) not found</span>
  }
  if (!getMeResult.data) {
    return <span>Data(Me) (dbdata) not found</span>
  }
  // нет никаких ИДЕЙ по ключу поиска
  if (!getIdeaResult.data.idea) {
    return <span>Idea not found</span>
  }
  
  const idea = getIdeaResult.data.idea
  const me = getMeResult.data.me
  // Is correct ME
  // if (!me) {
  //   return <span>Not authorized</span>
  // }
  
  return (
    idea ? (
      <Segment title={idea.name} description={idea.description}>
        <div className={css.createdAt}>{idea.createdAt.toString()}</div>
        <div className={css.author}>Author: {idea.author.nick}</div>
        <div className={css.text} dangerouslySetInnerHTML={{__html: idea.text}}/>
        {me && me.id === idea.authorId && (
          <div className={css.editButton}>
            <LinkButton to={getEditIdeaRoute({ideaNick: idea.nick})}>Edit idea</LinkButton>
          </div>
        )}
      </Segment>
    ) : ''
  
  )
}