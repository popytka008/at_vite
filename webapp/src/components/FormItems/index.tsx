import css from './index.module.scss'

export const FormItems = ({children}: { children?: React.ReactNode | null }) => {
  
  return (<div className={css.formItems}>{children}</div>)
}
