import {useParams}                                  from 'react-router-dom'
import {getEditIdeaRoute, type ViewIdeaRouteParams} from '../../lib/routes.ts'
import {trpc}                                       from '../../lib/trpc.tsx'
import {Segment}         from '../../components/Segment'
import {LinkButton}                                 from '../../components/LinkButton'
import {withPageWrapper} from '../../lib/withPageWrapper.tsx'
import css               from './index.module.scss'

export const ViewIdeaPage = withPageWrapper({
  useQuery: () => {
    const {ideaNick} = useParams() as ViewIdeaRouteParams
    return trpc.getIdea.useQuery({ideaNick})
  },
  checkExists: ({queryResult}) => !!queryResult.data,
  checkExistsMessage: 'Dataset not exists',
  setProps: ({
               queryResult,
               ctx,
               checkExists,
               // checkAccess
             }) => {
    const idea = checkExists(queryResult.data!.idea, 'idea does not exists')
    // checkAccess(ctx.me, 'nonexisting context')
    return {
      idea,
      me: ctx.me
    }
  }
})(({idea, me}) => {
  
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
})