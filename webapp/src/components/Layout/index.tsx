import {Link, Outlet}     from 'react-router-dom'
import {getAllIdeasRoute} from '../../lib/route.ts'

export const Layout = () =>
  (
    <div>
      <p><b>IdeaNick</b></p>
      <hr/>
      <ul>
        <li><Link to={getAllIdeasRoute()}>All ideas</Link></li>
        <div><Outlet/></div>
      </ul>
    </div>
  )