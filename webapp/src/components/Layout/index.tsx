import {Link, Outlet}     from 'react-router-dom'
import {getAllIdeasRoute} from '../../lib/route.ts'
import css from './index.module.scss'

export const Layout = () =>
  (
    <div className={css.layout}>
      <div className={css.navigation}>
        <p className={css.logo}><b>IdeaNick</b></p>
        <ul className={css.menu}>
          <li className={css.item}><Link className={css.link} to={getAllIdeasRoute()}>All ideas</Link></li>
          <hr/>
        </ul>
      </div>
      <div className={css.content}><Outlet/></div>
    </div>
  )