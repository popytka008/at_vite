import css    from './index.module.scss'
import {Link} from 'react-router-dom'

export const LinkButton = (
  {
    children,
    to
  }:
    {
      children: React.ReactNode
      to: string
    }) => <Link className={css.button} type="submit" to={to}>{children}</Link>