import {useParams}                from 'react-router-dom'
import type {ViewIdeaRouteParams} from '../../lib/route.ts'
import {trpc}                     from '../../lib/trpc.tsx'

export const ViewIdeaPage = () => {
  const {ideaNick} = useParams() as ViewIdeaRouteParams
  
  const result = trpc.ideas.getIdea.useQuery({ideaNick})
  
  if (result.isPending || result.isFetching) {
    return `<div>Is loading...</div>`
  }
  if (result.isError) {
    return <div>Error: {result.error.message}</div>
  }
  const idea = result.data.idea
  return (
    <div>
      <h1>{idea.name}</h1>
      <p>{idea.description}</p>
      <div dangerouslySetInnerHTML={{__html: idea.text}}/>
    </div>
  )
}