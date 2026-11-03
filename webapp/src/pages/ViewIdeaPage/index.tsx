import {useParams}                from 'react-router-dom'
import type {ViewIdeaRouteParams} from '../../lib/routes.ts'
import {trpc}                     from '../../lib/trpc.tsx'
import css from './index.module.scss'
import {Segment}                  from '../../components/Segment'

export const ViewIdeaPage = () => {
  const {ideaNick} = useParams() as ViewIdeaRouteParams
  
  const result = trpc.getIdea.useQuery({ideaNick})
  
  if (result.isPending || result.isFetching) {
    return `<div>Is loading...</div>`
  }
  if (result.isError) {
    return <div>Error: {result.error.message}</div>
  }
  const idea = result.data.idea
  return (
    <Segment title={idea.name} description={idea.description}>
      <div className={css.text} dangerouslySetInnerHTML={{__html: idea.text}}/>
    </Segment>
    /*
        <div>
      <h1 className={css.title}>{idea.name}</h1>
      <p className={css.description}>{idea.description}</p>
      <div className={css.text} dangerouslySetInnerHTML={{__html: idea.text}}/>
    </div>
     */
  )
}