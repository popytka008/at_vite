import {trpc}             from '../../lib/trpc'
import {Link}             from 'react-router-dom'
import {getViewIdeaRoute} from '../../lib/routes.ts'
import {Segment}          from '../../components/Segment'
import css                from './index.module.scss'

export const AllIdeasPage = () => {
  
  const result = trpc.getIdeas.useQuery()
  console.log(result)
  
  if (result.isPending || result.isFetching) {
    return <div className="loading">Грузимся... грузимся...</div>
  }
  console.log('after pending/fetching')
  if (result.isError) {
    return (<div className="error">{result.error.message}</div>)
  }
  console.log('after error')
  if (result.isSuccess) {
    console.log(result.data.ideas.toString())
  }
  console.log('result', result.data.ideas)
  return (
    <Segment title="All Ideas">
      <div className={css.ideas}>
        {result.data.ideas.map((idea) => (
          <div className={css.idea} key={idea.nick}>
            <Segment
              size={2}
              title={
                <Link className={css.ideaLink} to={getViewIdeaRoute({ideaNick: idea.nick})}>
                  {idea.name}
                </Link>}
              description={idea.description}
            />
          </div>
        ))}</div>
    </Segment>
  )
}