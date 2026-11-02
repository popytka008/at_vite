import {trpc}             from '../../lib/trpc'
import {Link}             from 'react-router-dom'
import {getViewIdeaRoute} from '../../lib/routes.ts'
import {Segment}          from '../../components/Segment'
import css                from './index.module.scss'

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
    <Segment title="All Ideas">
      <h1 className={css.title}>Ideas!</h1>
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
          /*
          <h2 className={css.ideaName}>
              <Link className={css.ideaLink} to={getViewIdeaRoute({ideaNick: idea.nick})}>
                {idea.name}
              </Link>
            </h2>
            <p className={css.ideaDescription}>{idea.description}</p>
          */
        ))}</div>
    </Segment>
  )
  /*
  return (
    <div>
      <h1 className={css.title}>Ideas!</h1>
      <div className={css.ideas}>
        {result.data.ideas.map((idea) => (
          <div className={css.idea} key={idea.nick}>
            <h2 className={css.ideaName}>
              <Link className={css.ideaLink} to={getViewIdeaRoute({ideaNick: idea.nick})}>
                {idea.name}
              </Link>
            </h2>
            <p className={css.ideaDescription}>{idea.description}</p>
          </div>
        ))}</div>
    </div>
    
   */
  // )
}