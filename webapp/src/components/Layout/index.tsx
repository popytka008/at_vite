import {Link, Outlet}                                                                       from 'react-router-dom'
import {getAllIdeasRoute, getNewIdeaRoute, getSignInRoute, getSignOutRoute, getSignUpRoute} from '../../lib/routes.ts'
import css                                                                                  from './index.module.scss'
import {trpc}                                                                               from '../../lib/trpc.tsx'

export const Layout = () => {
  const {
    data,
    isLoading,
    isFetching,
    isError
  } = trpc.getMe.useQuery()
  const me = (data && data.me && data.me.nick) ? data.me.nick : null
  
  return (
    <div className={css.layout}>
      <div className={css.navigation}>
        <p className={css.logo}><b>IdeaNick</b></p>
        <ul className={css.menu}>
          <li className={css.item}><Link className={css.link} to={getAllIdeasRoute()}>All ideas</Link></li>
          {isLoading || isFetching || isError ? null : me ? (
            <>
              <li className={css.item}><Link className={css.link} to={getNewIdeaRoute()}>New idea</Link></li>
              <li className={css.item}><Link className={css.link} to={getSignOutRoute()}>Log out({me})</Link></li>
            </>
          ) : (
            <>
              <li className={css.item}><Link className={css.link} to={getSignUpRoute()}>Sugn up</Link></li>
              <li className={css.item}><Link className={css.link} to={getSignInRoute()}>Sugn in</Link></li>
            </>
          )}
          <hr/>
        </ul>
      </div>
      <div className={css.content}><Outlet/></div>
    </div>
  )
}
