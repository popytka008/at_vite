import {trpc} from '../../lib/trpc'
import { Link } from 'react-router-dom'
import {getViewIdeaRoute} from '../../lib/route.ts'

export const AllIdeasPage = () => {
  
  const result = trpc.ideas.getIdeas.useQuery()
  console.log(result)
  
  if (result.isPending || result.isFetching) {
    return <div className="loading">Грузимся... грузимся...</div>
  }
  if (result.isError) {
    return (<div className="error">{result.error.message}</div>)
  }
  
  return (
    <div>
      <h1>Ideas!</h1>
      {result.data.ideas.map((idea) => (
        <div key={idea.nick}>
          <h2>
            <Link to={getViewIdeaRoute({ideaNick: idea.nick})}>
              {idea.name}
            </Link>
          </h2>
          <p>{idea.description}</p>
        </div>
      ))}
    </div>
  )
}