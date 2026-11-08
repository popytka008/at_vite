import cn  from 'classnames'
import css from './index.module.scss'

export const Alert = ({
                        color,
                        children
                      }: {
  color: 'red' | 'green'
  children: React.ReactNode
}) => (
  <div className={cn({[css.alert]: true, [css[color]]: true})}>{children}</div>
)