import cn  from 'classnames'
import css from './index.module.scss'

export type ButtonProps = { children: React.ReactNode, loading: boolean }
export const Button = ({children, loading = false}: ButtonProps) =>
  
  <button className={cn({[css.button]: true, [css.disabled]: loading})}
          type="submit"
          disabled={loading}
  >{loading ? 'is submitting...' : children}</button>
